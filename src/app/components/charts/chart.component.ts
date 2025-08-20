import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <canvas #chartCanvas [width]="width" [height]="height"></canvas>
      <div *ngIf="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <div class="text-gray-500">Loading chart...</div>
      </div>
    </div>
  `
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() type: ChartType = 'bar';
  @Input() data: any;
  @Input() options: any = {};
  @Input() width = 400;
  @Input() height = 200;
  @Input() loading = false;

  private chart: Chart | null = null;

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: this.type,
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        ...this.options
      }
    };

    this.chart = new Chart(ctx, config);
  }

  updateChart(newData: any): void {
    if (this.chart) {
      this.chart.data = newData;
      this.chart.update();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
