import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  isSubmitted = false;

  contactInfo = [
    {
      icon: 'pi pi-envelope',
      title: 'Email',
      value: 'swetha06112004@gmail.com',
      link: 'mailto:swetha06112004@gmail.com',
      color: '#3b82f6'
    },
    {
      icon: 'pi pi-phone',
      title: 'Phone',
      value: '+91 98765 43210',
      link: 'tel:+919876543210',
      color: '#22c55e'
    },
    {
      icon: 'pi pi-map-marker',
      title: 'Location',
      value: 'Bangalore, India',
      link: 'https://maps.google.com',
      color: '#f59e0b'
    },
    {
      icon: 'pi pi-linkedin',
      title: 'LinkedIn',
      value: 'linkedin.com/in/swethha',
      link: 'https://www.linkedin.com/in/swethha',
      color: '#0077b5'
    }
  ];

  socialLinks = [
    { icon: 'pi pi-github', url: 'https://github.com', color: '#333' },
    { icon: 'pi pi-linkedin', url: 'https://linkedin.com', color: '#0077b5' },
    { icon: 'pi pi-twitter', url: 'https://twitter.com', color: '#1da1f2' },
    { icon: 'pi pi-instagram', url: 'https://instagram.com', color: '#e4405f' },
    { icon: 'pi pi-youtube', url: 'https://youtube.com', color: '#ff0000' }
  ];

  services = [
    {
      icon: 'pi pi-globe',
      title: 'Web Development',
      description: 'Modern web applications using HTML, CSS, JavaScript, and Angular'
    },
    {
      icon: 'pi pi-server',
      title: 'Full Stack Development',
      description: 'End-to-end application development with Java, Spring Boot, and databases'
    },
    {
      icon: 'pi pi-cog',
      title: 'Machine Learning',
      description: 'ML model development, optimization, and compression for efficient deployment'
    },
    {
      icon: 'pi pi-wifi',
      title: 'IoT Solutions',
      description: 'Smart systems and IoT-based applications with sensor integration'
    }
  ];

  onSubmit() {
    if (this.isValidForm()) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.resetForm();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      }, 2000);
    }
  }

  isValidForm(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim() &&
      this.isValidEmail(this.contactForm.email)
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Resume content here';
    link.download = 'Swetha_Resume.pdf';
    link.click();
  }
}