import { useEffect, useRef } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import gsap from 'gsap';
import Logo from '../components/ui/Logo';
import './ContentGeneration.css';

const posts = [
    {
        id: 1,
        platform: 'linkedin',
        caption: "Innovation isn't just about new ideas—it's about solving real problems for real people. Here's how we're building the future, one solution at a time. 🚀",
        hashtags: ['#Innovation', '#Tech', '#Future']
    },
    {
        id: 2,
        platform: 'instagram',
        caption: 'Behind every great product is an even greater team. Meet the minds making it happen. ✨ Swipe to see more →',
        hashtags: ['#TeamSpotlight', '#Culture']
    },
    {
        id: 3,
        platform: 'twitter',
        caption: 'Quick tip: The best time to start building is now. The second best time? Also now. 💡',
        hashtags: ['#StartupLife', '#Motivation']
    }
];

const platformIcons = {
    linkedin: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z',
    twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
};

export default function ContentGeneration() {
    const transitionTo = usePageTransition();
    const titleRef = useRef(null);

    useEffect(() => {
        // Create sparkles
        const container = document.getElementById('sparkles');
        if (container) {
            const sparkleEmojis = ['✨', '⭐', '💫', '🌟'];
            for (let i = 0; i < 20; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                container.appendChild(sparkle);

                gsap.to(sparkle, { opacity: 0.3, duration: 1, delay: Math.random() * 2 });
                gsap.to(sparkle, {
                    y: 'random(-100, 100)',
                    x: 'random(-50, 50)',
                    rotation: 'random(-180, 180)',
                    duration: Math.random() * 15 + 10,
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

        // Master timeline
        const tl = gsap.timeline();

        tl.fromTo('.header',
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        )
            .from('.page-badge', { scale: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
            .to('.page-title .char', {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.025,
                duration: 0.5,
                ease: 'power3.out'
            }, '-=0.2')
            .from('.page-subtitle', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
            .to('.post-card', {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: { amount: 0.5, from: 'random' },
                duration: 0.7,
                ease: 'back.out(1.5)'
            }, '-=0.3');

        // Hashtag hover effects
        document.querySelectorAll('.hashtag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                gsap.to(tag, { scale: 1.1, y: -3, duration: 0.2, ease: 'back.out(2)' });
            });
            tag.addEventListener('mouseleave', () => {
                gsap.to(tag, { scale: 1, y: 0, duration: 0.2 });
            });
        });

        // Regenerate button effect
        document.querySelectorAll('.btn-regenerate').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.post-card');
                if (card) {
                    gsap.to(card, {
                        rotateY: 360,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            gsap.set(card, { rotateY: 0 });
                            gsap.from(card, { scale: 0.9, duration: 0.3, ease: 'back.out(2)' });
                        }
                    });
                }
            });
        });

        return () => {
            tl.kill();
            if (container) container.innerHTML = '';
        };
    }, []);

    return (
        <>
            <div className="sparkles" id="sparkles"></div>

            <div className="page-container">
                <header className="header">
                    <Logo linkTo="/" />
                    <button className="btn-schedule-all" onClick={() => transitionTo('/calendar')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        Schedule All
                    </button>
                </header>

                <main className="main-content">
                    <div className="page-header">
                        <div className="page-badge"><span className="sparkle-icon">✨</span>AI Generated</div>
                        <h1 className="page-title" ref={titleRef}>Your content is ready!</h1>
                        <p className="page-subtitle">Review, edit, or regenerate any post before scheduling</p>
                    </div>

                    <div className="posts-grid">
                        {posts.map(post => (
                            <div key={post.id} className="post-card">
                                <div className="post-image">
                                    <div className={`platform-badge ${post.platform}`}>
                                        <svg viewBox="0 0 24 24" fill="white">
                                            <path d={platformIcons[post.platform]} />
                                        </svg>
                                    </div>
                                </div>
                                <div className="post-body">
                                    <p className="post-caption">{post.caption}</p>
                                    <div className="post-hashtags">
                                        {post.hashtags.map((tag, i) => (
                                            <span key={i} className="hashtag">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-btn btn-edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button className="action-btn btn-regenerate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                            Regen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
