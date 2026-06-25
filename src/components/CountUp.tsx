import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

/**
 * 心跳节奏计数器：
 * 不是匀速上升，而是 "加速 → 停顿 → 加速" 的生命节律。
 * 用 ease-in-out + 双段曲线模拟心电图的搏动。
 */
export default function CountUp({
  end,
  duration = 1800,
  suffix = '',
  className = '',
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          // 心跳曲线：前 30% 慢推 → 30-70% 快冲 → 70-90% 停顿 → 90-100% 收尾
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            let eased: number;
            if (p < 0.3) {
              // 缓启动
              eased = (p / 0.3) * 0.18;
            } else if (p < 0.7) {
              // 主搏动
              const localP = (p - 0.3) / 0.4;
              eased = 0.18 + (1 - Math.pow(1 - localP, 2.4)) * 0.7;
            } else if (p < 0.9) {
              // 心跳停顿
              const localP = (p - 0.7) / 0.2;
              eased = 0.88 + Math.sin(localP * Math.PI) * 0.08;
            } else {
              // 收尾
              const localP = (p - 0.9) / 0.1;
              eased = 0.96 + localP * 0.04;
            }
            setValue(Math.round(Math.min(eased, 1) * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
