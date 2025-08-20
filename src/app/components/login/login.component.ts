import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../shared/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">RoleDash</h1>
          <p class="text-gray-600">Business Intelligence Dashboard</p>
        </div>

        <app-card title="Sign In" subtitle="Select your role to continue">
          <form (ngSubmit)="onLogin()" class="space-y-6">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                [(ngModel)]="username"
                name="username"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your username"
              >
            </div>

            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                [(ngModel)]="selectedRole"
                name="role"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select your role</option>
                <option value="MCHB">MCHB - Multi Channel Brand Manager</option>
                <option value="RBM">RBM - Regional Business Manager</option>
                <option value="ZBM">ZBM - Zonal Business Manager</option>
                <option value="NBM">NBM - National Business Manager</option>
              </select>
            </div>

            <div *ngIf="errorMessage" class="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              [disabled]="!username || !selectedRole"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-medium text-gray-700 mb-3">Demo Roles:</h4>
            <div class="space-y-2 text-sm text-gray-600">
              <div><strong>MCHB:</strong> National KPI overview and strategic charts</div>
              <div><strong>RBM:</strong> Regional performance and comparative analysis</div>
              <div><strong>ZBM:</strong> Zone-specific metrics and filtering options</div>
              <div><strong>NBM:</strong> Complete dashboard with data upload capabilities</div>
            </div>
          </div>
        </app-card>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  selectedRole: 'MCHB' | 'RBM' | 'ZBM' | 'NBM' | '' = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.username || !this.selectedRole) {
      this.errorMessage = 'Please enter username and select a role';
      return;
    }

    const success = this.authService.login(this.username, this.selectedRole);
    
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Login failed. Please try again.';
    }
  }
}
