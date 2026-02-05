import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Reset scroll position
        window.scrollTo(0, 0);

        // Ensure body is visible and clean up any transition states
        gsap.set('body', { opacity: 1 });

    }, [pathname]);

    return null;
}
