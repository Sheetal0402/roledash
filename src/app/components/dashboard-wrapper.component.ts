import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { LayoutComponent } from '../shared/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { UploadComponent } from './upload/upload.component';
import { ChartComponent } from './charts/chart.component';

@Component({
  selector: 'app-dashboard-wrapper',
  standalone: true,
  imports: [
    CommonModule, 
    LayoutComponent, 
    DashboardComponent, 
    ReportsComponent, 
    UploadComponent,
    ChartComponent
  ],
  template: `
    <app-layout>
      <div [ngSwitch]="currentSection">
        <app-dashboard *ngSwitchCase="'dashboard'"></app-dashboard>
        <div *ngSwitchCase="'charts'" class="space-y-6">
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Analytics & Charts</h2>
            <p class="text-gray-600 mt-2">Interactive data visualizations and insights</p>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Sales Performance</h3>
              <app-chart
                type="line"
                [data]="chartData.sales"
                [height]="300"
              ></app-chart>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Regional Breakdown</h3>
              <app-chart
                type="bar"
                [data]="chartData.regional"
                [height]="300"
              ></app-chart>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Market Share</h3>
              <app-chart
                type="pie"
                [data]="chartData.market"
                [height]="300"
              ></app-chart>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Growth Trends</h3>
              <app-chart
                type="doughnut"
                [data]="chartData.growth"
                [height]="300"
              ></app-chart>
            </div>
          </div>
        </div>
        <app-reports *ngSwitchCase="'reports'"></app-reports>
        <app-upload *ngSwitchCase="'upload'"></app-upload>
      </div>
    </app-layout>
  `
})
export class DashboardWrapperComponent implements OnInit {
  currentSection = 'dashboard';
  currentUser: User | null = null;

  chartData = {
    sales: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales (₹L)',
        data: [65, 78, 85, 81, 95, 102],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }]
    },
    regional: {
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
    },
    market: {
      labels: ['Our Company', 'Competitor A', 'Competitor B', 'Others'],
      datasets: [{
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ]
      }]
    },
    growth: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        data: [22, 28, 35, 42],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ]
      }]
    }
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });

    // Listen for navigation events from the layout component
    this.setupNavigationHandler();
  }

  private setupNavigationHandler(): void {
    // In a real app, you'd use a service to communicate between components
    // For this demo, we'll use localStorage to handle navigation
    const handleNavigation = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.section) {
        this.currentSection = customEvent.detail.section;
      }
    };

    window.addEventListener('navigate-to-section', handleNavigation);
  }

  navigateTo(section: string): void {
    this.currentSection = section;
  }
}
