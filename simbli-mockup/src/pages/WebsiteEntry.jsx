import { useEffect, useRef } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import gsap from 'gsap';
import Logo from '../components/ui/Logo';
import './WebsiteEntry.css';

export default function WebsiteEntry() {
    const transitionTo = usePageTransition();
    const titleRef = useRef(null);

    useEffect(() => {
        // Create floating particles
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            try {
                for (let i = 0; i < 30; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    const size = Math.random() * 8 + 4;
                    particle.style.width = size + 'px';
                    particle.style.height = size + 'px';
                    particle.style.background = `hsl(${140 + Math.random() * 20}, 70%, ${60 + Math.random() * 20}%)`;
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                    if (particlesContainer) particlesContainer.appendChild(particle);

                    gsap.to(particle, {
                        opacity: 0.6,
                        duration: Math.random() * 2 + 1,
                        delay: Math.random() * 2
                    });

                    gsap.to(particle, {
                        y: 'random(-100, 100)',
                        x: 'random(-50, 50)',
                        duration: Math.random() * 10 + 10,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    });
                }
            } catch (e) {
                console.error("Particle animation error:", e);
            }
        }

        // Animate title characters
        const title = titleRef.current;
        if (title) {
            const text = title.textContent;
            title.innerHTML = '';

            text.split(' ').forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word';
                word.split('').forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.textContent = char;
                    wordSpan.appendChild(charSpan);
                });
                title.appendChild(wordSpan);
                if (wordIndex < text.split(' ').length - 1) {
                    const space = document.createElement('span');
                    space.innerHTML = '&nbsp;';
                    title.appendChild(space);
                }
            });
        }

        // Animation timeline - skip header animation to ensure it's always visible
        const tl = gsap.timeline({ defaults: { immediateRender: false } });

        // Start without header animation (header should be visible immediately)
        tl.from('.icon-container', { scale: 0.8, rotation: -45, duration: 0.8, ease: 'back.out(1.7)', immediateRender: false })
            .from('.icon-ring', { scale: 0.8, duration: 0.6, immediateRender: false }, '-=0.4')
            .to('.page-title .char', {
                y: 0,
                stagger: 0.03,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4')
            .to('.page-subtitle', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.url-input-wrapper', {
                y: 40,
                duration: 0.6,
                ease: 'power3.out',
                immediateRender: false
            }, '-=0.3')
            .to('.btn-analyze', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .to('.divider', { opacity: 1, duration: 0.4 }, '-=0.2')
            .to('.btn-manual', { opacity: 1, duration: 0.4 }, '-=0.2')
            .to('.tip-card', {
                opacity: 1,
                stagger: 0.15,
                duration: 0.5,
                ease: 'power3.out'
            }, '-=0.3')
            .to('.page-mascot', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }, '-=0.5');

        // Floating tip cards animation
        gsap.to('.tip-card-1', {
            y: 15,
            rotation: -8,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.tip-card-2', {
            y: -15,
            rotation: 8,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.tip-card-3', {
            y: 10,
            rotation: 0,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Icon hover effects
        const iconContainer = document.querySelector('.icon-container');
        const handleMouseEnter = () => {
            gsap.to('.icon-bg', { rotation: 15, scale: 1.05, duration: 0.3 });
            gsap.to('.icon-inner svg', { scale: 1.1, rotation: 10, duration: 0.3 });
        };
        const handleMouseLeave = () => {
            gsap.to('.icon-bg', { rotation: 0, scale: 1, duration: 0.3 });
            gsap.to('.icon-inner svg', { scale: 1, rotation: 0, duration: 0.3 });
        };

        if (iconContainer) {
            iconContainer.addEventListener('mouseenter', handleMouseEnter);
            iconContainer.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            tl.kill();
            if (particlesContainer) particlesContainer.innerHTML = '';
            if (iconContainer) {
                iconContainer.removeEventListener('mouseenter', handleMouseEnter);
                iconContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    const handleInputFocus = () => {
        gsap.to('.url-prefix svg', { scale: 1.2, rotation: 15, duration: 0.3 });
    };

    const handleInputBlur = () => {
        gsap.to('.url-prefix svg', { scale: 1, rotation: 0, duration: 0.3 });
    };

    return (
        <>
            <div className="particles" id="particles"></div>
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>

            <div className="page-container">
                <header className="header">
                    <Logo linkTo="/" />
                    <div className="progress-container">
                        <div className="progress-step active"></div>
                        <div className="progress-step"></div>
                        <div className="progress-step"></div>
                        <div className="progress-step"></div>
                        <div className="progress-step"></div>
                    </div>
                </header>

                <main className="main-content">
                    <div className="tip-cards">
                        <div className="tip-card tip-card-1">✨ We'll extract your brand colors</div>
                        <div className="tip-card tip-card-2">🎯 AI learns your brand voice</div>
                        <div className="tip-card tip-card-3">🚀 30-second setup</div>
                    </div>

                    <div className="entry-card">
                        <div className="icon-container">
                            <div className="icon-ring"></div>
                            <div className="icon-bg"></div>
                            <div className="icon-inner">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.918 17.918 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.97.633-3.794 1.706-5.268" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="page-title" ref={titleRef}>What's your website?</h1>
                        <p className="page-subtitle">We'll analyze your brand and create content that feels authentically you</p>

                        <div className="url-input-wrapper">
                            <div className="url-input-bg"></div>
                            <div className="url-input-inner">
                                <div className="url-prefix">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                    https://
                                </div>
                                <input
                                    type="text"
                                    className="url-input"
                                    placeholder="yourwebsite.com"
                                    autoComplete="off"
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                            </div>
                        </div>

                        <button className="btn-analyze" onClick={() => transitionTo('/brand-loader')}>
                            Analyze My Brand
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>

                        <div className="divider">
                            <div className="divider-line"></div>
                            <span className="divider-text">or</span>
                            <div className="divider-line"></div>
                        </div>

                        <button className="btn-manual" onClick={() => transitionTo('/brand-form')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                            </svg>
                            Enter details manually
                        </button>
                    </div>
                </main>

                {/* Mascot */}
                <div className="page-mascot">
                    <img src="/mascot.png" alt="DIYA AI Assistant" onError={(e) => e.target.style.display = 'none'} />
                </div>
            </div>
        </>
    );
}
