import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { CardComponent } from '../../shared/card.component';
import { KpiCardComponent } from '../../shared/kpi-card.component';
import { ChartComponent } from '../charts/chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, KpiCardComponent, ChartComponent],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900">{{ pageTitle }}</h2>
        <p class="text-gray-600 mt-2">{{ pageSubtitle }}</p>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-kpi-card
          *ngFor="let kpi of roleKpis"
          [label]="kpi.label"
          [value]="kpi.value"
          [change]="kpi.change"
          [color]="kpi.color"
        >
          <div [innerHTML]="kpi.icon"></div>
        </app-kpi-card>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" *ngIf="shouldShowCharts">
        <!-- Sales Trend Chart -->
        <app-card title="Sales Trend" subtitle="Monthly performance overview">
          <app-chart
            type="line"
            [data]="salesTrendData"
            [options]="lineChartOptions"
            [height]="300"
          ></app-chart>
        </app-card>

        <!-- Regional Performance Chart -->
        <app-card title="Regional Performance" subtitle="Current quarter breakdown">
          <app-chart
            type="bar"
            [data]="regionalData"
            [options]="barChartOptions"
            [height]="300"
          ></app-chart>
        </app-card>
      </div>

      <!-- Additional Charts for specific roles -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6" *ngIf="currentUser?.role === 'MCHB'">
        <app-card title="Channel Distribution" subtitle="Revenue by channel">
          <app-chart
            type="pie"
            [data]="channelData"
            [options]="pieChartOptions"
            [height]="300"
          ></app-chart>
        </app-card>

        <app-card title="Product Categories" subtitle="Performance by category">
          <app-chart
            type="doughnut"
            [data]="categoryData"
            [options]="doughnutChartOptions"
            [height]="300"
          ></app-chart>
        </app-card>

        <app-card title="Market Share" subtitle="Competitive analysis">
          <app-chart
            type="radar"
            [data]="marketShareData"
            [options]="radarChartOptions"
            [height]="300"
          ></app-chart>
        </app-card>
      </div>

      <!-- Zone-specific filters and charts for ZBM -->
      <div *ngIf="currentUser?.role === 'ZBM'" class="space-y-6">
        <app-card title="Zone Filters" subtitle="Customize your view">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Zones</option>
              <option>North Zone</option>
              <option>South Zone</option>
              <option>East Zone</option>
              <option>West Zone</option>
            </select>
            <select class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Products</option>
              <option>Product A</option>
              <option>Product B</option>
              <option>Product C</option>
            </select>
            <select class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>This Quarter</option>
              <option>Last Quarter</option>
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
        </app-card>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <app-card title="Zone Performance" subtitle="Territory comparison">
            <app-chart
              type="bar"
              [data]="zonePerformanceData"
              [options]="barChartOptions"
              [height]="300"
            ></app-chart>
          </app-card>
          
          <app-card title="Territory Growth" subtitle="Month-over-month change">
            <app-chart
              type="line"
              [data]="territoryGrowthData"
              [options]="lineChartOptions"
              [height]="300"
            ></app-chart>
          </app-card>
        </div>
      </div>

      <!-- Recent Activity -->
      <app-card title="Recent Activity" subtitle="Latest updates and notifications">
        <div class="space-y-4">
          <div *ngFor="let activity of recentActivities" class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div [class]="activity.iconClass">
              <div [innerHTML]="activity.icon"></div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-sm text-gray-600">{{ activity.description }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  pageTitle = '';
  pageSubtitle = '';
  roleKpis: any[] = [];
  shouldShowCharts = true;

  // Recent activities
  recentActivities = [
    {
      title: 'Data Upload Completed',
      description: 'Monthly sales data has been successfully processed',
      time: '2 hours ago',
      icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>',
      iconClass: 'p-2 bg-green-100 text-green-600 rounded-full'
    },
    {
      title: 'Report Generated',
      description: 'Q3 performance report is ready for review',
      time: '4 hours ago',
      icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clip-rule="evenodd"></path></svg>',
      iconClass: 'p-2 bg-blue-100 text-blue-600 rounded-full'
    },
    {
      title: 'Alert: Target Achievement',
      description: 'Regional targets exceeded by 15% this month',
      time: '1 day ago',
      icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>',
      iconClass: 'p-2 bg-yellow-100 text-yellow-600 rounded-full'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      this.setupRoleBasedDashboard();
    });
  }

  private setupRoleBasedDashboard(): void {
    if (!this.currentUser) return;

    switch (this.currentUser.role) {
      case 'MCHB':
        this.setupMCHBDashboard();
        break;
      case 'RBM':
        this.setupRBMDashboard();
        break;
      case 'ZBM':
        this.setupZBMDashboard();
        break;
      case 'NBM':
        this.setupNBMDashboard();
        break;
    }
  }

  private setupMCHBDashboard(): void {
    this.pageTitle = 'National Dashboard';
    this.pageSubtitle = 'Multi-channel brand performance overview';
    this.roleKpis = [
      {
        label: 'Total Revenue',
        value: '₹2.4Cr',
        change: 12.5,
        color: 'green',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Active Channels',
        value: '24',
        change: 8.2,
        color: 'blue',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Market Share',
        value: '18.5%',
        change: 2.1,
        color: 'purple',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Brand Score',
        value: '94.2',
        change: 5.8,
        color: 'yellow',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'
      }
    ];
  }

  private setupRBMDashboard(): void {
    this.pageTitle = 'Regional Dashboard';
    this.pageSubtitle = 'Regional business performance and insights';
    this.roleKpis = [
      {
        label: 'Regional Revenue',
        value: '₹45L',
        change: 15.3,
        color: 'green',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path></svg>'
      },
      {
        label: 'Active Territories',
        value: '12',
        change: 0,
        color: 'blue',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Target Achievement',
        value: '108%',
        change: 8.0,
        color: 'purple',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Team Performance',
        value: '87%',
        change: 3.5,
        color: 'yellow',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path></svg>'
      }
    ];
  }

  private setupZBMDashboard(): void {
    this.pageTitle = 'Zone Dashboard';
    this.pageSubtitle = 'Zone-specific metrics and territory analysis';
    this.roleKpis = [
      {
        label: 'Zone Revenue',
        value: '₹18L',
        change: 22.1,
        color: 'green',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Territories',
        value: '8',
        change: 14.3,
        color: 'blue',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Monthly Growth',
        value: '+18%',
        change: 12.8,
        color: 'purple',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Customer Satisfaction',
        value: '4.7/5',
        change: 2.1,
        color: 'yellow',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zM14 9a1 1 0 100-2 1 1 0 000 2zm-7 3a1 1 0 011 1 2 2 0 104 0 1 1 0 112 0 4 4 0 01-8 0 1 1 0 011-1z" clip-rule="evenodd"></path></svg>'
      }
    ];
  }

  private setupNBMDashboard(): void {
    this.pageTitle = 'Executive Dashboard';
    this.pageSubtitle = 'Complete business overview and data management';
    this.roleKpis = [
      {
        label: 'Total Business',
        value: '₹8.2Cr',
        change: 16.7,
        color: 'green',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>'
      },
      {
        label: 'All Regions',
        value: '48',
        change: 6.2,
        color: 'blue',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Overall Performance',
        value: '94.8%',
        change: 4.1,
        color: 'purple',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
      },
      {
        label: 'Data Quality',
        value: '98.5%',
        change: 1.2,
        color: 'yellow',
        icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>'
      }
    ];
  }

  // Chart Data
  get salesTrendData() {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales (₹L)',
        data: [65, 78, 85, 81, 95, 102],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }]
    };
  }

  get regionalData() {
    return {
      labels: ['North', 'South', 'East', 'West', 'Central'],
      datasets: [{
        label: 'Revenue (₹L)',
        data: [45, 38, 42, 35, 28],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ]
      }]
    };
  }

  get channelData() {
    return {
      labels: ['Online', 'Retail', 'Wholesale', 'Direct'],
      datasets: [{
        data: [35, 30, 25, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ]
      }]
    };
  }

  get categoryData() {
    return {
      labels: ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'],
      datasets: [{
        data: [25, 20, 15, 22, 18],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ]
      }]
    };
  }

  get marketShareData() {
    return {
      labels: ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Others'],
      datasets: [{
        label: 'Our Company',
        data: [65, 70, 80, 75, 60],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
      }, {
        label: 'Competitor',
        data: [55, 65, 70, 65, 70],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
      }]
    };
  }

  get zonePerformanceData() {
    return {
      labels: ['Territory 1', 'Territory 2', 'Territory 3', 'Territory 4'],
      datasets: [{
        label: 'Achievement %',
        data: [110, 95, 125, 88],
        backgroundColor: 'rgba(16, 185, 129, 0.8)'
      }]
    };
  }

  get territoryGrowthData() {
    return {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Growth %',
        data: [12, 15, 18, 22],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }]
    };
  }

  // Chart Options
  lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  radarChartOptions = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100
      }
    }
  };
}
