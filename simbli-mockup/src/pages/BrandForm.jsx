import { useEffect, useState } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import gsap from 'gsap';
import Logo from '../components/ui/Logo';
import './BrandForm.css';

export default function BrandForm() {
    const transitionTo = usePageTransition();
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Set initial states
        gsap.set(['.form-card', '.form-section', '.logo-upload', '.btn-submit'], {
            opacity: 0,
            y: 20
        });

        // Entrance animation
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.header', { y: -30, opacity: 0, duration: 0.5 })
            .to('.form-card', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
            .to('.form-section', { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.3')
            .to('.btn-submit', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');

        return () => tl.kill();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        gsap.to('.btn-submit', {
            scale: 0.95,
            duration: 0.1,
            onComplete: () => {
                gsap.to('.btn-submit', { scale: 1, duration: 0.1 });
                gsap.to('.form-card', {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    onComplete: () => navigate('/brand-profile')
                });
            }
        });
    };

    return (
        <>
            {/* Animated Grid Background */}
            <div className="animated-grid-bg">
                <div className="grid-squares">
                    <div className="grid-square"></div>
                    <div className="grid-square"></div>
                    <div className="grid-square"></div>
                    <div className="grid-square"></div>
                    <div className="grid-square"></div>
                </div>
            </div>

            <div className="page-container">
                <header className="header">
                    <Logo linkTo="/" />
                </header>

                <div className="content-wrapper">
                    <div className="form-card">
                        <button onClick={() => transitionTo('/website-entry')} className="back-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back
                        </button>

                        {/* Step Indicator */}
                        <div className="step-indicator">
                            <div className="step-dot completed"></div>
                            <div className="step-dot active"></div>
                            <div className="step-dot"></div>
                            <div className="step-dot"></div>
                            <div className="step-dot"></div>
                        </div>

                        <div className="form-header">
                            <div className="form-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                                </svg>
                            </div>
                            <h1 className="form-title">Tell us about your brand</h1>
                            <p className="form-subtitle">We'll use this to create perfectly tailored content</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Brand Name */}
                            <div className="form-section">
                                <label className="form-label" htmlFor="brandName">Brand Name *</label>
                                <input type="text" className="form-input" id="brandName" placeholder="e.g., Acme Corp" required />
                            </div>

                            {/* Logo Upload */}
                            <div className="form-section">
                                <label className="form-label">Brand Logo</label>
                                <div className="logo-upload">
                                    <div className="logo-upload-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                    </div>
                                    <div className="logo-upload-text">Click to upload or drag and drop</div>
                                    <div className="logo-upload-hint">SVG, PNG or JPG (max. 2MB)</div>
                                </div>
                            </div>

                            {/* Products/Services & Target Customers */}
                            <div className="form-row">
                                <div className="form-section">
                                    <label className="form-label" htmlFor="products">Products / Services *</label>
                                    <input type="text" className="form-input" id="products" placeholder="e.g., SaaS platform" required />
                                </div>
                                <div className="form-section">
                                    <label className="form-label" htmlFor="customers">Target Customers *</label>
                                    <input type="text" className="form-input" id="customers" placeholder="e.g., Small businesses" required />
                                </div>
                            </div>

                            {/* Tagline */}
                            <div className="form-section">
                                <label className="form-label" htmlFor="tagline">Tagline (optional)</label>
                                <input type="text" className="form-input" id="tagline" placeholder="e.g., Innovation made simple" />
                                <div className="form-hint">A catchy phrase that represents your brand</div>
                            </div>

                            {/* Brand Description */}
                            <div className="form-section">
                                <label className="form-label" htmlFor="description">Brand Description *</label>
                                <textarea
                                    className="form-input form-textarea"
                                    id="description"
                                    placeholder="Tell us what makes your brand unique..."
                                    required
                                    maxLength="500"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                <div className={`char-counter ${description.length > 400 ? (description.length >= 500 ? 'error' : 'warning') : ''}`}>
                                    {description.length} / 500
                                </div>
                            </div>

                            <button type="submit" className="btn-submit">
                                Create Brand Profile
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
