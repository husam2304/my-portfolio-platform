import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/Theme/useTheme';
import { useLang } from '../../context/Language/useLang';
import { Moon, SquareTerminal, Sun } from 'lucide-react';

export const Header = () => {

    const { t: { header: t }, lang, toggleLang } = useLang()
    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate();
    return (
        <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">

            <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 max-w-container-max mx-auto">
                {/* Logo */}
                <div className="font-label-caps text-label-caps font-bold tracking-tighter text-primary-fixed-dim uppercase">
                    Husam Elaayan
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink
                        className={({ isActive }) => isActive ? "text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1 font-label-caps text-label-caps transition-colors duration-200" : "text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200"}
                        to="/"

                    >
                        {t.nav.home}
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? "text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1 font-label-caps text-label-caps transition-colors duration-200" : "text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200"}
                        to="/about"
                    >
                        {t.nav.about}
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? "text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1 font-label-caps text-label-caps transition-colors duration-200" : "text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200"}
                        to="/projects"
                    >
                        {t.nav.projects}
                    </NavLink>
                    {/* <NavLink
                        className={({ isActive }) => isActive ? "text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1 font-label-caps text-label-caps transition-colors duration-200" : "text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200"}
                        to="/lab"
                    >
                        {t.nav.lab}
                    </NavLink> */}
                    <NavLink
                        className={({ isActive }) => isActive ? "text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1 font-label-caps text-label-caps transition-colors duration-200" : "text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200"}
                        to="/resume"
                    >
                        {t.nav.resume}
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? "text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1 font-label-caps text-label-caps transition-colors duration-200" : "text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200"}
                        to="/contact"
                    >
                        {t.nav.contact}
                    </NavLink>
                </div>

                {/* Right Section - CTA Button & Social Icons */}
                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-lg font-label-caps text-label-caps font-bold hover:scale-95 transition-transform duration-100" onClick={() => navigate('/contact')}>
                        <SquareTerminal />     {t.hireMe}
                    </button>
                    <div className="flex gap-2">

                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2 rounded-lg text-slate-600  hover:bg-gray-100  transition-all"
                        >
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        </button>
                        <button
                            onClick={toggleLang}
                            aria-label="Toggle language"
                            className="px-1 py-1.5 rounded-lg border border-gray-200  text-sm font-bold text-slate-700  hover:bg-gray-100  transition-all min-w-5"
                        >
                            {lang === 'ar' ? 'EN' : 'عر'}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};
