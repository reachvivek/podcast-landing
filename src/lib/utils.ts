import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Reusable glassmorphism button styles
export const glassButtonStyles = {
  base: "relative overflow-hidden font-light backdrop-blur-md text-sm px-6 py-3 rounded-full transition-all duration-500 group",
  border: "border border-white/30 hover:border-ecospace-green",
  text: "text-white hover:text-ecospace-green",
  background: "bg-white/10 hover:bg-white/20",
  shadow: "shadow-2xl hover:shadow-ecospace-green/30",
  shimmer: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none",
  depthLayer: "absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none",
  tilt3d: {
    transformStyle: 'preserve-3d' as const,
    transform: 'rotateX(0deg) rotateY(0deg)',
  },
  // Primary CTA specific styles - stands out more
  primaryBorder: "border-2 border-ecospace-green/50 hover:border-ecospace-green",
  primaryBackground: "bg-ecospace-green/10 hover:bg-ecospace-green/20",
  primaryShadow: "shadow-2xl shadow-ecospace-green/20 hover:shadow-ecospace-green/40",
  primaryShimmer: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none",
  primaryDepthLayer: "absolute inset-0 rounded-full bg-gradient-to-b from-ecospace-green/10 to-transparent pointer-events-none",
} as const;

// Combined glass button class (secondary/default)
export const glassButtonClass = cn(
  glassButtonStyles.base,
  glassButtonStyles.border,
  glassButtonStyles.text,
  glassButtonStyles.background,
  glassButtonStyles.shadow
);

// Primary CTA glass button class - main character energy
export const glassButtonPrimaryClass = cn(
  glassButtonStyles.base,
  glassButtonStyles.primaryBorder,
  glassButtonStyles.text,
  glassButtonStyles.primaryBackground,
  glassButtonStyles.primaryShadow
);
