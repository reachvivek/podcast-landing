'use client';

import { ReactNode, MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Button3DProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

// Shared 3D tilt effect handler
const handle3DTilt = (e: MouseEvent<HTMLAnchorElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -5;
  const rotateY = ((x - centerX) / centerX) * 5;
  e.currentTarget.parentElement!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const reset3DTilt = (e: MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.parentElement!.style.transform = 'rotateX(0deg) rotateY(0deg)';
};

export function Button3D({
  href,
  children,
  variant = 'primary',
  className,
  icon,
  iconPosition = 'left',
}: Button3DProps) {
  const isPrimary = variant === 'primary';

  const buttonClasses = isPrimary
    ? 'bg-white/90 hover:bg-ecospace-green text-black font-bold shadow-2xl hover:shadow-ecospace-green/50 border border-white/30'
    : 'border-2 border-white/60 bg-white/5 backdrop-blur-xl text-white hover:text-white hover:bg-white/15 hover:border-white font-semibold shadow-lg hover:shadow-white/30';

  const shimmerOpacity = isPrimary ? 'via-white/60' : 'via-white/50';
  const depthOpacity = isPrimary ? 'from-white/10' : 'from-white/5';

  return (
    <Button
      asChild
      size="lg"
      variant={isPrimary ? 'default' : 'outline'}
      className={cn(
        'relative overflow-hidden text-base px-10 py-7 rounded-full transition-all duration-500 group',
        buttonClasses,
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'rotateX(0deg) rotateY(0deg)',
      }}
    >
      <a
        href={href}
        className="flex items-center justify-center gap-3 relative z-10"
        onMouseMove={handle3DTilt}
        onMouseLeave={reset3DTilt}
      >
        {/* 3D Depth Layer */}
        <span
          className={cn(
            'absolute inset-0 rounded-full bg-gradient-to-b to-transparent pointer-events-none',
            depthOpacity
          )}
          style={{ transform: 'translateZ(-10px)' }}
        />

        {/* Shimmer Effect */}
        <span
          className={cn(
            'absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent to-transparent pointer-events-none',
            shimmerOpacity
          )}
        />

        {/* Content */}
        {icon && iconPosition === 'left' && (
          <span className="group-hover:rotate-12 transition-all duration-300 relative z-10">
            {icon}
          </span>
        )}
        <span className={cn(
          'relative z-10',
          isPrimary ? 'uppercase tracking-widest font-medium' : 'tracking-wide'
        )}>
          {children}
        </span>
        {icon && iconPosition === 'right' && (
          <span className="group-hover:translate-x-1 transition-transform duration-300 relative z-10">
            {icon}
          </span>
        )}
      </a>
    </Button>
  );
}
