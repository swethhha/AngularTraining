import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition(':enter', [
        query('.timeline-item, .value-card', [
          style({ opacity: 0, transform: 'translateX(-50px)' }),
          stagger(200, [
            animate('0.8s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AboutComponent {
  personalInfo = {
    name: 'Swetha T',
    title: 'Full Stack Developer',
    location: 'Bangalore, India',
    email: 'swetha06112004@gmail.com',
    phone: '+91 98765 43210',
    experience: '3+ Years',
    projects: '50+',
    clients: '100%'
  };

  timeline = [
    {
      year: '2024',
      title: 'Full Stack Development Intern',
      company: 'Ether Services',
      description: 'Gained hands-on experience in full-stack development using Java technologies. Worked on enterprise-level applications and learned industry best practices.',
      technologies: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
      type: 'work'
    },
    {
      year: '2023',
      title: 'Web Design Intern',
      company: 'Adhoc Softwares',
      description: 'Developed responsive web interfaces using modern frontend technologies. Focused on creating user-friendly designs and interactive web experiences.',
      technologies: ['JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],
      type: 'work'
    },
    {
      year: '2021-2025',
      title: 'Bachelor of Computer Science Engineering',
      company: 'Engineering College',
      description: 'Pursuing Computer Science Engineering with focus on software development, machine learning, and web technologies. Active in technical projects and coding competitions.',
      technologies: ['C', 'Java', 'Python', 'Data Structures', 'Algorithms', 'ML'],
      type: 'education'
    }
  ];

  values = [
    {
      icon: 'pi pi-lightbulb',
      title: 'Innovation',
      description: 'Always exploring new technologies and creative solutions to solve complex problems.',
      color: '#f59e0b'
    },
    {
      icon: 'pi pi-users',
      title: 'Collaboration',
      description: 'Believing in the power of teamwork and open communication to achieve great results.',
      color: '#6366f1'
    },
    {
      icon: 'pi pi-star',
      title: 'Excellence',
      description: 'Committed to delivering high-quality work and continuously improving my skills.',
      color: '#ec4899'
    },
    {
      icon: 'pi pi-heart',
      title: 'Passion',
      description: 'Genuinely passionate about coding, design, and creating meaningful digital experiences.',
      color: '#22c55e'
    }
  ];

  interests = [
    { name: 'Web Development', icon: 'pi pi-globe' },
    { name: 'Full Stack Development', icon: 'pi pi-code' },
    { name: 'Machine Learning', icon: 'pi pi-cog' },
    { name: 'Photography', icon: 'pi pi-camera' },
    { name: 'Travel', icon: 'pi pi-map' },
    { name: 'Music', icon: 'pi pi-volume-up' },
    { name: 'Reading', icon: 'pi pi-book' },
    { name: 'Gaming', icon: 'pi pi-play' }
  ];



  sendEmail() {
    window.open(`mailto:${this.personalInfo.email}`, '_blank');
  }
}