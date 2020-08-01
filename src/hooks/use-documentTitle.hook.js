import { useEffect } from 'react';
import addCommas from '../functions/addCommas';

function useDocumentTitle(title, fallBackTitle) {
  useEffect(() => {
    document.title = `${addCommas(title)} cookie(s) - Cookie Clicker Workshop`;
    return () => {
      document.title = fallBackTitle;
    };
  }, [title, fallBackTitle]);
}

export default useDocumentTitle;
