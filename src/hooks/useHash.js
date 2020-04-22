// @flow

import { useState, useEffect } from 'react';

const useHash = () => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange, false);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return hash;
};

export default useHash;