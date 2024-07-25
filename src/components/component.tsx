"use client"
import Link from "next/link";
import { useState, ChangeEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Component() {
  const [betAmount, setBetAmount] = useState<number>(0)
  const [result, setResult] = useState<string | null>(null)

  const handleBet = () => {
    const coinToss = Math.random() < 0.5 ? "heads" : "tails"
    const isWin = coinToss === "heads"
    setResult(isWin ? "You won!" : "You lost.")
    window.location.href = `/deposit?amount=${betAmount}`
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBetAmount(Number(e.target.value))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Bitcoin Coin Toss</CardTitle>
        <CardDescription>Place your bet and see if you can double your money!</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="bet-amount">Bet Amount (BTC)</Label>
          <Input
            id="bet-amount"
            type="number"
            step="0.00000001"
            min="0.00000001"
            value={betAmount}
            onChange={handleInputChange}
          />
        </div>
        <Link
                    href={`/submit?title=${encodeURIComponent(betAmount)}`}
                    passHref
                  >
        <Button onClick={handleBet}>Toss Coin</Button></Link>
        
      </CardContent>
    </Card>
  )
}
