import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-2xl border border-gray-100 bg-white p-6 shadow-sm', className)}
      {...props}
    />
  );
}
