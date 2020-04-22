import { useState, useEffect } from 'react';

const useResponsiveLayout = (breakpoint) => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])
  return width > breakpoint ? 'desktop' : 'mobile'; 
};

export default useResponsiveLayout;