import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

export default function Preloader({ onComplete }) {
    const preloaderRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to('.preloader-text span', {
            duration: 0.8,
            y: 0,
            stagger: 0.1,
            ease: 'power4.out'
        })
            .to('.preloader-progress', {
                duration: 1,
                width: '100%',
                ease: 'power2.inOut'
            }, '-=0.3')
            .to(preloaderRef.current, {
                duration: 0.6,
                opacity: 0,
                ease: 'power2.inOut',
                onComplete: () => {
                    if (preloaderRef.current) {
                        preloaderRef.current.style.display = 'none';
                    }
                    onComplete?.();
                }
            });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div className="preloader" ref={preloaderRef}>
            <div className="preloader-text">
                <span>D</span>
                <span>I</span>
                <span>Y</span>
                <span>A</span>
            </div>
            <div className="preloader-bar">
                <div className="preloader-progress"></div>
            </div>
        </div>
    );
}
