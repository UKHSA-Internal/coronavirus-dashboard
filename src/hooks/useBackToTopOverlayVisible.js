import { useState, useEffect } from 'react';

/**
 * Overlay style back-to-top links should only be visible once you've scrolled
 * down the page a bit, but not once you've reached the footer.
 *
 * @param {string} footerSelector A 'footer', '.footer' or '#footer' format
 * string to find the footer element.
 *
 * @returns {boolean} Whether an 'overlay' style back-to-top link should be
 * visible.
 */
const useBackToTopOverlayVisible = (footerSelector) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      // Check to see if the user's scrolled down the page a bit.
      const notAtTopOfPage = window.scrollY > (window.innerHeight / 2);

      // Grab the 'footer' element - the last large visible element.
      const footer = document.querySelector(footerSelector);

      // Grab the footer's position, or default it if the element's not there.
      const footerPosition = footer ? footer.offsetTop : Number.MAX_SAFE_INTEGER;

      // Check to see if the user's scrolled down, but not all the way.
      const notAtBottomOfPage = window.scrollY <  (footerPosition - window.innerHeight);

      // The overlay link should only be visible when the user's in the middle
      // of the page.
      setVisible(notAtTopOfPage && notAtBottomOfPage)
    }
    window.addEventListener('scroll', handleScroll)
    return () => { window.removeEventListener('scroll', handleScroll) }
  })
  return visible; 
};

export default useBackToTopOverlayVisible;