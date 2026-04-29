import React, { useState } from 'react';
import DemoSimulatorModal from './DemoSimulatorModal';
import HeroSection from './HeroSection';
import SimbiyozEtkisi from './SimbiyozEtkisi';
import SimbiyozSureci from './SimbiyozSureci';
import SosyalEtki from './SosyalEtki';
import CtaFooter from './CtaFooter';
import VideoModal from './VideoModal';

const Dashboard = ({ kpiBonus, onNavigate }) => {
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showDemoModal, setShowDemoModal] = useState(false);

    return (
        <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-7xl mx-auto py-8">

            {/* Hero Sections */}
            <HeroSection
                onNavigate={onNavigate}
                onShowVideo={() => setShowVideoModal(true)}
            />

            {/* Simbiyoz Etkisi Banner — Animated */}
            <SimbiyozEtkisi />

            {/* Simbiyoz Süreci — Banner + Info + 3 Steps */}
            <SimbiyozSureci onNavigate={onNavigate} />

            {/* Sosyal Etki Section */}
            <SosyalEtki />

            {/* CTA & Footer */}
            <CtaFooter
                onNavigate={onNavigate}
                onShowDemo={() => setShowDemoModal(true)}
            />

            {/* Demo Simulator Modal */}
            {showDemoModal && (
                <DemoSimulatorModal onClose={() => setShowDemoModal(false)} />
            )}

            {/* Video Lightbox Modal */}
            {showVideoModal && (
                <VideoModal onClose={() => setShowVideoModal(false)} />
            )}
        </div>
    );
};

export default Dashboard;
