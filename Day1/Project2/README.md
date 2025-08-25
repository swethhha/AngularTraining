# Paddle Ball Game

A classic arcade-style paddle ball game built with TypeScript and HTML5 Canvas featuring smooth animations and responsive controls.

## 🎮 Game Features

- **Smooth Paddle Movement**: Responsive left/right arrow key controls
- **Physics-Based Ball Movement**: Realistic ball bouncing with collision detection
- **Score Tracking**: Real-time score updates as you keep the ball in play
- **Game Over Detection**: Automatic reset when ball hits the bottom
- **Canvas Rendering**: Smooth 60fps gameplay using HTML5 Canvas
- **TypeScript Implementation**: Type-safe game development

## 🛠️ Technologies Used

- **HTML5 Canvas**: Game rendering and graphics
- **TypeScript**: Type-safe game logic and development
- **CSS3**: Modern styling with dark theme
- **JavaScript**: Compiled output for browser execution

## 📁 Project Structure

```
Project2/
├── index.html          # Main HTML file with canvas element
├── app.ts              # TypeScript game logic and controls
├── app.js              # Compiled JavaScript output
├── style.css           # Game styling and dark theme
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## 🎯 How to Play

1. **Move the Paddle**: Use **Left Arrow** (←) and **Right Arrow** (→) keys
2. **Keep the Ball Bouncing**: Prevent the ball from hitting the bottom
3. **Score Points**: Each successful paddle hit increases your score
4. **Game Over**: When the ball hits the bottom, your final score is displayed
5. **Auto Reset**: Game automatically restarts after game over

## ⚙️ Setup & Development

### Prerequisites
- TypeScript compiler (`npm install -g typescript`)
- Modern web browser with HTML5 Canvas support

### Quick Start
```bash
# Compile TypeScript to JavaScript
tsc app.ts

# Open the game in your browser
# Simply open index.html in any modern browser
```

### Development Mode
```bash
# Watch for changes and auto-compile
tsc app.ts --watch
```

## 🎮 Game Mechanics

### Controls
- **Arrow Left**: Move paddle left
- **Arrow Right**: Move paddle right
- **Continuous Movement**: Hold keys for smooth paddle motion

### Physics
- **Ball Speed**: 4 pixels per frame in X and Y directions
- **Paddle Speed**: 7 pixels per frame
- **Collision Detection**: Precise boundary and paddle collision
- **Wall Bouncing**: Ball bounces off left, right, and top walls

### Scoring System
- **+1 Point**: Each time ball hits the paddle
- **Game Over**: Ball hits bottom boundary
- **Score Display**: Real-time score updates

## 🎨 Design Features

- **Dark Theme**: Professional gaming aesthetic with dark background
- **Canvas Styling**: Bordered game area with contrasting colors
- **Responsive Layout**: Centered design that works on different screen sizes
- **Clean Typography**: Arial font family for clear text display
- **Color Scheme**: 
  - Background: Dark gray (#222)
  - Canvas: Darker gray (#333)
  - Paddle: Blue
  - Ball: Red
  - Text: White

## 💻 Code Architecture

### Main Components
- **Game Loop**: `update()` function with `requestAnimationFrame`
- **Rendering**: Separate draw functions for paddle and ball
- **Input Handling**: Keyboard event listeners for smooth controls
- **Collision Detection**: Mathematical boundary checking
- **State Management**: Game variables for position, speed, and score

### Key Functions
- `drawPaddle()`: Renders the blue paddle rectangle
- `drawBall()`: Renders the red circular ball
- `movePaddle()`: Handles paddle movement and boundary constraints
- `moveBall()`: Manages ball physics and collision detection
- `resetGame()`: Resets all game variables to initial state

## 🚀 Future Enhancements

- Add multiple difficulty levels
- Implement power-ups and special effects
- Add sound effects and background music
- Create brick-breaking elements
- Add high score persistence
- Implement touch controls for mobile devices
- Add particle effects for collisions

## 🐛 Known Issues

- Game requires manual browser refresh after game over alert
- No pause functionality currently implemented
- Score resets immediately on game over

## 📝 License

This project is part of Angular Training Day 1 and is available for educational purposes.

---
