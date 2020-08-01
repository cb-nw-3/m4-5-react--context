import React from "react";

const useDocumentTitle = (title, fallBackTitle) => {
  React.useEffect(() => {
    document.title = title;
    return () => {
      document.title = fallBackTitle;
    };
  }, [title, fallBackTitle]);
};

export default useDocumentTitle;
