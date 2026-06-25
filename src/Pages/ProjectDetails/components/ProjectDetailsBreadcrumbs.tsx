import { Link } from "react-router-dom";
import { useLang } from "../../../context/Language/useLang";

export const ProjectDetailsBreadcrumbs = () => {
    const { t } = useLang();
    const projectsText = t.projects || {};

    return (
        <div className="flex items-center gap-2 mb-8 mono text-[10px] uppercase tracking-widest text-outline">
            <Link className="hover:text-primary-container" to="/">
                Root
            </Link>
            <span>/</span>
            <Link className="hover:text-primary-container" to="/projects">
                {projectsText.archive || 'Projects'}
            </Link>
            <span>/</span>
            <span className="text-on-surface">Project_Details</span>
        </div>
    );
};