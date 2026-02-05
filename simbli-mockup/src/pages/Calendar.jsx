import { useEffect, useRef } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import gsap from 'gsap';
import Logo from '../components/ui/Logo';
import './Calendar.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [3, 4, 5, 6, 7, 8, 9];

const posts = {
    0: [{ time: '9:00 AM', platform: 'linkedin', title: 'Innovation isn\'t just about new ideas—it\'s about solving real problems...', label: 'LinkedIn' }],
    1: [{ time: '12:00 PM', platform: 'instagram', title: 'Behind every great product is an even greater team. ✨', label: 'Instagram' }],
    2: [
        { time: '3:00 PM', platform: 'twitter', title: 'Quick tip: The best time to start building is now. 💡', label: 'X' }
    ],
    4: [{ time: '10:00 AM', platform: 'linkedin', title: 'Announcing our latest product update! Here\'s what\'s new...', label: 'LinkedIn' }]
};

const platformColors = {
    linkedin: '#0077b5',
    instagram: 'linear-gradient(45deg, #f09433, #dc2743)',
    twitter: '#000'
};

export default function Calendar() {
    const transitionTo = usePageTransition();

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo('.header',
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        )
            .fromTo('.calendar-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
            .to('.day-column', {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.5,
                ease: 'power3.out'
            }, '-=0.2')
            .to('.post-item', {
                opacity: 1,
                scale: 1,
                stagger: { amount: 0.4, from: 'random' },
                duration: 0.5,
                ease: 'back.out(1.5)'
            }, '-=0.3');

        return () => tl.kill();
    }, []);

    return (
        <div className="page-container">
            <header className="header">
                <Logo linkTo="/" />
                <div className="header-actions">
                    <button className="btn-integrations" onClick={() => transitionTo('/integrations')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                        Integrations
                    </button>
                    <button className="btn-publish">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        Publish All
                    </button>
                </div>
            </header>

            <div className="calendar-header">
                <div className="calendar-title">
                    <h1>Content Calendar</h1>
                    <p>February 2026</p>
                </div>
                <div className="calendar-nav">
                    <button className="nav-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <span className="nav-label">This Week</span>
                    <button className="nav-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="calendar-grid">
                {days.map((day, i) => (
                    <div key={day} className={`day-column ${i === 2 ? 'today' : ''}`}>
                        <div className="day-header">
                            <span className="day-name">{day}</span>
                            <span className="day-date">{dates[i]}</span>
                        </div>
                        <div className="day-content">
                            {posts[i]?.map((post, j) => (
                                <div key={j} className={`post-item ${post.platform}`}>
                                    <div className="post-time">{post.time}</div>
                                    <div className="post-preview">{post.title}</div>
                                    <div className="post-platform">
                                        <span className="platform-dot" style={{ background: platformColors[post.platform] }}></span>
                                        {post.label}
                                    </div>
                                </div>
                            ))}
                            <button className="btn-add-post">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
