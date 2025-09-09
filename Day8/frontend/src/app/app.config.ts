// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// 👇 Import the theme you want (choose one)
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara'; 

import { routes } from './app.routes';
import { jwtInterceptor } from './interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Handle global errors
    provideBrowserGlobalErrorListeners(),

    // Optimize change detection
    provideZoneChangeDetection({ eventCoalescing: true }),

    // App routes
    provideRouter(routes),

    // HTTP client with JWT interceptor
    provideHttpClient(withInterceptors([jwtInterceptor.withToken])),

    // Async animations for PrimeNG
    provideAnimationsAsync(),

    // PrimeNG theme — pick Aura OR Lara
    providePrimeNG({
      theme: {
        preset: Lara // or Aura
      }
    })
  ]
};
