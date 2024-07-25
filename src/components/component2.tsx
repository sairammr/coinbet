"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/router'

// Define the type for the result state
type Result = "win" | "loss" | null

export function Component2() {
  const [result, setResult] = useState<Result>(null)
  const [showCoin, setShowCoin] = useState(true)
  const router = useRouter()
  const { address } = router.query
  
  const tossCoin = () => {
    const isWin = Math.random() < 0.5
    setResult(isWin ? "win" : "loss")
    setShowCoin(false) // Hide the coin immediately after the result is set
    setTimeout(() => {
      if (isWin) {
        router.push( {pathname: '/submit',
          query: { address:address }})
      } else {
        router.push('/')
      }
    }, 1000) // Adjust the duration as needed
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        {showCoin && (
          <div
            className={`absolute inset-0 rounded-full border-4 border-primary transition-transform duration-1000 ease-in-out ${
              result === "win"
                ? "rotate-[1800deg] scale-[3] after:absolute after:inset-0 after:rounded-full after:border-4 after:border-primary after:opacity-0 after:transition-opacity after:duration-1000 after:ease-in-out after:animate-ping"
                : result === "loss"
                ? "-rotate-[1800deg] scale-[3] after:absolute after:inset-0 after:rounded-full after:border-4 after:border-primary after:opacity-0 after:transition-opacity after:duration-1000 after:ease-in-out after:animate-ping"
                : ""
            }`}
          />
        )}
        <button
          onClick={tossCoin}
          className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring coin"
        >
          <CoinsIcon className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
        </button>
      </div>
      {!showCoin && result && (
        <p className={`mt-6 text-2xl font-bold ${result === "win" ? "text-green-500" : "text-red-500"}`}>
          {result === "win" ? "You Won!" : "You Lost!"}
        </p>
      )}
    </div>
  )
}

interface IconProps {
  className?: string
  width?: number
  height?: number
}

function CoinsIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}

function XIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
