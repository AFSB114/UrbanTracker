import * as React from "react"
import { cn } from "lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  className?: string
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"

// AvatarImage
interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn("w-full h-full object-cover", className)}
        {...props}
      />
    )
  }
)

AvatarImage.displayName = "AvatarImage"

// AvatarFallback
interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gray-400 text-white font-bold",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AvatarFallback.displayName = "AvatarFallback"
