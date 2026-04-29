import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook: scroll-triggered count-up animation
 * Animates a number from 0 to `target` when the element enters the viewport.
 * @param {number} target - The target number to count up to.
 * @param {number} duration - Animation duration in milliseconds.
 * @returns {{ count: number, ref: React.RefObject }}
 */
export function useCountUp(target, duration = 2000) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime = null;
        let animationFrame;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // easeOutExpo for a snappy feel
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [hasStarted, target, duration]);

    return { count, ref };
}
