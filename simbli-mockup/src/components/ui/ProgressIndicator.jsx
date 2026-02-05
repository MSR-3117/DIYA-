import './ProgressIndicator.css';

export default function ProgressIndicator({ steps = 5, current = 1 }) {
    return (
        <div className="progress-container">
            {Array.from({ length: steps }, (_, i) => (
                <div
                    key={i}
                    className={`progress-step ${i + 1 === current ? 'active' : ''} ${i + 1 < current ? 'completed' : ''}`}
                />
            ))}
        </div>
    );
}
