import { useEffect } from 'react';

function useKeydown(code, callback) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === code) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [callback, code]);
}

export default useKeydown;
