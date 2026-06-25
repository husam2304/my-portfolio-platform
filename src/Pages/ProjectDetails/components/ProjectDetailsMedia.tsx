import { ExternalLink, FileIcon, Play, X, ZoomIn } from "lucide-react";
import { ProjectMediaType, type ProjectDetails } from "../../../services/projectDetails.service";
import { useState } from "react";
import { useLang } from "../../../context/Language/useLang";

export const ProjectDetailsMedia = ({ data }: { data: ProjectDetails }) => {
    const { t: { projectDetails: t } } = useLang();
    const project = data;
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<'image' | 'video' | null>(null);

    if (!project?.media || project.media.length === 0) return null;

    const openMedia = (url: string, type: ProjectMediaType) => {
        setSelectedMedia(url);
        setSelectedType(type === ProjectMediaType.Image ? 'image' : type === ProjectMediaType.Video ? 'video' : null);
    };

    const closeMedia = () => {
        setSelectedMedia(null);
        setSelectedType(null);
    };

    return (
        <section className="mb-24">
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-8">
                {t.media || 'Project Media'}
            </h2>

            {/* Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.media.map((item, index) => (
                    <div
                        key={index}
                        className="relative group cursor-pointer rounded-xl overflow-hidden border border-outline-variant bg-surface-container-high hover:border-primary-container transition-all duration-300"
                        onClick={() => openMedia(item.url, item.type)}
                    >
                        {item.type === ProjectMediaType.Image ? (
                            <div className="aspect-square">
                                <img
                                    src={item.url}
                                    alt={`Project media ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ) : item.type === ProjectMediaType.Video ? (
                            <div className="aspect-video relative flex items-center justify-center bg-surface-container-highest">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Play
                                        className="text-primary-container opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                        size={48}
                                    />
                                </div>
                                <video
                                    src={item.url}
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        ) : (
                            <div className="aspect-square flex items-center justify-center bg-surface-container-highest">
                                <FileIcon
                                    className="text-primary-container opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                    size={48}
                                />
                            </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-primary-container/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            {item.type === ProjectMediaType.Image ? (
                                <ZoomIn className="text-white bg-primary-container/80 rounded-full p-2" size={40} />
                            ) : item.type === ProjectMediaType.Video ? (
                                <Play className="text-white bg-primary-container/80 rounded-full p-2" size={40} />
                            ) : (
                                <ExternalLink className="text-white bg-primary-container/80 rounded-full p-2" size={40} />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Fullscreen Media Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-8"
                    onClick={closeMedia}
                >
                    <button
                        onClick={closeMedia}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={48} />
                    </button>

                    <div
                        className="max-w-6xl max-h-full w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedType === 'image' ? (
                            <img
                                src={selectedMedia}
                                alt="Media preview"
                                className="w-full h-full object-contain rounded-xl"
                            />
                        ) : (
                            <video
                                src={selectedMedia}
                                controls
                                autoPlay
                                className="w-full h-full rounded-xl"
                            />
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};