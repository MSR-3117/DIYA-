import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ui/ScrollToTop';
import Landing from './pages/Landing';
import WebsiteEntry from './pages/WebsiteEntry';
import BrandLoader from './pages/BrandLoader';
import BrandForm from './pages/BrandForm';
import BrandProfile from './pages/BrandProfile';
import PlatformSelect from './pages/PlatformSelect';
import Topics from './pages/Topics';
import ContentGeneration from './pages/ContentGeneration';
import Calendar from './pages/Calendar';
import Integrations from './pages/Integrations';
import './styles/index.css';

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/website-entry" element={<WebsiteEntry />} />
                <Route path="/brand-loader" element={<BrandLoader />} />
                <Route path="/brand-form" element={<BrandForm />} />
                <Route path="/brand-profile" element={<BrandProfile />} />
                <Route path="/platform-select" element={<PlatformSelect />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/content-generation" element={<ContentGeneration />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/integrations" element={<Integrations />} />
            </Routes>
        </BrowserRouter>
    );
}
