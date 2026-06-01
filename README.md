# Pong Game

A classic Pong game built with HTML, CSS, and JavaScript.

## Features

- **Player Control**: Control the left paddle using:
  - Mouse movement (automatic)
  - Arrow keys (↑↓) or W/S keys
  
- **Computer AI**: The right paddle is controlled by an intelligent AI that responds to the ball's position

- **Ball Physics**: 
  - Bounces off walls (top and bottom)
  - Bounces off paddles with spin effect based on hit position
  - Speeds up slightly as rally continues

- **Collision Detection**: 
  - Accurate paddle-ball collision
  - Wall collision detection
  - Out of bounds detection for scoring

- **Scoreboard**: Real-time score tracking for player and computer

- **Game Controls**:
  - Start Game button to begin playing
  - Reset button to restart the game and scores

## How to Play

1. Open `index.html` in your web browser
2. Click the "Start Game" button to begin
3. Move your paddle (left side) to hit the ball back to the computer
4. First to reach the highest score wins!
5. Use "Reset" to start over

## Game Mechanics

- The player paddle (left, green) is controlled by mouse or arrow keys
- The computer paddle (right, green) automatically tracks the ball
- The ball (white) bounces off paddles and walls
- Score is awarded when the ball passes the opponent's paddle
- The ball's trajectory changes based on where it hits the paddle (spin effect)

## Files

- `index.html` - Game structure and layout
- `style.css` - Styling and animations
- `script.js` - Game logic and mechanics

Enjoy the game!
