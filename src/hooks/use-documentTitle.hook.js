import React from "react";

//this hook will update the tab title on the browser with the current cookie count
//changes whenever the numCookie state updates

export default function useDocumentTitle(cookies) {
  React.useEffect(() => {
    document.title = `${cookies} cookies - Cookie Clicker Workshop`;

    return () => {
      document.title = "Cookie Clicker Workshop";
    };
  }, [cookies]);
}
