import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import './Header.css';

export default function Header({ showNav = true }) {
    return (
        <header className="header">
            <Logo />
            {showNav && (
                <nav className="nav-links">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#how" className="nav-link">How it Works</a>
                    <a href="#pricing" className="nav-link">Pricing</a>
                </nav>
            )}
            <div className="header-actions">
                <Button variant="text" to="#">Log in</Button>
                <Button variant="cta" to="/website-entry">Get Started</Button>
            </div>
        </header>
    );
}
