import { HeroSection } from './components/HeroSection';
import { CoreStack } from './components/CoreStack';
import { FeaturedProjects } from './components/FeaturedProjects';

export const Home = () => {

    return (
        <main className="pt-16">
            <HeroSection />
            <CoreStack />
            <FeaturedProjects />
            {/* <LabExperiments /> */}
        </main>
    );
};
