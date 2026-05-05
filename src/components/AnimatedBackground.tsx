import { useEffect, useRef, useState } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (reduced || isMobile) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      aBase: number;
      phase: number;
      hue: number;
    };

    const count = Math.min(28, Math.floor((width * height) / 60000));
    const particles: Particle[] = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.8 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -0.04 - Math.random() * 0.08,
      a: 0,
      aBase: 0.18 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.5 ? 28 : 16,
    }));

    let t = 0;
    const tick = () => {
      t += 0.005;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.phase += 0.004;
        p.x += p.vx + Math.sin(p.phase) * 0.06;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const flicker = 0.6 + Math.sin(t * 2 + p.phase) * 0.4;
        const alpha = p.aBase * flicker;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 45%, 55%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 45%, 55%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [enabled]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base warm gradient */}
      <div className="absolute inset-0 bg-gradient-warm" />

      {/* Soft floating blobs */}
      <div
        className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full opacity-60 blur-3xl animate-float-slow"
        style={{ background: 'radial-gradient(circle, hsl(28 60% 85% / 0.7), transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[40rem] h-[40rem] rounded-full opacity-50 blur-3xl animate-drift"
        style={{ background: 'radial-gradient(circle, hsl(16 60% 82% / 0.55), transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[34rem] h-[34rem] rounded-full opacity-40 blur-3xl animate-float"
        style={{ background: 'radial-gradient(circle, hsl(38 65% 84% / 0.55), transparent 70%)' }}
      />

      {/* Ambient drifting dust (canvas) */}
      {enabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-70"
          style={{ maskImage: 'linear-gradient(180deg, black 0%, black 55%, transparent 95%)', WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 55%, transparent 95%)' }}
        />
      )}

      {/* Subtle paper grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.2 0 0 0 0 0.15 0 0 0 0 0.1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
