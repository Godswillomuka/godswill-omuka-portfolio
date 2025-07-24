import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Trophy, Zap, Target, Home, Play, Pause, RotateCw, ArrowDown } from 'lucide-react';

const TetrisGame = ({ onClose, onBackToModal }) => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  
  const BOARD_WIDTH = 10;
  const BOARD_HEIGHT = 20;
  const CELL_SIZE = 25;
  
  // Tetris pieces (tetrominoes)
  const PIECES = {
    I: {
      shape: [[1, 1, 1, 1]],
      color: '#00ffff'
    },
    O: {
      shape: [
        [1, 1],
        [1, 1]
      ],
      color: '#ffff00'
    },
    T: {
      shape: [
        [0, 1, 0],
        [1, 1, 1]
      ],
      color: '#800080'
    },
    S: {
      shape: [
        [0, 1, 1],
        [1, 1, 0]
      ],
      color: '#00ff00'
    },
    Z: {
      shape: [
        [1, 1, 0],
        [0, 1, 1]
      ],
      color: '#ff0000'
    },
    J: {
      shape: [
        [1, 0, 0],
        [1, 1, 1]
      ],
      color: '#0000ff'
    },
    L: {
      shape: [
        [0, 0, 1],
        [1, 1, 1]
      ],
      color: '#ffa500'
    }
  };

  const [board, setBoard] = useState(() => 
    Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(localStorage.getItem('tetrisHighScore') || 0);
  const [dropTime, setDropTime] = useState(1000);

  const createPiece = useCallback(() => {
    const pieces = Object.keys(PIECES);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      type: randomPiece,
      shape: PIECES[randomPiece].shape,
      color: PIECES[randomPiece].color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(PIECES[randomPiece].shape[0].length / 2),
      y: 0
    };
  }, []);

  const rotatePiece = (piece) => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    );
    return { ...piece, shape: rotated };
  };

  const isValidMove = useCallback((piece, newX, newY, newShape = piece.shape) => {
    for (let y = 0; y < newShape.length; y++) {
      for (let x = 0; x < newShape[y].length; x++) {
        if (newShape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;
          
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (boardY >= 0 && board[boardY][boardX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  const clearLines = useCallback((newBoard) => {
    let linesCleared = 0;
    const clearedBoard = newBoard.filter(row => {
      if (row.every(cell => cell !== 0)) {
        linesCleared++;
        return false;
      }
      return true;
    });

    while (clearedBoard.length < BOARD_HEIGHT) {
      clearedBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    if (linesCleared > 0) {
      const points = [0, 40, 100, 300, 1200][linesCleared] * level;
      setScore(prev => {
        const newScore = prev + points;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('tetrisHighScore', newScore);
        }
        return newScore;
      });
      setLines(prev => {
        const newLines = prev + linesCleared;
        const newLevel = Math.floor(newLines / 10) + 1;
        setLevel(newLevel);
        setDropTime(Math.max(50, 1000 - (newLevel - 1) * 100));
        return newLines;
      });
    }

    return clearedBoard;
  }, [level, highScore]);

  const placePiece = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }

    const clearedBoard = clearLines(newBoard);
    setBoard(clearedBoard);
    setCurrentPiece(nextPiece);
    setNextPiece(createPiece());

    // Check game over
    if (!isValidMove(nextPiece, nextPiece.x, nextPiece.y)) {
      setGameOver(true);
    }
  }, [currentPiece, nextPiece, board, clearLines, createPiece, isValidMove]);

  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || gameOver || isPaused) return;

    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;

    if (isValidMove(currentPiece, newX, newY)) {
      setCurrentPiece(prev => ({ ...prev, x: newX, y: newY }));
    } else if (dy > 0) {
      placePiece();
    }
  }, [currentPiece, gameOver, isPaused, isValidMove, placePiece]);

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotated = rotatePiece(currentPiece);
    if (isValidMove(currentPiece, currentPiece.x, currentPiece.y, rotated.shape)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, gameOver, isPaused, isValidMove]);

  const dropPiece = useCallback(() => {
    movePiece(0, 1);
  }, [movePiece]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    let newY = currentPiece.y;
    while (isValidMove(currentPiece, currentPiece.x, newY + 1)) {
      newY++;
    }
    setCurrentPiece(prev => ({ ...prev, y: newY }));
    setTimeout(placePiece, 50);
  }, [currentPiece, gameOver, isPaused, isValidMove, placePiece]);

  const resetGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentPiece(null);
    setNextPiece(null);
    setGameOver(false);
    setGameStarted(false);
    setIsPaused(false);
    setScore(0);
    setLines(0);
    setLevel(1);
    setDropTime(1000);
  };

  const startGame = () => {
    const firstPiece = createPiece();
    const secondPiece = createPiece();
    setCurrentPiece(firstPiece);
    setNextPiece(secondPiece);
    setGameStarted(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused);
    }
  };

  // Game loop
  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) {
      gameLoopRef.current = setInterval(dropPiece, dropTime);
    } else {
      clearInterval(gameLoopRef.current);
    }

    return () => clearInterval(gameLoopRef.current);
  }, [dropPiece, dropTime, gameStarted, gameOver, isPaused]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted && e.code === 'Space') {
        startGame();
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          rotatePieceHandler();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePiece(1, 0);
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, rotatePieceHandler, hardDrop, gameStarted, togglePause]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = 'rgba(10, 10, 10, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(100, 255, 218, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(BOARD_WIDTH * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }

    // Draw placed pieces
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (board[y][x]) {
          ctx.fillStyle = board[y][x];
          ctx.fillRect(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
          
          // Add highlight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillRect(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE - 2, 3);
        }
      }
    }

    // Draw current piece
    if (currentPiece) {
      ctx.fillStyle = currentPiece.color;
      ctx.shadowColor = currentPiece.color;
      ctx.shadowBlur = 10;
      
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const drawX = (currentPiece.x + x) * CELL_SIZE;
            const drawY = (currentPiece.y + y) * CELL_SIZE;
            ctx.fillRect(drawX + 1, drawY + 1, CELL_SIZE - 2, CELL_SIZE - 2);
            
            // Add highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillRect(drawX + 1, drawY + 1, CELL_SIZE - 2, 3);
            ctx.fillStyle = currentPiece.color;
          }
        }
      }
      ctx.shadowBlur = 0;
    }
  }, [board, currentPiece]);

  const renderNextPiece = () => {
    if (!nextPiece) return null;

    return (
      <div className="next-piece-container">
        <h4>Next</h4>
        <div className="next-piece-grid">
          {nextPiece.shape.map((row, y) => (
            <div key={y} className="next-piece-row">
              {row.map((cell, x) => (
                <div
                  key={x}
                  className="next-piece-cell"
                  style={{
                    backgroundColor: cell ? nextPiece.color : 'transparent',
                    boxShadow: cell ? `0 0 10px ${nextPiece.color}` : 'none'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="game-container tetris-game">
      <div className="game-header">
        <button className="back-btn" onClick={onBackToModal}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h2>🧩 Tetris</h2>
        <button className="reset-btn" onClick={resetGame}>
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="tetris-layout">
        <div className="game-info">
          <div className="game-stats">
            <div className="stat-box">
              <Zap size={16} />
              <span>Score</span>
              <span className="stat-value">{score.toLocaleString()}</span>
            </div>
            <div className="stat-box">
              <Target size={16} />
              <span>Lines</span>
              <span className="stat-value">{lines}</span>
            </div>
            <div className="stat-box">
              <Trophy size={16} />
              <span>Level</span>
              <span className="stat-value">{level}</span>
            </div>
            <div className="stat-box">
              <span>🏆</span>
              <span>Best</span>
              <span className="stat-value">{parseInt(highScore).toLocaleString()}</span>
            </div>
          </div>

          {renderNextPiece()}

          <div className="game-controls-info">
            <h4>Controls</h4>
            <div className="control-info">
              <span>← → : Move</span>
              <span>↑ : Rotate</span>
              <span>↓ : Soft Drop</span>
              <span>Space: Hard Drop/Pause</span>
            </div>
          </div>
        </div>

        <div className="game-board-container">
          <canvas
            ref={canvasRef}
            width={BOARD_WIDTH * CELL_SIZE}
            height={BOARD_HEIGHT * CELL_SIZE}
            className="tetris-canvas"
          />
          
          {isPaused && gameStarted && !gameOver && (
            <div className="pause-overlay">
              <Pause size={48} />
              <p>Game Paused</p>
              <p>Press Space to continue</p>
            </div>
          )}
        </div>
      </div>

      {!gameStarted && !gameOver && (
        <motion.div
          className="game-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>🧩 Classic Tetris</h3>
          <p>Arrange falling blocks to clear lines</p>
          <p>Complete horizontal lines to score points</p>
          <p>Game speeds up as you progress!</p>
          <div className="overlay-buttons">
            <button className="start-btn" onClick={startGame}>
              <Play size={20} />
              Start Game
            </button>
            <button className="back-btn-overlay" onClick={onClose}>
              <Home size={20} />
              Back to Portfolio
            </button>
          </div>
        </motion.div>
      )}

      {gameOver && (
        <motion.div
          className="game-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>Game Over!</h3>
          <p>Final Score: {score.toLocaleString()}</p>
          <p>Lines Cleared: {lines}</p>
          <p>Level Reached: {level}</p>
          {score === parseInt(highScore) && score > 0 && (
            <p className="new-record">🎉 New High Score!</p>
          )}
          <div className="overlay-buttons">
            <button className="start-btn" onClick={resetGame}>
              <Play size={20} />
              Play Again
            </button>
            <button className="back-btn-overlay" onClick={onClose}>
              <Home size={20} />
              Back to Portfolio
            </button>
          </div>
        </motion.div>
      )}

      {/* Mobile Controls */}
      <div className="mobile-controls tetris-controls">
        <div className="control-section">
          <div className="control-row">
            <button
              className="control-btn rotate-btn"
              onClick={rotatePieceHandler}
            >
              <RotateCw size={20} />
            </button>
            <button
              className="control-btn pause-btn"
              onClick={togglePause}
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>
            <button
              className="control-btn drop-btn"
              onClick={hardDrop}
            >
              <ArrowDown size={20} />
            </button>
          </div>
          <div className="control-row">
            <button
              className="control-btn"
              onClick={() => movePiece(-1, 0)}
            >
              ←
            </button>
            <button
              className="control-btn"
              onClick={() => movePiece(0, 1)}
            >
              ↓
            </button>
            <button
              className="control-btn"
              onClick={() => movePiece(1, 0)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;