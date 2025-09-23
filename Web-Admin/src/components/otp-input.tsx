"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  onComplete?: (otp: string) => void
  className?: string
}

export function OTPInput({ length = 6, onComplete, className }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))])
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text/plain").slice(0, length)
    const pasteArray = pasteData.split("").filter((char) => !isNaN(Number(char)))

    if (pasteArray.length > 0) {
      const newOtp = [...otp]
      pasteArray.forEach((char, idx) => {
        if (idx < length) {
          newOtp[idx] = char
        }
      })
      setOtp(newOtp)

      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex((val) => val === "")
      const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1
      inputRefs.current[focusIndex]?.focus()
    }
  }

  useEffect(() => {
    const otpValue = otp.join("")
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue)
    }
  }, [otp, length, onComplete])

  return (
    <div className={cn("flex gap-3 justify-center", className)}>
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => {
            inputRefs.current[index] = el
          }} value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg font-semibold bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 hover:border-ring/50"
        />
      ))}
    </div>
  )
}
