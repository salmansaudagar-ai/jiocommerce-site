'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface MetricCounterProps {
  value: number;
  suffix: string;
  label: string;
}

export default function MetricCounter({
  value,
  suffix,
  label,
}: MetricCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = value / 50;
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-white pt-6 md:pt-0">
      <div className="text-3xl md:text-4xl font-bold">
        {count.toLocaleString('en-US', {
          maximumFractionDigits: 1,
        })}
        {suffix}
      </div>
      <p className="text-sm text-gray-400 mt-2">{label}</p>
    </div>
  );
}
