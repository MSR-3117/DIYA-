import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export function usePageTransition() {
    const navigate = useNavigate();

    const transitionTo = (path) => {
        // Animate body opacity out
        gsap.to('body', {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
                navigate(path);
            }
        });
    };

    return transitionTo;
}
