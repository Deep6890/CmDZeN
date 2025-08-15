// components/LenisScroll.jsx
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisScroll({ children }) {
  const lenis = useRef(null);

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
      direction: "vertical",
    });

    const animate = (time) => {
      lenis.current.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // show scrollbar
    document.body.style.overflowY = "scroll";

    return () => {
      lenis.current.destroy();
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div>
      {/* Sleek modern scrollbar */}
      <style>{`
        /* Chrome, Edge, Safari */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(26, 26, 26, 0.4);
          backdrop-filter: blur(4px);
        }
        ::-webkit-scrollbar-thumb {
          background-color: #7f5af0; 
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #5a3de0;
        }

        /* Firefox */
        html {
          scrollbar-width: thin;
          scrollbar-color: #7f5af0 rgba(26,26,26,0.4);
        }
      `}</style>

      {children}
    </div>
  );
}
