import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">{{ label }}</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">{{ value }}</p>
          <div *ngIf="change" class="flex items-center mt-2">
            <span [class]="changeClasses">
              <svg *ngIf="isPositive" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <svg *ngIf="!isPositive" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 15.586l5.293-5.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              {{ Math.abs(change) }}%
            </span>
            <span class="text-sm text-gray-600 ml-2">vs last period</span>
          </div>
        </div>
        <div [class]="iconClasses">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class KpiCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() change?: number;
  @Input() color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' = 'blue';

  Math = Math;

  get isPositive(): boolean {
    return this.change ? this.change > 0 : false;
  }

  get changeClasses(): string {
    if (!this.change) return '';
    
    const baseClasses = 'inline-flex items-center text-sm font-medium';
    return this.isPositive 
      ? `${baseClasses} text-green-600`
      : `${baseClasses} text-red-600`;
  }

  get iconClasses(): string {
    const colorClasses = {
      'blue': 'bg-blue-100 text-blue-600',
      'green': 'bg-green-100 text-green-600',
      'yellow': 'bg-yellow-100 text-yellow-600',
      'red': 'bg-red-100 text-red-600',
      'purple': 'bg-purple-100 text-purple-600'
    };

    return `p-3 rounded-full ${colorClasses[this.color]}`;
  }
}
