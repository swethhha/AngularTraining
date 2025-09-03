# 🎓 Student Portal

A modern, responsive web application for managing student registrations and records with an elegant user interface.

## 📋 Introduction

Student Portal is a comprehensive web application designed to streamline student management processes in educational institutions. Built with Angular and PrimeNG, it provides an intuitive interface for registering new students and managing existing student records.

## 📖 Description

The Student Portal application serves as a centralized platform for academic administrators to efficiently handle student data. The application features a clean, professional design with a custom color scheme (#538861 green and #ffae87 peach) that creates a welcoming and modern user experience.

## ✨ Features

### 🔐 Student Registration
- **Reactive Forms**: Real-time form validation with Angular Reactive Forms
- **Field Validation**: 
  - Name: Required, minimum 3 characters
  - Email: Required, valid email format
  - Age: Required, range 16-45 years
  - Department: Required, dropdown selection
- **Error Handling**: Clear, contextual error messages
- **Responsive Design**: Mobile-friendly form layout

### 📊 Student Directory
- **Data Table**: Interactive PrimeNG DataTable with student records
- **Statistics Dashboard**: Real-time metrics including:
  - Total students count
  - Number of departments
  - Average student age
  - Latest registration
- **Edit Functionality**: Click-to-edit student details via modal dialog
- **Empty State**: Helpful guidance when no students are registered

### 🎨 User Interface
- **Modern Design**: Custom color palette with gradient effects
- **3D Elements**: Perspective transforms and hover animations
- **Responsive Layout**: Grid-based design that adapts to all screen sizes
- **Navigation**: Intuitive menubar with smooth transitions
- **Visual Feedback**: Interactive elements with hover states

### 🔄 Navigation & Routing
- **Single Page Application**: Seamless navigation between pages
- **Route Protection**: Proper routing configuration
- **Active States**: Visual indication of current page

## 🛠️ Tech Stack

### Frontend Framework
- **Angular 20.2.0** - Modern TypeScript-based framework
- **Angular CLI** - Development and build tools
- **TypeScript** - Type-safe JavaScript development

### UI Components & Styling
- **PrimeNG 19.0.0** - Rich UI component library
- **PrimeIcons 7.0.0** - Icon set for consistent iconography
- **@primeng/themes 20.0.1** - Advanced theming system
- **CSS3** - Custom styling with modern features
- **CSS Grid & Flexbox** - Responsive layout systems

### Forms & Validation
- **Angular Reactive Forms** - Form handling and validation
- **Custom Validators** - Business logic validation rules

### Development Tools
- **Angular Animations** - Smooth UI transitions
- **RxJS** - Reactive programming with Observables
- **Angular Signals** - Modern state management

### Build & Development
- **Webpack** - Module bundling (via Angular CLI)
- **TypeScript Compiler** - Code compilation and type checking
- **Angular DevKit** - Development utilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd student-portal

# Install dependencies
npm install

# Start development server
ng serve
```

### Development Server
Navigate to `http://localhost:4200/` to view the application.

### Build
```bash
# Development build
ng build

# Production build
ng build --configuration production
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured layout with grid columns
- **Tablet**: Adapted layout with adjusted spacing
- **Mobile**: Single-column layout with touch-friendly controls

## 🎨 Design System

### Color Palette
- **Primary**: #538861 (Forest Green)
- **Secondary**: #ffae87 (Peach)
- **Background**: Gradient combinations
- **Text**: Antiquewhite for headers, dark grays for content

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive Sizing**: Scales appropriately across devices

## Sample Screenshots

<img width="1867" height="916" alt="Screenshot 2025-08-29 125708" src="https://github.com/user-attachments/assets/b508be09-bafe-4890-aa9b-d295a3758743" />

<img width="1874" height="921" alt="Screenshot 2025-08-29 125803" src="https://github.com/user-attachments/assets/6a3cb393-d94b-41db-ace9-3fc39160ad19" />

<img width="1885" height="822" alt="Screenshot 2025-08-29 125859" src="https://github.com/user-attachments/assets/49cf7787-719f-4ccd-9237-d04d9147ef89" />
