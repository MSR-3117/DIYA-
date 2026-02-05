import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
    children,
    variant = 'primary',
    size = 'default',
    to,
    onClick,
    className = '',
    ...props
}) {
    const classNames = `btn btn-${variant} ${size === 'lg' ? 'btn-lg' : ''} ${className}`.trim();

    if (to) {
        return (
            <Link to={to} className={classNames} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classNames} onClick={onClick} {...props}>
            {children}
        </button>
    );
}
