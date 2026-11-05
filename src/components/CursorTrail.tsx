import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  kind: 'heart' | 'bubble' | 'sparkle';
  rot: number;
  vr: number;
}

const MAX_PARTICLES = 70;

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, alpha: number, hue: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(0, 0.3);
  ctx.bezierCurveTo(0, -0.1, -1, -0.1, -1, 0.3);
  ctx.bezierCurveTo(-1, 0.7, 0, 1, 0, 1.3);
  ctx.bezierCurveTo(0, 1, 1, 0.7, 1, 0.3);
  ctx.bezierCurveTo(1, -0.1, 0, -0.1, 0, 0.3);
  ctx.closePath();
  ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${alpha})`;
  ctx.shadowColor = `hsla(${hue}, 80%, 65%, 0.9)`;
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
}

function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, alpha: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = `rgba(255, 240, 229, ${alpha})`;
  ctx.shadowColor = 'rgba(216,160,120,0.9)';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
    ctx.lineTo(Math.cos(a + 0.4) * s * 0.3, Math.sin(a + 0.4) * s * 0.3);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Full-screen cursor + tap particle trail. Hearts float up, some become
 * sparkles/bubbles. Disabled on touch-only devices and when reduced-motion.
 */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const spawn = (x: number, y: number, burst = false) => {
      const count = burst ? 10 + Math.floor(Math.random() * 6) : 1;
      for (let i = 0; i < count; i++) {
        if (particlesRef.current.length >= MAX_PARTICLES) break;
        const r = Math.random();
        const kind: Particle['kind'] = r < 0.6 ? 'heart' : r < 0.85 ? 'bubble' : 'sparkle';
        const ang = burst ? Math.random() * Math.PI * 2 : Math.random() * Math.PI - Math.PI / 2;
        const speed = burst ? 1 + Math.random() * 2.5 : 0.3 + Math.random() * 0.8;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(ang) * speed,
          vy: (Math.sin(ang) - (burst ? 0 : 0.8)) * speed - (burst ? 0 : 0.4),
          life: 0,
          maxLife: 60 + Math.random() * 50,
          size: (kind === 'heart' ? 4 + Math.random() * 8 : 2 + Math.random() * 4) * (burst ? 1.2 : 1),
          hue: 330 + Math.random() * 30,
          kind,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      if (Math.random() < 0.55) spawn(e.clientX, e.clientY);
    };
    const onDown = (e: MouseEvent) => spawn(e.clientX, e.clientY, true);
    const onTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        spawn(e.touches[i].clientX, e.touches[i].clientY, true);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('touchstart', onTouch, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const arr = particlesRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.005;
        p.vx *= 0.99;
        p.rot += p.vr;
        const t = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - t);
        if (p.kind === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, alpha, p.hue);
        } else if (p.kind === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.size, alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = alpha * 0.6;
          ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${alpha})`;
          ctx.shadowColor = 'rgba(244,199,208,0.8)';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        if (p.life >= p.maxLife || p.y < -40) arr.splice(i, 1);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('touchstart', onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
      aria-hidden
    />
  );
}
