import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/Theme/useTheme';
import { useLang } from '../../context/Language/useLang';
import { Moon, SquareTerminal, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
    const { t: { header: t }, lang, toggleLang } = useLang();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { to: '/', label: t.nav.home },
        { to: '/about', label: t.nav.about },
        { to: '/projects', label: t.nav.projects },
        // { to: '/lab', label: t.nav.lab },
        { to: '/resume', label: t.nav.resume },
        { to: '/contact', label: t.nav.contact },
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
            <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 max-w-container-max mx-auto">
                {/* Logo */}
                <div className="font-label-caps text-label-caps font-bold tracking-tighter text-primary-fixed-dim uppercase">
                    Husam Elaayan
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1 font-label-caps text-label-caps transition-colors duration-200"
                                    : "text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200"
                            }
                            to={link.to}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Right Section - CTA Button & Controls */}
                <div className="flex items-center gap-4">
                    <button
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-lg font-label-caps text-label-caps font-bold hover:scale-95 transition-transform duration-100"
                        onClick={() => navigate('/contact')}
                    >
                        <SquareTerminal /> {t.hireMe}
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2 rounded-lg text-slate-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                        >
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        </button>
                        <button
                            onClick={toggleLang}
                            aria-label="Toggle language"
                            className="px-1 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all min-w-5"
                        >
                            {lang === 'ar' ? 'EN' : 'عر'}
                        </button>

                        {/* Hamburger Menu Button - Mobile */}
                        <button
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-x-0 top-16 bg-surface/95 dark:bg-surface/95 backdrop-blur-md border-b border-outline-variant/10 transition-all duration-300 ease-in-out ${isMobileMenuOpen
                    ? 'max-h-screen opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
                    } overflow-hidden`}
            >
                <div className="flex flex-col items-center gap-2 py-6 px-4">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            className={({ isActive }) =>
                                `w-full text-center py-3 px-4 rounded-lg font-label-caps text-label-caps transition-all duration-200 ${isActive
                                    ? 'text-primary-fixed-dim bg-primary-container/20 font-bold'
                                    : 'text-on-surface-variant hover:text-primary hover:bg-primary-container/10'
                                }`
                            }
                            to={link.to}
                            onClick={closeMobileMenu}
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    {/* Mobile CTA Button */}
                    <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-primary-container text-on-primary-container rounded-lg font-label-caps text-label-caps font-bold hover:scale-95 transition-transform duration-100"
                        onClick={() => {
                            closeMobileMenu();
                            navigate('/contact');
                        }}
                    >
                        <SquareTerminal /> {t.hireMe}
                    </button>
                </div>
            </div>
        </header>
    );
};