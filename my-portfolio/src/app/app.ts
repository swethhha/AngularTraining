import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s ease-in', style({ transform: 'translateY(0%)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.8s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  brand = '✨ Swetha Portfolio';
  opened = signal(false);
  year = new Date().getFullYear();
  isScrolled = signal(false);
  
  links = [
    { path: '/', label: 'Home', icon: 'pi pi-home' },
    { path: '/about', label: 'About', icon: 'pi pi-user' },
    { path: '/skills', label: 'Skills', icon: 'pi pi-star' },
    { path: '/projects', label: 'Projects', icon: 'pi pi-briefcase' },
    { path: '/contact', label: 'Contact', icon: 'pi pi-envelope' }
  ];
  
  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 50);
    });
  }
  
  toggleMenu() { 
    this.opened.update(v => !v); 
  }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
