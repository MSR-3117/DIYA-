import { Link } from 'react-router-dom';
import './Logo.css';

export default function Logo({ linkTo = '/' }) {
    return (
        <Link to={linkTo} className="logo">
            <div className="logo-icon">
                <svg viewBox="0 0 24 24">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" fill="none" />
                </svg>
            </div>
            <span className="logo-text">DIYA</span>
        </Link>
    );
}
