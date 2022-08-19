import { useEffect } from "react";
import { useState } from "react";

function useCurrentWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeOut = null;

    const resizeListener = () => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => setWidth(window.innerWidth), 1000);
    };
    
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
}

export default useCurrentWidth;