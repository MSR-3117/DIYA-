import mascotImg from '../../assets/mascot.png';
import './Mascot.css';

export default function Mascot({ className = '', fixed = false }) {
    return (
        <div className={`mascot ${fixed ? 'mascot-fixed' : ''} ${className}`}>
            <img src={mascotImg} alt="DIYA AI Assistant" />
        </div>
    );
}
