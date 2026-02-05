import { useEffect, useState, useMemo } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import Logo from '../components/ui/Logo';
import './BrandProfile.css';

export default function BrandProfile() {
    const transitionTo = usePageTransition();
    const [isLoaded, setIsLoaded] = useState(false);

    // Split brand name into characters for animation
    const brandNameChars = useMemo(() => {
        return 'Acme Corporation'.split('').map((char, index) => ({
            char: char === ' ' ? '\u00A0' : char,
            delay: index * 0.04
        }));
    }, []);

    useEffect(() => {
        // Trigger animations after component mounts
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="bg-pattern"></div>
            <div className="floating-shapes" id="floatingShapes">
                {/* Create floating shapes with CSS animations */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="float-shape"
                        style={{
                            width: `${Math.random() * 80 + 40}px`,
                            height: `${Math.random() * 80 + 40}px`,
                            background: `hsla(${140 + Math.random() * 30}, 70%, ${70 + Math.random() * 20}%, 0.1)`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 10 + 15}s`
                        }}
                    />
                ))}
            </div>

            <div className="page-container">
                <header className="header">
                    <Logo linkTo="/" />
                    <button className="btn-continue" onClick={() => transitionTo('/platform-select')}>
                        Continue
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </header>

                <main className="main-content">
                    {/* Hero */}
                    <section className="profile-hero">
                        <div className={`brand-logo-container ${isLoaded ? 'animate-in' : ''}`}>
                            <div className="brand-logo-glow"></div>
                            <div className="brand-logo-ring"></div>
                            <div className="brand-logo">A</div>
                            <div className={`verified-badge ${isLoaded ? 'animate-in' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="brand-name">
                            {brandNameChars.map((item, index) => (
                                <span
                                    key={index}
                                    className={`char ${isLoaded ? 'animate-in' : ''}`}
                                    style={{ animationDelay: `${0.3 + item.delay}s` }}
                                >
                                    {item.char}
                                </span>
                            ))}
                        </h1>
                        <p className={`brand-tagline ${isLoaded ? 'animate-in' : ''}`}>
                            Building tomorrow's solutions, today.
                        </p>
                        <div className="brand-tags">
                            <span className={`brand-tag ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: '0.8s' }}>
                                <span className="dot" style={{ background: 'var(--accent)' }}></span>Enterprise
                            </span>
                            <span className={`brand-tag ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: '0.9s' }}>
                                <span className="dot" style={{ background: '#3b82f6' }}></span>Technology
                            </span>
                            <span className={`brand-tag ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: '1s' }}>
                                <span className="dot" style={{ background: '#f59e0b' }}></span>Innovation
                            </span>
                        </div>
                    </section>

                    {/* Cards Grid */}
                    <div className="cards-grid">
                        {/* Colors Card */}
                        <div className={`profile-card ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: '0.9s' }}>
                            <div className="card-header">
                                <div className="card-header-content">
                                    <div className="card-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                                        </svg>
                                    </div>
                                    <h2 className="card-title">Brand Colors</h2>
                                </div>
                                <button className="btn-icon" aria-label="Edit Colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                            <div className="colors-grid">
                                {['#00c237', '#1e3a5f', '#f8fafc', '#0f172a', '#94a3b8'].map((color, i) => (
                                    <div
                                        key={color}
                                        className={`color-swatch ${isLoaded ? 'animate-in' : ''}`}
                                        style={{ background: color, animationDelay: `${1.2 + i * 0.1}s` }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Typography Card */}
                        <div className={`profile-card ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: '0.75s' }}>
                            <div className="card-header">
                                <div className="card-header-content">
                                    <div className="card-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                    </div>
                                    <h2 className="card-title">Typography</h2>
                                </div>
                                <button className="btn-icon" aria-label="Edit Typography">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                            <div className="typography-samples">
                                <div className={`type-sample ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: '1.4s' }}>
                                    <div className="type-label">Heading</div>
                                    <div className="type-primary">Space Grotesk Bold</div>
                                </div>
                                <div className={`type-sample ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: '1.55s' }}>
                                    <div className="type-label">Body</div>
                                    <div className="type-secondary">Inter Regular - Clean and readable for all content</div>
                                </div>
                            </div>
                        </div>

                        {/* Voice Card */}
                        <div className={`profile-card ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: '0.9s' }}>
                            <div className="card-header">
                                <div className="card-header-content">
                                    <div className="card-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                    <h2 className="card-title">Brand Voice</h2>
                                </div>
                                <button className="btn-icon" aria-label="Edit Brand Voice">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                            <div className="voice-traits">
                                {['✨ Professional', '🚀 Innovative', '🤝 Trustworthy', '💡 Forward-thinking'].map((trait, i) => (
                                    <div
                                        key={trait}
                                        className={`voice-trait ${isLoaded ? 'animate-in' : ''}`}
                                        style={{ animationDelay: `${1.5 + i * 0.1}s` }}
                                    >
                                        <span>{trait}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tone Card */}
                        <div className={`profile-card ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: '1.05s' }}>
                            <div className="card-header">
                                <div className="card-header-content">
                                    <div className="card-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                        </svg>
                                    </div>
                                    <h2 className="card-title">Tone Analysis</h2>
                                </div>
                                <button className="btn-icon" aria-label="Edit Tone">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                            <div className="tone-meter">
                                {[
                                    { left: 'Formal', right: 'Casual', width: 75 },
                                    { left: 'Serious', right: 'Playful', width: 40 },
                                    { left: 'Reserved', right: 'Enthusiastic', width: 85 }
                                ].map((item, i) => (
                                    <div key={item.left} className={`tone-item ${isLoaded ? 'animate-in' : ''}`} style={{ animationDelay: `${1.6 + i * 0.1}s` }}>
                                        <div className="tone-label">
                                            <span>{item.left}</span>
                                            <span>{item.right}</span>
                                        </div>
                                        <div className="tone-bar-bg">
                                            <div
                                                className={`tone-bar ${isLoaded ? 'animate-in' : ''}`}
                                                style={{ '--target-width': `${item.width}%`, animationDelay: `${1.8 + i * 0.15}s` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main >
            </div >
        </>
    );
}
