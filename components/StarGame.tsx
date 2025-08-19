'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, RotateCcw, Trophy, Clock, Target } from 'lucide-react'
import { Constellation } from '../types'

interface StarGameProps {
  constellations: Constellation[]
}

interface StarPattern {
  id: string
  name: string
  stars: Array<{ x: number; y: number; id: string }>
}

interface GameState {
  isPlaying: boolean
  score: number
  timeLeft: number
  currentConstellation: StarPattern | null
  userConnections: Array<{ from: string; to: string }>
  correctConnections: Array<{ from: string; to: string }>
  gameComplete: boolean
  selectedStar: string | null
  level: number
}

const GAME_TIME = 120 // 2 minutes
const POINTS_PER_CONNECTION = 10
const BONUS_POINTS_PER_SECOND = 2

// Generate star patterns based on constellation data
const generateStarPattern = (constellation: Constellation): StarPattern => {
  const numStars = Math.floor(Math.random() * 8) + 5 // 5-12 stars
  const stars = []
  
  for (let i = 0; i < numStars; i++) {
    stars.push({
      id: `star-${i}`,
      x: Math.random() * 80 + 10, // 10-90% of container width
      y: Math.random() * 70 + 15, // 15-85% of container height
    })
  }
  
  return {
    id: constellation.id,
    name: constellation.title,
    stars,
  }
}

// Generate correct connections for a star pattern (simplified constellation shape)
const generateCorrectConnections = (stars: Array<{ x: number; y: number; id: string }>): Array<{ from: string; to: string }> => {
  const connections = []
  const numConnections = Math.max(2, Math.floor(stars.length * 0.6))
  
  // Create a simple pattern by connecting stars in a somewhat logical order
  for (let i = 0; i < numConnections && i < stars.length - 1; i++) {
    const fromIndex = i
    const toIndex = i + 1
    connections.push({
      from: stars[fromIndex].id,
      to: stars[toIndex].id,
    })
  }
  
  // Add a few random connections to make it more interesting
  const extraConnections = Math.floor(numConnections * 0.3)
  for (let i = 0; i < extraConnections; i++) {
    const fromIndex = Math.floor(Math.random() * stars.length)
    let toIndex = Math.floor(Math.random() * stars.length)
    while (toIndex === fromIndex) {
      toIndex = Math.floor(Math.random() * stars.length)
    }
    
    const connection = {
      from: stars[fromIndex].id,
      to: stars[toIndex].id,
    }
    
    // Don't add duplicate connections
    if (!connections.some(c => 
      (c.from === connection.from && c.to === connection.to) ||
      (c.from === connection.to && c.to === connection.from)
    )) {
      connections.push(connection)
    }
  }
  
  return connections
}

export default function StarGame({ constellations }: StarGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    timeLeft: GAME_TIME,
    currentConstellation: null,
    userConnections: [],
    correctConnections: [],
    gameComplete: false,
    selectedStar: null,
    level: 1,
  })

  const selectNewConstellation = useCallback(() => {
    if (constellations.length === 0) return
    
    const randomConstellation = constellations[Math.floor(Math.random() * constellations.length)]
    if (!randomConstellation) return
    
    const starPattern = generateStarPattern(randomConstellation)
    const correctConnections = generateCorrectConnections(starPattern.stars)
    
    setGameState(prev => ({
      ...prev,
      currentConstellation: starPattern,
      correctConnections,
      userConnections: [],
      selectedStar: null,
    }))
  }, [constellations])

  const startGame = () => {
    setGameState({
      isPlaying: true,
      score: 0,
      timeLeft: GAME_TIME,
      currentConstellation: null,
      userConnections: [],
      correctConnections: [],
      gameComplete: false,
      selectedStar: null,
      level: 1,
    })
    selectNewConstellation()
  }

  const resetGame = () => {
    setGameState({
      isPlaying: false,
      score: 0,
      timeLeft: GAME_TIME,
      currentConstellation: null,
      userConnections: [],
      correctConnections: [],
      gameComplete: false,
      selectedStar: null,
      level: 1,
    })
  }

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }))
      }, 1000)
    } else if (gameState.timeLeft <= 0 && gameState.isPlaying) {
      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        gameComplete: true,
      }))
    }
    
    return () => clearTimeout(timer)
  }, [gameState.isPlaying, gameState.timeLeft])

  const handleStarClick = (starId: string) => {
    if (!gameState.isPlaying) return

    if (!gameState.selectedStar) {
      // First star selection
      setGameState(prev => ({
        ...prev,
        selectedStar: starId,
      }))
    } else if (gameState.selectedStar === starId) {
      // Deselect if clicking the same star
      setGameState(prev => ({
        ...prev,
        selectedStar: null,
      }))
    } else {
      // Second star selection - create connection
      const newConnection = {
        from: gameState.selectedStar,
        to: starId,
      }
      
      // Check if connection already exists
      const connectionExists = gameState.userConnections.some(conn =>
        (conn.from === newConnection.from && conn.to === newConnection.to) ||
        (conn.from === newConnection.to && conn.to === newConnection.from)
      )
      
      if (!connectionExists) {
        const updatedConnections = [...gameState.userConnections, newConnection]
        
        // Check if this connection is correct
        const isCorrect = gameState.correctConnections.some(conn =>
          (conn.from === newConnection.from && conn.to === newConnection.to) ||
          (conn.from === newConnection.to && conn.to === newConnection.from)
        )
        
        let newScore = gameState.score
        if (isCorrect) {
          newScore += POINTS_PER_CONNECTION
        }
        
        setGameState(prev => ({
          ...prev,
          userConnections: updatedConnections,
          selectedStar: null,
          score: newScore,
        }))
        
        // Check if constellation is complete
        const correctConnectionsFound = updatedConnections.filter(userConn =>
          gameState.correctConnections.some(correctConn =>
            (correctConn.from === userConn.from && correctConn.to === userConn.to) ||
            (correctConn.from === userConn.to && correctConn.to === userConn.from)
          )
        )
        
        if (correctConnectionsFound.length >= gameState.correctConnections.length) {
          // Constellation complete! Add time bonus and move to next
          const timeBonus = gameState.timeLeft * BONUS_POINTS_PER_SECOND
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              score: newScore + timeBonus,
              level: prev.level + 1,
            }))
            selectNewConstellation()
          }, 1000)
        }
      } else {
        setGameState(prev => ({
          ...prev,
          selectedStar: null,
        }))
      }
    }
  }

  const getConnectionPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  }

  const isConnectionCorrect = (connection: { from: string; to: string }) => {
    return gameState.correctConnections.some(conn =>
      (conn.from === connection.from && conn.to === connection.to) ||
      (conn.from === connection.to && conn.to === connection.from)
    )
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!gameState.isPlaying && !gameState.gameComplete) {
    return (
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Star className="w-16 h-16 text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold">Constellation Challenge</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect the stars to form constellations! Click on stars to create connections and discover the patterns hidden in the night sky.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
            <div className="bg-card border border-border rounded-lg p-4">
              <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="font-medium">Connect Stars</p>
              <p className="text-muted-foreground">Click stars to form constellation patterns</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="font-medium">Earn Points</p>
              <p className="text-muted-foreground">10 points per correct connection + time bonus</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <Clock className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="font-medium">Beat the Clock</p>
              <p className="text-muted-foreground">2 minutes to connect as many as possible</p>
            </div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
        >
          Start Game
        </button>
      </div>
    )
  }

  if (gameState.gameComplete) {
    return (
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
          <h2 className="text-3xl font-bold">Game Complete!</h2>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-blue-400">Final Score: {gameState.score}</p>
            <p className="text-lg">Level Reached: {gameState.level}</p>
            <p className="text-muted-foreground">
              You completed {gameState.level - 1} constellation{gameState.level - 1 !== 1 ? 's' : ''}!
            </p>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={resetGame}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    )
  }

  if (!gameState.currentConstellation) {
    return (
      <div className="text-center">
        <p>Loading constellation...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Game HUD */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Score</p>
            <p className="text-xl font-bold text-blue-400">{gameState.score}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Level</p>
            <p className="text-xl font-bold">{gameState.level}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="text-xl font-bold text-red-400">{formatTime(gameState.timeLeft)}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Constellation</p>
          <p className="text-lg font-bold">{gameState.currentConstellation.name}</p>
        </div>
      </div>

      {/* Game Area */}
      <div className="bg-gradient-to-b from-indigo-950 to-purple-950 rounded-lg relative overflow-hidden" style={{ height: '500px' }}>
        <svg className="absolute inset-0 w-full h-full">
          {/* Render user connections */}
          {gameState.userConnections.map((connection, index) => {
            // FIXED: Add null safety check for currentConstellation
            if (!gameState.currentConstellation) return null
            
            const fromStar = gameState.currentConstellation.stars.find(s => s.id === connection.from)
            const toStar = gameState.currentConstellation.stars.find(s => s.id === connection.to)
            
            // FIXED: Add null safety checks for stars
            if (!fromStar || !toStar) return null
            
            const isCorrect = isConnectionCorrect(connection)
            
            return (
              <path
                key={index}
                d={getConnectionPath(
                  { x: fromStar.x, y: fromStar.y },
                  { x: toStar.x, y: toStar.y }
                )}
                stroke={isCorrect ? '#22c55e' : '#ef4444'}
                strokeWidth="2"
                strokeDasharray={isCorrect ? '0' : '5,5'}
                className="transition-all duration-300"
              />
            )
          })}
        </svg>

        {/* Render stars */}
        {gameState.currentConstellation.stars.map((star) => (
          <button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
              gameState.selectedStar === star.id
                ? 'scale-125 text-yellow-300'
                : 'text-yellow-100 hover:text-yellow-200 hover:scale-110'
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          >
            <Star className="w-4 h-4 fill-current" />
          </button>
        ))}

        {/* Twinkling background stars */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Click on stars to select them, then click another star to create a connection.</p>
        <p className="mt-1">Green lines are correct connections, red dashed lines are incorrect.</p>
      </div>
    </div>
  )
}