import { PhilosophyHero } from './components/PhilosophyHero';
import { ExpertiseGrid } from './components/ExpertiseGrid';
import { JourneyTimeline } from './components/JourneyTimeline';

export default function About() {
    return (
        <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-x-hidden">
            <PhilosophyHero />
            <ExpertiseGrid />
            <JourneyTimeline />
        </main>
    );
}
