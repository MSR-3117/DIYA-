import { useEffect, useState } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import Logo from '../components/ui/Logo';
import './BrandLoader.css';

const steps = [
    { icon: '🔍', label: 'Analyzing Website' },
    { icon: '🎨', label: 'Extracting Colors' },
    { icon: '📝', label: 'Learning Voice' },
    { icon: '✨', label: 'Finalizing Profile' }
];

export default function BrandLoader() {
    const transitionTo = usePageTransition();
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Trigger entry animations after mount
        const loadTimer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        return () => clearTimeout(loadTimer);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        // Start progress after entry animations complete
        const startDelay = setTimeout(() => {
            setCurrentStep(0);
        }, 800);

        return () => clearTimeout(startDelay);
    }, [isLoaded]);

    useEffect(() => {
        if (currentStep < 0) return;

        // Update progress based on current step
        const newProgress = ((currentStep + 1) / steps.length) * 100;
        setProgress(Math.min(newProgress, 100));

        // Move to next step or navigate when done
        if (currentStep < steps.length) {
            const stepTimer = setTimeout(() => {
                if (currentStep < steps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    // All steps complete, navigate after a short delay
                    setTimeout(() => transitionTo('/brand-profile'), 1000);
                }
            }, 2000);

            return () => clearTimeout(stepTimer);
        }
    }, [currentStep, transitionTo]);

    return (
        <>
            <div className="particles" id="particles">
                {/* Create particles with CSS animations */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            width: `${Math.random() * 6 + 3}px`,
                            height: `${Math.random() * 6 + 3}px`,
                            background: `hsla(${140 + Math.random() * 30}, 70%, ${60 + Math.random() * 20}%, 0.5)`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 10 + 15}s`
                        }}
                    />
                ))}
            </div>

            <div className="page-container">
                <header className={`header ${isLoaded ? 'animate-in' : ''}`}>
                    <Logo linkTo="/" />
                </header>

                <main className="main-content">
                    <h1 className={`loader-title ${isLoaded ? 'animate-in' : ''}`}>
                        Analyzing your brand...
                    </h1>
                    <p className={`loader-subtitle ${isLoaded ? 'animate-in' : ''}`}>
                        Sit back while our AI learns everything about your brand
                    </p>

                    <div className={`orb-container ${isLoaded ? 'animate-in' : ''}`}>
                        <div className="orb-glow"></div>
                        <div className="orb">
                            <div className="orb-ring ring-1"></div>
                            <div className="orb-ring ring-2"></div>
                            <div className="orb-ring ring-3"></div>
                            <div className="orb-core"></div>
                        </div>
                    </div>

                    <div className={`progress-container ${isLoaded ? 'animate-in' : ''}`}>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <div className="steps-list">
                            {steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={`step-item ${isLoaded ? 'animate-in' : ''} ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
                                    style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                                >
                                    <span className="step-icon">{step.icon}</span>
                                    <span className="step-label">{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
