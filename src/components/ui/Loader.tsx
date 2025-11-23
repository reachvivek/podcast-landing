export default function Loader({ size = 'md', fullScreen = false }: { size?: 'sm' | 'md' | 'lg', fullScreen?: boolean }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const loaderContent = (
    <div className="relative">
      {/* Outer spinning ring */}
      <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-800 border-t-ecospace-green animate-spin`} />

      {/* Inner pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-ecospace-green rounded-full animate-pulse" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        {loaderContent}
        <p className="text-gray-400 text-sm mt-4 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {loaderContent}
    </div>
  );
}
