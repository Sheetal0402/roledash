import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      <div *ngIf="title" class="border-b border-gray-200 px-6 py-4">
        <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
        <p *ngIf="subtitle" class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>
      </div>
      <div [class]="contentClasses">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';
  @Input() shadow: 'none' | 'small' | 'medium' | 'large' = 'medium';

  get cardClasses(): string {
    const shadowClasses = {
      'none': '',
      'small': 'shadow-sm',
      'medium': 'shadow-md',
      'large': 'shadow-lg'
    };

    return `bg-white rounded-lg border border-gray-200 ${shadowClasses[this.shadow]} hover:shadow-lg transition-shadow duration-200`;
  }

  get contentClasses(): string {
    const paddingClasses = {
      'none': '',
      'small': 'p-3',
      'medium': 'p-6',
      'large': 'p-8'
    };

    return paddingClasses[this.padding];
  }
}
