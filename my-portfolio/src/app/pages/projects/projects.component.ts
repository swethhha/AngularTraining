import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerProjects', [
      transition(':enter', [
        query('.project-card', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(200, [
            animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProjectsComponent {
  selectedCategory = 'all';
  
  categories = [
    { id: 'all', name: 'All Projects', icon: 'pi pi-th-large' },
    { id: 'ml', name: 'Machine Learning', icon: 'pi pi-cog' },
    { id: 'fullstack', name: 'Full Stack', icon: 'pi pi-server' },
    { id: 'iot', name: 'IoT & Smart Systems', icon: 'pi pi-wifi' }
  ];

  projects = [
    {
      id: 1,
      title: 'Handwritten Digit Recognition (ML)',
      description: 'Built and optimized MLP neural networks for handwritten digit classification. Applied compression techniques to deploy compact and efficient models designed for devices with limited computing resources.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      category: 'ml',
      technologies: ['Python', 'TensorFlow', 'Neural Networks', 'Model Compression', 'OpenCV'],
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: true,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Inventory Management System',
      description: 'Industry project for RUEI Industries Pvt. Ltd. Developed a comprehensive system to streamline inventory and delivery tracking with courier handling, financial transparency, and automated weekly reporting.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
      category: 'fullstack',
      technologies: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Bootstrap'],
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: true,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Smart Parking System',
      description: 'Designed a conceptual smart parking management solution integrating IoT sensors and web dashboard. Automated space availability detection and efficient vehicle allocation to reduce urban congestion.',
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&h=400&fit=crop',
      category: 'iot',
      technologies: ['IoT Sensors', 'Arduino', 'Web Dashboard', 'JavaScript', 'CSS3'],
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: true,
      status: 'completed'
    }
  ];

  get filteredProjects() {
    if (this.selectedCategory === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.selectedCategory);
  }

  get featuredProjects() {
    return this.projects.filter(project => project.featured);
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  openProject(url: string) {
    window.open(url, '_blank');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in-progress': return '#f59e0b';
      case 'planning': return '#6366f1';
      default: return '#6b7280';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planning': return 'Planning';
      default: return 'Unknown';
    }
  }
}