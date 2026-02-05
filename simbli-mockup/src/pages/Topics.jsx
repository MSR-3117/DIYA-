import { useEffect, useRef, useState } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import gsap from 'gsap';
import Logo from '../components/ui/Logo';
import './Topics.css';

const topics = [
    { id: 'innovation', emoji: '💡', text: 'Innovation' },
    { id: 'leadership', emoji: '👔', text: 'Leadership' },
    { id: 'technology', emoji: '🚀', text: 'Technology' },
    { id: 'sustainability', emoji: '🌱', text: 'Sustainability' },
    { id: 'culture', emoji: '🎨', text: 'Company Culture' },
    { id: 'insights', emoji: '📊', text: 'Industry Insights' },
    { id: 'tips', emoji: '✨', text: 'Tips & Tricks' },
    { id: 'stories', emoji: '📖', text: 'Success Stories' },
    { id: 'hiring', emoji: '💼', text: "We're Hiring" },
    { id: 'events', emoji: '📅', text: 'Events' },
    { id: 'product', emoji: '🎯', text: 'Product Updates' },
    { id: 'community', emoji: '🤝', text: 'Community' }
];

export default function Topics() {
    const transitionTo = usePageTransition();
    const titleRef = useRef(null);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        // Create particles
        const container = document.getElementById('particles');
        if (container) {
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                const size = Math.random() * 6 + 3;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.background = `hsla(${140 + Math.random() * 30}, 70%, ${60 + Math.random() * 20}%, 0.6)`;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                container.appendChild(particle);

                gsap.to(particle, { opacity: 0.5, duration: 1, delay: Math.random() * 2 });
                gsap.to(particle, {
                    y: 'random(-150, 150)',
                    x: 'random(-80, 80)',
                    duration: Math.random() * 15 + 15,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        }

        // Animate title characters
        const title = titleRef.current;
        if (title) {
            const text = title.textContent;
            title.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char === ' ' ? '\u00A0' : char;
                title.appendChild(span);
            });
        }

        // Master timeline
        const tl = gsap.timeline();

        tl.from('.header', { y: -50, opacity: 0, duration: 0.6, ease: 'power3.out' })
            .from('.page-icon', { scale: 0, rotation: -180, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.3')
            .to('.page-title .char', {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.02,
                duration: 0.4,
                ease: 'back.out(2)'
            }, '-=0.3')
            .from('.page-subtitle', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
            .from('.actions-row', { y: 20, opacity: 0, duration: 0.4 }, '-=0.2')
            .to('.topic-chip', {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: { amount: 0.6, from: 'random' },
                duration: 0.5,
                ease: 'back.out(1.5)'
            }, '-=0.2')
            .to('.btn-continue', {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out'
            }, '-=0.3');

        return () => {
            tl.kill();
            if (container) container.innerHTML = '';
        };
    }, []);

    const toggleTopic = (id, event) => {
        const isSelected = selected.includes(id);
        setSelected(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );

        // Animate the chip
        if (event && event.currentTarget) {
            const chip = event.currentTarget;
            const emoji = chip.querySelector('.topic-emoji');
            const check = chip.querySelector('.topic-check');

            if (!isSelected) {
                // Bounce emoji
                if (emoji) {
                    gsap.to(emoji, {
                        scale: 1.5,
                        rotation: 20,
                        duration: 0.3,
                        ease: 'back.out(2)',
                        yoyo: true,
                        repeat: 1
                    });
                }
                // Checkmark pop
                if (check) {
                    gsap.from(check, {
                        scale: 0,
                        rotation: -180,
                        duration: 0.4,
                        ease: 'back.out(2)'
                    });
                }
            }
        }
    };

    const selectAll = () => {
        const allSelected = selected.length === topics.length;
        const chips = document.querySelectorAll('.topic-chip');

        chips.forEach((chip, i) => {
            gsap.to(chip, {
                scale: allSelected ? 1 : 1.1,
                duration: 0.2,
                delay: i * 0.03,
                onComplete: () => {
                    gsap.to(chip, { scale: 1, duration: 0.2 });
                }
            });
        });

        setTimeout(() => {
            if (allSelected) {
                setSelected([]);
            } else {
                setSelected(topics.map(t => t.id));
            }
        }, chips.length * 30);
    };

    return (
        <>
            <div className="particles" id="particles"></div>

            <div className="page-container">
                <header className="header">
                    <Logo linkTo="/" />
                    <div className="progress-bar">
                        <div className="progress-dot done"></div>
                        <div className="progress-dot done"></div>
                        <div className="progress-dot done"></div>
                        <div className="progress-dot active"></div>
                        <div className="progress-dot"></div>
                    </div>
                </header>

                <main className="main-content">
                    <div className="page-header">
                        <div className="page-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                        </div>
                        <h1 className="page-title" ref={titleRef}>What topics interest you?</h1>
                        <p className="page-subtitle">We'll create content around these themes</p>
                    </div>

                    <div className="actions-row">
                        <div className="selected-count"><span>{selected.length}</span> topics selected</div>
                        <button className="btn-select-all" onClick={selectAll}>
                            {selected.length === topics.length ? 'Deselect All' : 'Select All'}
                        </button>
                    </div>

                    <div className="topics-grid">
                        {topics.map(topic => (
                            <div
                                key={topic.id}
                                className={`topic-chip ${selected.includes(topic.id) ? 'selected' : ''}`}
                                onClick={(e) => toggleTopic(topic.id, e)}
                            >
                                <span className="topic-emoji">{topic.emoji}</span>
                                <span className="topic-text">{topic.text}</span>
                                <div className="topic-check">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="btn-continue" onClick={() => transitionTo('/content-generation')}>
                        Generate Content
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                    </button>
                </main>
            </div>
        </>
    );
}
