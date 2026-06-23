import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-outline-variant/10 w-full py-8">
            <div className="flex flex-col  md:flex-row justify-center items-center px-margin-mobile md:px-margin-desktop gap-4 max-w-container-max mx-auto">


                {/* Footer Links */}
                <div className="flex gap-8 ">
                    <Link
                        className="font-code-sm text-code-sm text-on-surface-variant hover:text-primary-fixed transition-colors"
                        to="https://github.com/husam2304"
                        target="_blank"
                    >
                        Github

                    </Link>
                    <Link
                        className="font-code-sm text-code-sm text-on-surface-variant hover:text-primary-fixed transition-colors"
                        to="https://www.linkedin.com/in/حسام-عليان-695054384 "
                        target="_blank"
                    >
                        LinkedIn
                    </Link>

                </div>

            </div>
        </footer>
    );
};
