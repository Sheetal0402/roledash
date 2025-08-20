import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  role: 'MCHB' | 'RBM' | 'ZBM' | 'NBM';
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if user is already logged in (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  login(username: string, role: 'MCHB' | 'RBM' | 'ZBM' | 'NBM'): boolean {
    // Mock authentication - in real app, this would call an API
    const user: User = {
      username,
      role,
      fullName: this.getRoleFullName(role)
    };
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
    return true;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: string): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === role;
  }

  private getRoleFullName(role: string): string {
    const roleNames = {
      'MCHB': 'Multi Channel Brand Manager',
      'RBM': 'Regional Business Manager',
      'ZBM': 'Zonal Business Manager',
      'NBM': 'National Business Manager'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  }
}
