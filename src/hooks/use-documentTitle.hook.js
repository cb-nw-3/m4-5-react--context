import React, { useEffect } from "react";

const useDocumentTitle = (title, fallbackTitle) => {
  React.useEffect(() => {
    //document.title = `${numCookies} cookies - Cookie Clicker`;
    document.title = title;
    return () => {
      document.title = fallbackTitle;
    };
  }, [title, fallbackTitle]);
};

export default useDocumentTitle;
