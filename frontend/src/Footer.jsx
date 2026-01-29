import React, { useEffect, useRef } from "react";

const Footer = () => {
  const waveRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const wave = waveRef.current;

    const moveWave = (e) => {
      const rect = footer.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
    };

    footer.addEventListener("mousemove", moveWave);

    return () => {
      footer.removeEventListener("mousemove", moveWave);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
fixed bottom-0 left-0 z-50
w-full

flex items-center justify-between
px-6 py-3

text-neutral-content

bg-gradient-to-r from-orange-700 via-blue-700 to-orange-700
bg-[length:200%_200%]
animate-gradient

backdrop-blur-md bg-opacity-90

transition-all duration-500
hover:shadow-[0_0_35px_rgba(255,165,0,0.7)]
relative overflow-hidden
"
    >
      {/* Cursor Wave */}
      <div className="absolute inset-0 pointer-events-none">
        <div ref={waveRef} className="cursor-wave"></div>
      </div>

      {/* Left */}
      <div className="flex items-center gap-2 z-10">
        <p className="text-sm">
          © {new Date().getFullYear()} SincosTani Ltd.
        </p>
      </div>

      {/* Center Rating */}
      <div className="rating flex gap-1 z-10">
        <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
        <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" defaultChecked />
        <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" />
        <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" />
        <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" />
      </div>

      {/* Right */}
      <div className="flex gap-4 z-10">
        <a className="hover:scale-110 transition">🐦</a>
        <a className="hover:scale-110 transition">▶️</a>
        <a className="hover:scale-110 transition">📘</a>
      </div>
    </footer>
  );
};

export default Footer;
