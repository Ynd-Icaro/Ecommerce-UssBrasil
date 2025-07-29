"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group bg-glass border border-[var(--normal-border)] shadow-lg rounded-xl p-4 text-[var(--normal-text)] transition-all duration-300 backdrop-blur-lg"
      style={{
        "--normal-bg": "var(--glass-bg)",
        "--normal-text": "var(--gray-900)",
        "--normal-border": "var(--glass-border)",
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
