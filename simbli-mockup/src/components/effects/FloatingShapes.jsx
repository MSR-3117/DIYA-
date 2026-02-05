import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './FloatingShapes.css';

const colors = ['#00c237', '#4ade80', '#86efac', '#1a1a1a', '#e5e5e5'];

export default function FloatingShapes({ count = 50 }) {
    const containerRef = useRef(null);
    const shapesDataRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create shapes
        const shapesData = [];
        for (let i = 0; i < count; i++) {
            const shape = document.createElement('div');
            shape.classList.add('shape');

            const type = Math.floor(Math.random() * 4);
            const color = colors[Math.floor(Math.random() * colors.length)];
            let svg = '';

            if (type === 0) svg = `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="${color}"/></svg>`;
            else if (type === 1) svg = `<svg viewBox="0 0 50 50"><rect width="50" height="50" fill="${color}"/></svg>`;
            else if (type === 2) svg = `<svg viewBox="0 0 50 50"><polygon points="25,0 50,50 0,50" fill="${color}"/></svg>`;
            else svg = `<svg viewBox="0 0 50 50"><rect width="50" height="50" rx="10" fill="${color}"/></svg>`;

            shape.innerHTML = svg;
            container.appendChild(shape);

            const size = Math.random() * 40 + 15;
            gsap.set(shape, {
                width: size,
                height: size,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotation: Math.random() * 360,
                opacity: 0,
                scale: 0
            });

            shapesData.push({
                element: shape,
                originX: 0,
                originY: 0,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                floatOffset: Math.random() * 100,
                floatSpeed: Math.random() * 0.02 + 0.01
            });
        }
        shapesDataRef.current = shapesData;

        // Mouse tracking
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Enable physics
        const enablePhysics = () => {
            const startTime = gsap.ticker.time;
            shapesData.forEach(data => {
                const currentX = gsap.getProperty(data.element, 'x');
                const currentY = gsap.getProperty(data.element, 'y');
                const initialFloatX = Math.sin(startTime * data.floatSpeed + data.floatOffset) * 20;
                const initialFloatY = Math.cos(startTime * data.floatSpeed + data.floatOffset) * 20;
                data.originX = currentX - initialFloatX;
                data.originY = currentY - initialFloatY;
                data.vx = 0;
                data.vy = 0;
            });
            gsap.ticker.add(physicsLoop);
        };

        // Physics loop
        const physicsLoop = (time) => {
            const repulsionRadius = 250;
            const forceStrength = 2;
            const friction = 0.92;
            const springStrength = 0.05;
            const mouse = mouseRef.current;

            shapesData.forEach(data => {
                const floatX = Math.sin(time * data.floatSpeed + data.floatOffset) * 20;
                const floatY = Math.cos(time * data.floatSpeed + data.floatOffset) * 20;

                const currentAbsX = data.originX + data.x + floatX;
                const currentAbsY = data.originY + data.y + floatY;

                const dx = mouse.x - currentAbsX;
                const dy = mouse.y - currentAbsY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < repulsionRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (repulsionRadius - distance) / repulsionRadius;
                    const push = force * forceStrength;
                    data.vx -= Math.cos(angle) * push;
                    data.vy -= Math.sin(angle) * push;
                }

                data.vx += -data.x * springStrength;
                data.vy += -data.y * springStrength;
                data.vx *= friction;
                data.vy *= friction;
                data.x += data.vx;
                data.y += data.vy;

                gsap.set(data.element, {
                    x: data.originX + data.x + floatX,
                    y: data.originY + data.y + floatY,
                    rotation: '+=0.2'
                });
            });
        };

        // Entrance animation
        const tl = gsap.timeline({ onComplete: enablePhysics });

        tl.to('.shape', {
            duration: 1.2,
            opacity: 0.7,
            scale: 'random(0.5, 1.5)',
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            rotation: 'random(-720, 720)',
            ease: 'power4.in',
            stagger: { amount: 0.4, from: 'random' }
        })
            .to('.shape', {
                duration: 1.5,
                x: `random(-100, ${window.innerWidth + 100})`,
                y: `random(-100, ${window.innerHeight + 100})`,
                rotation: 'random(-180, 180)',
                ease: 'elastic.out(1, 0.4)',
                stagger: { amount: 0.15, from: 'center' }
            });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            gsap.ticker.remove(physicsLoop);
            tl.kill();
            container.innerHTML = '';
        };
    }, [count]);

    return <div className="floating-shapes" ref={containerRef} />;
}
