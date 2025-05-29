'use client';

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizes[size]} border-2 border-[#2b4e4b]/20 border-t-[#2b4e4b] rounded-full animate-spin`} />
    </div>
  );
}
