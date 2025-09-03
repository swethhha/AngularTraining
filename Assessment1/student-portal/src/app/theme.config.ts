import { definePreset } from '@primeng/themes';

export const StudentPortalTheme = definePreset({
  semantic: {
    primary: {
      50: '#f0f7f2',
      100: '#dcede1',
      200: '#bcdbc7',
      300: '#8fc2a3',
      400: '#6ba373',
      500: '#538861',
      600: '#3d6b47',
      700: '#32563a',
      800: '#2a4530',
      900: '#243a29',
      950: '#111f16'
    },
    secondary: {
      50: '#fff7f0',
      100: '#ffede0',
      200: '#ffd9c2',
      300: '#ffbe94',
      400: '#ffae87',
      500: '#ff9966',
      600: '#f0824a',
      700: '#e06b2e',
      800: '#c55a28',
      900: '#a04d26',
      950: '#572411'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#538861',
          contrastColor: '#ffffff',
          hoverColor: '#3d6b47',
          activeColor: '#32563a'
        },
        highlight: {
          background: 'rgba(83, 136, 97, 0.1)',
          focusBackground: 'rgba(83, 136, 97, 0.2)',
          color: '#538861',
          focusColor: '#3d6b47'
        },
        surface: {
          0: '#ffffff',
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e0',
          400: '#a0aec0',
          500: '#718096',
          600: '#4a5568',
          700: '#2d3748',
          800: '#1a202c',
          900: '#171923',
          950: '#0d1117'
        }
      }
    }
  }
});