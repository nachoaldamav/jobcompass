'use client';
import ContentLoader from 'react-content-loader';

export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  return (
    <ContentLoader
      speed={3}
      width={'100%'}
      height={160}
      viewBox='0 0 400 160'
      backgroundColor='#141521'
      foregroundColor='#7fcef3'
      backgroundOpacity={0.2}
      foregroundOpacity={0.4}
    >
      {children}
    </ContentLoader>
  );
}
