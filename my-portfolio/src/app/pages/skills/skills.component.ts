import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

Chart.register(...registerables);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('progressBar', [
      transition(':enter', [
        style({ width: '0%' }),
        animate('1.5s ease-out', style({ width: '{{width}}%' }))
      ], { params: { width: 0 } })
    ]),
    trigger('staggerAnimation', [
      transition(':enter', [
        query('.skill-item', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SkillsComponent implements OnInit {
  @ViewChild('skillsChart', { static: false }) skillsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('experienceChart', { static: false }) experienceChart!: ElementRef<HTMLCanvasElement>;

  technicalSkills = [
    { name: 'Java', level: 85, icon: 'pi pi-coffee', color: '#ed8b00' },
    { name: 'C Programming', level: 80, icon: 'pi pi-code', color: '#00599c' },
    { name: 'JavaScript', level: 75, icon: 'pi pi-code', color: '#f7df1e' },
    { name: 'HTML5', level: 90, icon: 'pi pi-file-code', color: '#e34f26' },
    { name: 'CSS3', level: 85, icon: 'pi pi-palette', color: '#1572b6' },
    { name: 'Bootstrap', level: 80, icon: 'pi pi-th-large', color: '#7952b3' },
    { name: 'Angular', level: 70, icon: 'pi pi-refresh', color: '#dd0031' },
    { name: 'MySQL', level: 75, icon: 'pi pi-database', color: '#4479a1' }
  ];

  designSkills = [
    { name: 'Machine Learning', level: 75, icon: 'pi pi-cog', color: '#ff6b6b' },
    { name: 'Neural Networks', level: 70, icon: 'pi pi-sitemap', color: '#f24e1e' },
    { name: 'Model Compression', level: 65, icon: 'pi pi-compress', color: '#ff61f6' },
    { name: '.NET Basics', level: 60, icon: 'pi pi-microsoft', color: '#31a8ff' }
  ];

  tools = [
    { name: 'Git', icon: 'pi pi-github', color: '#f05032' },
    { name: 'Spring Boot', icon: 'pi pi-cog', color: '#6db33f' },
    { name: 'TensorFlow', icon: 'pi pi-sitemap', color: '#ff6f00' },
    { name: 'OpenCV', icon: 'pi pi-eye', color: '#5c3ee8' },
    { name: 'Arduino', icon: 'pi pi-microchip', color: '#00979d' },
    { name: 'REST APIs', icon: 'pi pi-cloud', color: '#336791' }
  ];

  certifications = [
    { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023', icon: 'pi pi-verified' },
    { name: 'Angular Certified Developer', issuer: 'Google', year: '2023', icon: 'pi pi-check-circle' },
    { name: 'Full Stack Web Development', issuer: 'freeCodeCamp', year: '2022', icon: 'pi pi-star' }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.createSkillsChart();
      this.createExperienceChart();
    }, 500);
  }

  createSkillsChart() {
    if (!this.skillsChart) return;

    const ctx = this.skillsChart.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Mobile'],
        datasets: [{
          label: 'Skill Level',
          data: [95, 85, 80, 75, 85, 70],
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(236, 72, 153, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(236, 72, 153, 1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff'
            }
          }
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            pointLabels: {
              color: '#ffffff',
              font: {
                size: 12
              }
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.6)',
              backdropColor: 'transparent'
            },
            min: 0,
            max: 100
          }
        }
      }
    });
  }

  createExperienceChart() {
    if (!this.experienceChart) return;

    const ctx = this.experienceChart.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Frontend Development', 'Backend Development', 'UI/UX Design', 'DevOps'],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(34, 197, 94, 0.8)'
          ],
          borderColor: [
            'rgba(99, 102, 241, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(34, 197, 94, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#ffffff',
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    });
  }

  getSkillProgress(level: number): string {
    return `${level}%`;
  }
}