import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/card.component';

interface TableData {
  id: number;
  region: string;
  territory: string;
  sales: number;
  target: number;
  achievement: number;
  manager: string;
  lastUpdated: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
          <p class="text-gray-600 mt-2">Detailed performance reports and data tables</p>
        </div>
        <div class="flex space-x-3">
          <div class="relative">
            <button 
              (click)="toggleExportMenu()"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Export Data</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- Export Dropdown Menu -->
            <div 
              *ngIf="showExportMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200"
            >
              <div class="py-1">
                <button 
                  (click)="exportToCSV()"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>Export as CSV</span>
                  </div>
                </button>
                <button 
                  (click)="exportFilteredData()"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                    </svg>
                    <span>Export Filtered Data</span>
                  </div>
                </button>
                <button 
                  (click)="exportSummaryReport()"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <span>Export Summary Report</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <button 
            (click)="generateDetailedReport()"
            [disabled]="isGeneratingReport"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg 
              *ngIf="isGeneratingReport" 
              class="w-4 h-4 animate-spin" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <svg 
              *ngIf="!isGeneratingReport"
              class="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a4 4 0 01-4-4V5a4 4 0 014-4h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a4 4 0 01-4 4z"></path>
            </svg>
            <span>{{ isGeneratingReport ? 'Generating...' : 'Generate Report' }}</span>
          </button>
        </div>
      </div>

      <!-- Filters and Search -->
      <app-card title="Filters & Search" subtitle="Customize your data view">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="filterData()"
              placeholder="Search territories, managers..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              [(ngModel)]="selectedRegion"
              (change)="filterData()"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Regions</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Achievement</label>
            <select
              [(ngModel)]="selectedAchievement"
              (change)="filterData()"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
              <option value="above">Above Target (>100%)</option>
              <option value="below">Below Target (<100%)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              [(ngModel)]="sortBy"
              (change)="sortData()"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="territory">Territory</option>
              <option value="sales">Sales</option>
              <option value="achievement">Achievement</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>
      </app-card>

      <!-- Data Table -->
      <app-card title="Performance Report" subtitle="Territory-wise sales performance data">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  *ngFor="let header of tableHeaders"
                  (click)="sortBy = header.key; sortData()"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div class="flex items-center">
                    {{ header.label }}
                    <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                *ngFor="let item of paginatedData; let i = index"
                class="hover:bg-gray-50"
                [class.bg-red-50]="item.achievement < 90"
                [class.bg-green-50]="item.achievement >= 110"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.territory }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.region }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{{ (item.sales / 100000).toFixed(1) }}L
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{{ (item.target / 100000).toFixed(1) }}L
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span
                      class="px-2 py-1 text-xs font-semibold rounded-full"
                      [class]="getAchievementClass(item.achievement)"
                    >
                      {{ item.achievement }}%
                    </span>
                    <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div
                        class="h-2 rounded-full transition-all duration-300"
                        [class]="getProgressBarClass(item.achievement)"
                        [style.width.%]="Math.min(item.achievement, 100)"
                      ></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.manager }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.lastUpdated }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button class="text-blue-600 hover:text-blue-900 mr-2">View</button>
                  <button class="text-indigo-600 hover:text-indigo-900">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div class="flex flex-1 justify-between sm:hidden">
            <button
              (click)="previousPage()"
              [disabled]="currentPage === 1"
              class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              (click)="nextPage()"
              [disabled]="currentPage === totalPages"
              class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ startIndex + 1 }}</span>
                to
                <span class="font-medium">{{ Math.min(endIndex, filteredData.length) }}</span>
                of
                <span class="font-medium">{{ filteredData.length }}</span>
                results
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-700">Items per page:</label>
              <select
                [(ngModel)]="itemsPerPage"
                (change)="onItemsPerPageChange()"
                class="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <button
                  (click)="previousPage()"
                  [disabled]="currentPage === 1"
                  class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd"></path>
                  </svg>
                </button>
                <button
                  *ngFor="let page of getPageNumbers()"
                  (click)="goToPage(page)"
                  [class]="page === currentPage ? 'bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-50'"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                >
                  {{ page }}
                </button>
                <button
                  (click)="nextPage()"
                  [disabled]="currentPage === totalPages"
                  class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </app-card>

      <!-- Summary Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <app-card title="Total Records" padding="medium">
          <div class="text-3xl font-bold text-blue-600">{{ originalData.length }}</div>
          <p class="text-gray-600 text-sm mt-1">Active territories</p>
        </app-card>
        
        <app-card title="Above Target" padding="medium">
          <div class="text-3xl font-bold text-green-600">{{ aboveTargetCount }}</div>
          <p class="text-gray-600 text-sm mt-1">Territories ({{ (aboveTargetCount / originalData.length * 100).toFixed(1) }}%)</p>
        </app-card>
        
        <app-card title="Average Achievement" padding="medium">
          <div class="text-3xl font-bold text-purple-600">{{ averageAchievement.toFixed(1) }}%</div>
          <p class="text-gray-600 text-sm mt-1">Overall performance</p>
        </app-card>
        
        <app-card title="Total Sales" padding="medium">
          <div class="text-3xl font-bold text-yellow-600">₹{{ (totalSales / 10000000).toFixed(1) }}Cr</div>
          <p class="text-gray-600 text-sm mt-1">Cumulative revenue</p>
        </app-card>
      </div>

      <!-- Export Status -->
      <app-card 
        *ngIf="lastExportDate" 
        title="Recent Export Activity" 
        subtitle="Last export information"
      >
        <div class="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Data exported successfully</p>
              <p class="text-xs text-gray-600">Last export: {{ lastExportDate }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Ready for next export</p>
          </div>
        </div>
      </app-card>
    </div>

    <!-- Toast Notification -->
    <div 
      *ngIf="showToast"
      class="fixed top-4 right-4 z-50 max-w-md w-full"
      [class]="getToastClass()"
    >
      <div class="flex items-center p-4 rounded-lg shadow-lg">
        <div class="flex-shrink-0">
          <svg *ngIf="toastType === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <svg *ngIf="toastType === 'info'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <svg *ngIf="toastType === 'warning'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium">{{ toastMessage }}</p>
        </div>
        <div class="ml-4">
          <button
            (click)="hideToast()"
            class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class ReportsComponent implements OnInit {
  Math = Math;
  
  // Table configuration
  tableHeaders = [
    { key: 'territory', label: 'Territory' },
    { key: 'region', label: 'Region' },
    { key: 'sales', label: 'Sales' },
    { key: 'target', label: 'Target' },
    { key: 'achievement', label: 'Achievement' },
    { key: 'manager', label: 'Manager' },
    { key: 'lastUpdated', label: 'Last Updated' }
  ];

  // Filter and search
  searchTerm = '';
  selectedRegion = '';
  selectedAchievement = '';
  sortBy = 'territory';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Export and Report functionality
  showExportMenu = false;
  isGeneratingReport = false;
  lastExportDate = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'info' | 'warning' | 'error' = 'success';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  // Data
  originalData: TableData[] = [];
  filteredData: TableData[] = [];
  paginatedData: TableData[] = [];

  ngOnInit(): void {
    this.generateMockData();
    this.filterData();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.showExportMenu = false;
    }
  }

  private generateMockData(): void {
    const regions = ['North', 'South', 'East', 'West', 'Central'];
    const managers = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Brown', 'David Lee', 'Anna Davis', 'Chris Taylor', 'Emma Wilson'];
    
    this.originalData = [];
    
    for (let i = 1; i <= 50; i++) {
      const region = regions[Math.floor(Math.random() * regions.length)];
      const target = Math.floor(Math.random() * 5000000) + 2000000; // 20L to 70L
      const achievement = Math.floor(Math.random() * 50) + 75; // 75% to 125%
      const sales = Math.floor((target * achievement) / 100);
      
      this.originalData.push({
        id: i,
        region,
        territory: `${region} Territory ${i}`,
        sales,
        target,
        achievement,
        manager: managers[Math.floor(Math.random() * managers.length)],
        lastUpdated: this.getRandomDate()
      });
    }
  }

  private getRandomDate(): string {
    const start = new Date(2024, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString('en-IN');
  }

  filterData(): void {
    this.filteredData = this.originalData.filter(item => {
      const matchesSearch = !this.searchTerm || 
        item.territory.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.manager.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.region.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesRegion = !this.selectedRegion || item.region === this.selectedRegion;
      
      const matchesAchievement = !this.selectedAchievement ||
        (this.selectedAchievement === 'above' && item.achievement >= 100) ||
        (this.selectedAchievement === 'below' && item.achievement < 100);

      return matchesSearch && matchesRegion && matchesAchievement;
    });

    this.sortData();
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  sortData(): void {
    this.filteredData.sort((a, b) => {
      let valueA: any = a[this.sortBy as keyof TableData];
      let valueB: any = b[this.sortBy as keyof TableData];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    // Toggle sort direction for next click
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(start, end);
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    const start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  getAchievementClass(achievement: number): string {
    if (achievement >= 110) return 'bg-green-100 text-green-800';
    if (achievement >= 100) return 'bg-blue-100 text-blue-800';
    if (achievement >= 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }

  getProgressBarClass(achievement: number): string {
    if (achievement >= 110) return 'bg-green-500';
    if (achievement >= 100) return 'bg-blue-500';
    if (achievement >= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  get aboveTargetCount(): number {
    return this.originalData.filter(item => item.achievement >= 100).length;
  }

  get averageAchievement(): number {
    const sum = this.originalData.reduce((acc, item) => acc + item.achievement, 0);
    return sum / this.originalData.length;
  }

  get totalSales(): number {
    return this.originalData.reduce((acc, item) => acc + item.sales, 0);
  }

  // Export and Report Generation Methods
  toggleExportMenu(): void {
    this.showExportMenu = !this.showExportMenu;
  }

  exportToCSV(): void {
    const data = this.originalData;
    const csvContent = this.convertToCSV(data, 'complete_territory_report');
    this.downloadCSV(csvContent, `territory_report_${this.getCurrentDate()}.csv`);
    this.showExportMenu = false;
    this.lastExportDate = new Date().toLocaleString();
    this.showToastMessage('Complete territory report exported successfully!', 'success');
  }

  exportFilteredData(): void {
    const data = this.filteredData;
    const csvContent = this.convertToCSV(data, 'filtered_territory_report');
    this.downloadCSV(csvContent, `filtered_territory_report_${this.getCurrentDate()}.csv`);
    this.showExportMenu = false;
    this.lastExportDate = new Date().toLocaleString();
    this.showToastMessage(`Filtered data (${data.length} records) exported successfully!`, 'success');
  }

  exportSummaryReport(): void {
    const summaryData = this.generateSummaryData();
    const csvContent = this.convertSummaryToCSV(summaryData);
    this.downloadCSV(csvContent, `summary_report_${this.getCurrentDate()}.csv`);
    this.showExportMenu = false;
    this.lastExportDate = new Date().toLocaleString();
    this.showToastMessage('Summary report exported successfully!', 'success');
  }

  generateDetailedReport(): void {
    this.isGeneratingReport = true;
    this.showToastMessage('Generating detailed report...', 'info');
    
    // Simulate report generation process
    setTimeout(() => {
      const reportData = this.generateDetailedReportData();
      const csvContent = this.convertDetailedReportToCSV(reportData);
      this.downloadCSV(csvContent, `detailed_business_report_${this.getCurrentDate()}.csv`);
      this.isGeneratingReport = false;
      this.lastExportDate = new Date().toLocaleString();
      this.showToastMessage('Detailed business report generated successfully!', 'success');
    }, 2000);
  }

  private convertToCSV(data: TableData[], reportType: string): string {
    const headers = [
      'ID',
      'Region', 
      'Territory',
      'Sales (₹)',
      'Target (₹)',
      'Achievement (%)',
      'Manager',
      'Last Updated'
    ];

    const csvRows = [
      `"${reportType.toUpperCase()} - Generated on ${new Date().toLocaleString()}"`,
      '', // Empty row
      headers.join(','),
      ...data.map(row => [
        row.id,
        `"${row.region}"`,
        `"${row.territory}"`,
        row.sales,
        row.target,
        row.achievement,
        `"${row.manager}"`,
        `"${row.lastUpdated}"`
      ].join(','))
    ];

    return csvRows.join('\n');
  }

  private convertSummaryToCSV(summaryData: any): string {
    const headers = [
      'Metric',
      'Value',
      'Description'
    ];

    const csvRows = [
      '"TERRITORY PERFORMANCE SUMMARY REPORT"',
      `"Generated on ${new Date().toLocaleString()}"`,
      '', // Empty row
      headers.join(','),
      ...summaryData.map((row: any) => [
        `"${row.metric}"`,
        `"${row.value}"`,
        `"${row.description}"`
      ].join(','))
    ];

    return csvRows.join('\n');
  }

  private convertDetailedReportToCSV(reportData: any): string {
    const csvRows = [
      '"DETAILED BUSINESS INTELLIGENCE REPORT"',
      `"Generated on ${new Date().toLocaleString()}"`,
      `"Report Period: ${reportData.reportPeriod}"`,
      '', // Empty row
      
      // Executive Summary
      '"EXECUTIVE SUMMARY"',
      '"Metric","Value","Trend"',
      ...reportData.executiveSummary.map((row: any) => [
        `"${row.metric}"`,
        `"${row.value}"`,
        `"${row.trend}"`
      ].join(',')),
      '', // Empty row
      
      // Regional Performance
      '"REGIONAL PERFORMANCE BREAKDOWN"',
      '"Region","Total Sales","Target","Achievement","Territories","Top Performer"',
      ...reportData.regionalPerformance.map((row: any) => [
        `"${row.region}"`,
        row.totalSales,
        row.target,
        row.achievement,
        row.territories,
        `"${row.topPerformer}"`
      ].join(',')),
      '', // Empty row
      
      // Performance Analysis
      '"PERFORMANCE ANALYSIS"',
      '"Category","Count","Percentage","Notes"',
      ...reportData.performanceAnalysis.map((row: any) => [
        `"${row.category}"`,
        row.count,
        row.percentage,
        `"${row.notes}"`
      ].join(',')),
      '', // Empty row
      
      // Recommendations
      '"KEY RECOMMENDATIONS"',
      '"Priority","Recommendation","Expected Impact"',
      ...reportData.recommendations.map((row: any) => [
        `"${row.priority}"`,
        `"${row.recommendation}"`,
        `"${row.impact}"`
      ].join(','))
    ];

    return csvRows.join('\n');
  }

  private generateSummaryData(): any[] {
    const regions = [...new Set(this.originalData.map(item => item.region))];
    const totalTerritories = this.originalData.length;
    const aboveTarget = this.aboveTargetCount;
    const avgAchievement = this.averageAchievement;
    const totalSales = this.totalSales;

    return [
      {
        metric: 'Total Territories',
        value: totalTerritories.toString(),
        description: 'Active territories across all regions'
      },
      {
        metric: 'Total Regions',
        value: regions.length.toString(),
        description: 'Geographic regions covered'
      },
      {
        metric: 'Territories Above Target',
        value: `${aboveTarget} (${(aboveTarget / totalTerritories * 100).toFixed(1)}%)`,
        description: 'Territories achieving 100%+ of target'
      },
      {
        metric: 'Average Achievement',
        value: `${avgAchievement.toFixed(1)}%`,
        description: 'Overall performance across all territories'
      },
      {
        metric: 'Total Sales',
        value: `₹${(totalSales / 10000000).toFixed(2)} Cr`,
        description: 'Cumulative sales across all territories'
      },
      {
        metric: 'Best Performing Region',
        value: this.getBestPerformingRegion(),
        description: 'Region with highest average achievement'
      },
      {
        metric: 'Top Sales Territory',
        value: this.getTopSalesTerritory(),
        description: 'Territory with highest absolute sales'
      }
    ];
  }

  private generateDetailedReportData(): any {
    const regions = [...new Set(this.originalData.map(item => item.region))];
    
    return {
      reportPeriod: `${new Date().getFullYear()} - Full Year`,
      executiveSummary: [
        {
          metric: 'Total Revenue',
          value: `₹${(this.totalSales / 10000000).toFixed(2)} Cr`,
          trend: 'Up 12% YoY'
        },
        {
          metric: 'Territory Performance',
          value: `${this.averageAchievement.toFixed(1)}%`,
          trend: 'Up 5% vs target'
        },
        {
          metric: 'Market Coverage',
          value: `${this.originalData.length} territories`,
          trend: 'Expanded by 8 territories'
        },
        {
          metric: 'Target Achievement Rate',
          value: `${(this.aboveTargetCount / this.originalData.length * 100).toFixed(1)}%`,
          trend: 'Improved by 3%'
        }
      ],
      regionalPerformance: regions.map(region => {
        const regionData = this.originalData.filter(item => item.region === region);
        const totalSales = regionData.reduce((sum, item) => sum + item.sales, 0);
        const totalTarget = regionData.reduce((sum, item) => sum + item.target, 0);
        const achievement = (totalSales / totalTarget * 100);
        const topPerformer = regionData.reduce((prev, current) => 
          (prev.achievement > current.achievement) ? prev : current
        );
        
        return {
          region,
          totalSales: `₹${(totalSales / 10000000).toFixed(2)} Cr`,
          target: `₹${(totalTarget / 10000000).toFixed(2)} Cr`,
          achievement: `${achievement.toFixed(1)}%`,
          territories: regionData.length,
          topPerformer: topPerformer.territory
        };
      }),
      performanceAnalysis: [
        {
          category: 'Excellent (110%+)',
          count: this.originalData.filter(item => item.achievement >= 110).length,
          percentage: `${(this.originalData.filter(item => item.achievement >= 110).length / this.originalData.length * 100).toFixed(1)}%`,
          notes: 'Outstanding performance, potential for expansion'
        },
        {
          category: 'Good (100-109%)',
          count: this.originalData.filter(item => item.achievement >= 100 && item.achievement < 110).length,
          percentage: `${(this.originalData.filter(item => item.achievement >= 100 && item.achievement < 110).length / this.originalData.length * 100).toFixed(1)}%`,
          notes: 'Meeting targets, steady performance'
        },
        {
          category: 'Fair (90-99%)',
          count: this.originalData.filter(item => item.achievement >= 90 && item.achievement < 100).length,
          percentage: `${(this.originalData.filter(item => item.achievement >= 90 && item.achievement < 100).length / this.originalData.length * 100).toFixed(1)}%`,
          notes: 'Close to target, needs minor improvement'
        },
        {
          category: 'Poor (<90%)',
          count: this.originalData.filter(item => item.achievement < 90).length,
          percentage: `${(this.originalData.filter(item => item.achievement < 90).length / this.originalData.length * 100).toFixed(1)}%`,
          notes: 'Requires immediate attention and support'
        }
      ],
      recommendations: [
        {
          priority: 'High',
          recommendation: 'Focus on territories below 90% achievement with targeted support programs',
          impact: 'Potential 15-20% improvement in underperforming territories'
        },
        {
          priority: 'Medium',
          recommendation: 'Replicate best practices from top-performing territories',
          impact: 'Overall 5-8% improvement across all territories'
        },
        {
          priority: 'Medium',
          recommendation: 'Implement quarterly performance review cycles',
          impact: 'Better tracking and course correction capabilities'
        },
        {
          priority: 'Low',
          recommendation: 'Expand successful territories to adjacent markets',
          impact: 'Long-term growth and market share increase'
        }
      ]
    };
  }

  private getBestPerformingRegion(): string {
    const regionPerformance = [...new Set(this.originalData.map(item => item.region))].map(region => {
      const regionData = this.originalData.filter(item => item.region === region);
      const avgAchievement = regionData.reduce((sum, item) => sum + item.achievement, 0) / regionData.length;
      return { region, avgAchievement };
    });

    const best = regionPerformance.reduce((prev, current) => 
      (prev.avgAchievement > current.avgAchievement) ? prev : current
    );

    return `${best.region} (${best.avgAchievement.toFixed(1)}%)`;
  }

  private getTopSalesTerritory(): string {
    const top = this.originalData.reduce((prev, current) => 
      (prev.sales > current.sales) ? prev : current
    );
    return `${top.territory} (₹${(top.sales / 10000000).toFixed(2)} Cr)`;
  }

  private downloadCSV(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private getCurrentDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  // Toast notification methods
  showToastMessage(message: string, type: 'success' | 'info' | 'warning' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
      this.hideToast();
    }, 4000);
  }

  hideToast(): void {
    this.showToast = false;
  }

  getToastClass(): string {
    const baseClasses = 'animate-slide-in-right';
    switch (this.toastType) {
      case 'success':
        return `${baseClasses} bg-green-50 text-green-800 border border-green-200`;
      case 'info':
        return `${baseClasses} bg-blue-50 text-blue-800 border border-blue-200`;
      case 'warning':
        return `${baseClasses} bg-yellow-50 text-yellow-800 border border-yellow-200`;
      case 'error':
        return `${baseClasses} bg-red-50 text-red-800 border border-red-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-800 border border-gray-200`;
    }
  }
}
