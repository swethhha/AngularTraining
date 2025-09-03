import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from './services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  command?: () => void;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    DrawerModule,
    ButtonModule,
    MenubarModule,
    CardModule,
    TooltipModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('BUG DASH');
  sidebarVisible = false;
  appName = 'Bug Dash';

  constructor(private authService: AuthService, private router: Router) {}

  get menuItems(): MenuItem[] {
    if (this.authService.isLoggedIn()) {
      return [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
        { label: 'Bugs', icon: 'pi pi-exclamation-triangle', routerLink: '/bugs' },
        { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
      ];
    } else {
      return [
        { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' }
      ];
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.sidebarVisible = false;
  }

  hasRouterLink(item: MenuItem): boolean {
    return 'routerLink' in item;
  }

  hasCommand(item: MenuItem): boolean {
    return 'command' in item;
  }

  getRouterLink(item: MenuItem): string {
    return (item as any).routerLink;
  }

  executeCommand(item: MenuItem): void {
    (item as any).command();
  }
}
