# TypeScript Calculator

A simple, elegant calculator web application built with TypeScript, HTML, and CSS.

## 🚀 Live Demo

**[View Live Calculator](https://swethhha.github.io/AngularTraining/Day1/Ts-proj1/index.html)**

## 🚀 Features

- **Basic Operations**: Addition, Subtraction, Multiplication, Division
- **Input Validation**: Handles invalid inputs and division by zero
- **Responsive Design**: Modern, clean UI with smooth hover effects
- **TypeScript Support**: Type-safe development with compilation to JavaScript
- **Error Handling**: User-friendly error messages for invalid operations

## 🛠️ Technologies Used

- **HTML5**: Structure and layout
- **CSS3**: Styling with modern design patterns
- **TypeScript**: Type-safe JavaScript development
- **JavaScript**: Compiled output for browser execution

## 📁 Project Structure

```
Ts-proj1/
├── index.html          # Main HTML file
├── app.ts              # TypeScript source code
├── app.js              # Compiled JavaScript
├── style.css           # Styling and layout
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project dependencies
├── package-lock.json   # Dependency lock file
└── README.md           # Project documentation
```

## 🎯 How to Use

1. Enter two numbers in the input fields
2. Click any operation button (+, -, ×, ÷)
3. View the result displayed below
4. The calculator handles invalid inputs and division by zero automatically

## ⚙️ Setup & Development

### Prerequisites
- Node.js (for TypeScript compilation)
- TypeScript compiler

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd Ts-proj1

# Install dependencies
npm install

# Compile TypeScript to JavaScript
npx tsc
```

### Running Locally
Simply open `index.html` in any modern web browser.

## 🔧 TypeScript Configuration

The project uses TypeScript for type-safe development:
- Compiles TypeScript to JavaScript for browser compatibility
- Includes proper type annotations for DOM elements
- Handles number validation and type checking

## 🎨 Design Features

- Clean, modern interface with centered layout
- Professional styling with shadow effects
- Hover animations on buttons
- Responsive input fields
- Clear visual hierarchy

## 🚨 Error Handling

- **Invalid Input Detection**: Checks for non-numeric inputs
- **Division by Zero Prevention**: Prevents mathematical errors
- **User-Friendly Messages**: Clear error feedback
- **Type Safety**: TypeScript ensures proper data types

## 💻 Code Structure

### Main Function
The `calculate()` function handles all operations:
- Takes operator as parameter
- Validates input values
- Performs calculations based on operator
- Updates result display

### Supported Operations
- Addition (`+`)
- Subtraction (`-`)
- Multiplication (`*`)
- Division (`/`)

## 🚀 Future Enhancements

- Add more mathematical operations (power, square root, etc.)
- Implement keyboard support
- Add calculation history
- Include decimal precision controls
- Add clear/reset functionality

## 📝 License

This project is open source and available under the MIT License.

---

