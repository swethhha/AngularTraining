import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  animations: [
    trigger('heroAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('typewriter', [
      transition(':enter', [
        style({ width: '0' }),
        animate('2s steps(40)', style({ width: '100%' }))
      ])
    ]),
    trigger('float', [
      transition(':enter', [
        animate('3s ease-in-out', keyframes([
          style({ transform: 'translateY(0px)', offset: 0 }),
          style({ transform: 'translateY(-20px)', offset: 0.5 }),
          style({ transform: 'translateY(0px)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
  currentRole = 0;
  displayedText = '';
  isTyping = true;

  ngOnInit() {
    this.typewriterEffect();
  }

  typewriterEffect() {
    const currentText = this.roles[this.currentRole];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        this.displayedText += currentText.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          this.eraseText();
        }, 2000);
      }
    }, 100);
  }

  eraseText() {
    const eraseInterval = setInterval(() => {
      if (this.displayedText.length > 0) {
        this.displayedText = this.displayedText.slice(0, -1);
      } else {
        clearInterval(eraseInterval);
        this.currentRole = (this.currentRole + 1) % this.roles.length;
        setTimeout(() => {
          this.typewriterEffect();
        }, 500);
      }
    }, 50);
  }

  downloadResume() {
    // Create a dummy resume download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Resume content here';
    link.download = 'Swetha_Resume.pdf';
    link.click();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}