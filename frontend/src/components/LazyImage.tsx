import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  'data-testid'?: string;
}

export function LazyImage({ src, alt, className = '', 'data-testid': testId }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Generate a simple placeholder based on the image dimensions
  const placeholderUrl = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16">Loading...</text>
    </svg>
  `)}`;

  const errorPlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fee2e2"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#dc2626" font-family="Arial, sans-serif" font-size="14">Image not available</text>
    </svg>
  `)}`;

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {inView && (
        <>
          {!loaded && (
            <img
              src={placeholderUrl}
              alt="Loading..."
              className={`w-full h-48 object-cover transition-opacity duration-300 ${
                loaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}
          <img
            src={error ? errorPlaceholder : src}
            alt={alt}
            className={`w-full h-48 object-cover transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            } ${loaded ? '' : 'absolute top-0 left-0'}`}
            onLoad={handleLoad}
            onError={handleError}
            data-testid={testId}
          />
        </>
      )}
      {!inView && (
        <img
          src={placeholderUrl}
          alt="Loading..."
          className="w-full h-48 object-cover"
        />
      )}
    </div>
  );
}