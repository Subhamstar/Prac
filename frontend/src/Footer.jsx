import React, { useEffect, useRef } from "react";

const Footer = () => {
  const footerRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const wave = waveRef.current;

    if (!footer || !wave) return;

    // Disable on mobile for performance
    if (window.innerWidth < 768) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = footer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;

        rafId = null;
      });
    };
    footer.addEventListener("mousemove", handleMouseMove);
    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
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
shadow-lg
hover:shadow-[0_0_35px_rgba(255,165,0,0.7)]
transition-all duration-500
relative overflow-hidden
"
    >
      {/* Cursor Wave */}
      <div className="absolute inset-0 pointer-events-none">
        <div ref={waveRef} className="cursor-wave" />
      </div>

      {/* Left */}
      <div className="z-10 text-sm font-medium">
        © {new Date().getFullYear()} SincosTani Ltd.
      </div>

      {/* Center Rating */}
      <div className="rating gap-1 z-10">
        <input type="radio" name="footer-rating" className="mask mask-heart bg-red-400" />
        <input
          type="radio"
          name="footer-rating"
          className="mask mask-heart bg-orange-400"
          defaultChecked
        />
        <input type="radio" name="footer-rating" className="mask mask-heart bg-yellow-400" />
        <input type="radio" name="footer-rating" className="mask mask-heart bg-lime-400" />
        <input type="radio" name="footer-rating" className="mask mask-heart bg-green-400" />
      </div>

      {/* Right */}
      <div className="flex gap-4 z-10 text-lg">
        <a className="cursor-pointer hover:scale-110 transition">🐦</a>
        <a className="cursor-pointer hover:scale-110 transition">▶️</a>
        <a className="cursor-pointer hover:scale-110 transition">📘</a>
      </div>
    </footer>
  );
};

export default Footer;
