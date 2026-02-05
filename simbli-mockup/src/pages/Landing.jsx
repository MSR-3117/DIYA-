import { useEffect, useRef, useState, useCallback } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/layout/Header';
import Preloader from '../components/effects/Preloader';
import FloatingShapes from '../components/effects/FloatingShapes';
import Button from '../components/ui/Button';
import mascotImg from '../assets/mascot.png';
import './Landing.css';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
    const transitionTo = usePageTransition();
    const [showContent, setShowContent] = useState(false);
    const headerRef = useRef(null);

    const handlePreloaderComplete = useCallback(() => {
        setShowContent(true);
    }, []);

    useEffect(() => {
        if (!showContent) return;

        // Hero animations
        const heroTl = gsap.timeline();

        heroTl.to('.hero-title span', {
            duration: 1.2,
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)'
        })
            .to('.hero-subtitle', {
                duration: 0.8,
                y: 0,
                opacity: 1,
                ease: 'power3.out'
            }, '-=0.8')
            .to('.hero-cta', {
                duration: 0.6,
                y: 0,
                opacity: 1,
                ease: 'power3.out'
            }, '-=0.5')
            .to('.mascot-bg-orb', {
                duration: 0.8,
                opacity: 1,
                scale: 1,
                ease: 'power2.out'
            }, '-=0.3')
            .to('.mascot-ring', {
                duration: 0.6,
                opacity: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.5')
            .to('.orbit-dot', {
                duration: 0.5,
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                ease: 'back.out(2)'
            }, '-=0.4')
            .to('.hero-mascot', {
                duration: 1,
                opacity: 1,
                y: 0,
                scale: 1,
                ease: 'back.out(1.5)'
            }, '-=0.5')
            .to('.sparkle', {
                duration: 0.4,
                opacity: 1,
                stagger: 0.08,
                ease: 'power2.out'
            }, '-=0.6')
            .to('.header', {
                duration: 0.8,
                y: 0,
                ease: 'power3.out'
            }, '-=0.6');

        // Continuous sparkle animation
        gsap.to('.sparkle', {
            y: 'random(-20, 20)',
            x: 'random(-15, 15)',
            rotation: 'random(-15, 15)',
            duration: 'random(2, 4)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { amount: 0.5, from: 'random' }
        });

        // Mascot float
        gsap.to('.hero-mascot img', {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Orbit dots pulse
        gsap.to('.orbit-dot', {
            scale: 1.3,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { amount: 0.5 }
        });

        // Marquee
        gsap.to('.marquee-container', {
            xPercent: -50,
            repeat: -1,
            duration: 25,
            ease: 'linear'
        });

        // Features title animation
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            const text = sectionTitle.textContent;
            sectionTitle.innerHTML = '';
            text.split('').forEach((char) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.className = 'char';
                sectionTitle.appendChild(span);
            });

            gsap.to('.section-title .char', {
                scrollTrigger: {
                    trigger: '.features-section',
                    start: 'top 70%'
                },
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.03,
                duration: 0.6,
                ease: 'power3.out'
            });
        }

        // Feature cards
        gsap.to('.feature-card', {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 75%'
            },
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Horizontal scroll
        const track = document.querySelector('.horizontal-track');
        if (track) {
            gsap.to(track, {
                xPercent: -66.666,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.horizontal-section',
                    pin: true,
                    scrub: 1,
                    start: 'top top',
                    end: '+=2500'
                }
            });
        }

        // Footer CTA
        gsap.from('.footer-cta', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        });

        return () => {
            heroTl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [showContent]);

    return (
        <>
            <Preloader onComplete={handlePreloaderComplete} />

            <Header />

            <main>
                {/* Hero */}
                <section className="hero">
                    <FloatingShapes count={50} />
                    <div className="hero-inner">
                        <div className="hero-content">
                            <h1 className="hero-title">
                                <span>PLAN.</span>
                                <span className="text-accent">CREATE.</span>
                                <span>SCHEDULE.</span>
                            </h1>
                            <p className="hero-subtitle">
                                DIYA is a brand-aware AI agent that plans, creates, and schedules on-brand social
                                content automatically—so you don't have to think about it.
                            </p>
                            <div className="hero-cta">
                                <Button variant="hero" onClick={() => transitionTo('/website-entry')}>
                                    Start Creating
                                </Button>
                            </div>
                        </div>

                        {/* Mascot Scene */}
                        <div className="hero-mascot-scene">
                            <div className="mascot-bg-orb"></div>
                            <div className="mascot-ring mascot-ring-1"></div>
                            <div className="mascot-ring mascot-ring-2"></div>
                            <div className="mascot-ring mascot-ring-3"></div>
                            <div className="orbit-dot orbit-dot-1"></div>
                            <div className="orbit-dot orbit-dot-2"></div>
                            <div className="orbit-dot orbit-dot-3"></div>
                            <span className="sparkle sparkle-1">✨</span>
                            <span className="sparkle sparkle-2">💡</span>
                            <span className="sparkle sparkle-3">🚀</span>
                            <span className="sparkle sparkle-4">⚡</span>
                            <div className="hero-mascot">
                                <img src={mascotImg} alt="DIYA AI Assistant" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Marquee */}
                <section className="marquee-section">
                    <div className="marquee-container">
                        <span className="marquee-text">
                            <span className="text-accent">D</span>esign.
                            <span className="text-accent">I</span>ntelligence.
                            <span className="text-accent">Y</span>ield.
                            <span className="text-accent">A</span>utomate.
                        </span>
                        <span className="marquee-text">
                            <span className="text-accent">D</span>esign.
                            <span className="text-accent">I</span>ntelligence.
                            <span className="text-accent">Y</span>ield.
                            <span className="text-accent">A</span>utomate.
                        </span>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="features-section">
                    <div className="section-header">
                        <div className="section-badge">
                            <div className="dot"></div>Powerful Features
                        </div>
                        <h2 className="section-title">Everything you need to automate</h2>
                        <p className="section-subtitle">From brand analysis to content scheduling, DIYA handles it all</p>
                    </div>

                    <div className="features-grid">
                        <FeatureCard
                            icon={<SparklesIcon />}
                            title="AI Content Generation"
                            description="Generate on-brand posts, captions, and hashtags automatically using advanced AI that understands your brand voice."
                        />
                        <FeatureCard
                            icon={<CalendarIcon />}
                            title="Smart Scheduling"
                            description="Automatically schedule posts at optimal times across all your social platforms with our intelligent calendar."
                        />
                        <FeatureCard
                            icon={<AcademicCapIcon />}
                            title="Brand Analysis"
                            description="We analyze your website to extract colors, fonts, tone, and style—ensuring every post feels authentically yours."
                        />
                        <FeatureCard
                            icon={<ShareIcon />}
                            title="Multi-Platform"
                            description="Post to LinkedIn, Instagram, X, and Facebook simultaneously. One content, multiple platforms."
                        />
                        <FeatureCard
                            icon={<ChartIcon />}
                            title="Analytics Dashboard"
                            description="Track engagement, reach, and performance across all platforms in one beautiful dashboard."
                        />
                        <FeatureCard
                            icon={<LockIcon />}
                            title="Secure & Private"
                            description="Your brand data is encrypted and never shared. We take your privacy seriously."
                        />
                    </div>
                </section>

                {/* Horizontal Scroll */}
                <section className="horizontal-section" id="how">
                    <div className="horizontal-track">
                        <div className="horizontal-panel">
                            <span className="panel-title">01</span>
                            <div className="panel-content">
                                <h3>Enter Your Website</h3>
                                <p>Simply paste your website URL and let DIYA analyze your brand identity, colors, and voice automatically.</p>
                            </div>
                        </div>
                        <div className="horizontal-panel">
                            <span className="panel-title">02</span>
                            <div className="panel-content">
                                <h3>Choose Your Platforms</h3>
                                <p>Select where you want to post—LinkedIn, Instagram, X, or Facebook. Set your posting frequency.</p>
                            </div>
                        </div>
                        <div className="horizontal-panel">
                            <span className="panel-title">03</span>
                            <div className="panel-content">
                                <h3>AI Does the Rest</h3>
                                <p>DIYA generates, schedules, and publishes content automatically. Review and approve, or let it run on autopilot.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-content">
                        <h2 className="footer-title">Ready to automate your content?</h2>
                        <Button variant="hero" to="/website-entry" className="footer-cta">
                            Get Started Free
                        </Button>
                    </div>
                </footer>
            </main>
        </>
    );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
    return (
        <div className="feature-card">
            <div className="feature-icon">{icon}</div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-desc">{description}</p>
        </div>
    );
}

// Icons
function SparklesIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
    );
}

function AcademicCapIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
    );
}

function ChartIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
    );
}
