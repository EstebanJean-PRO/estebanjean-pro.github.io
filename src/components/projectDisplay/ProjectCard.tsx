import './ProjectDisplayer.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import { Icon } from '../Icon';
import Tooltip from '../Tooltip';
import { AllSkills, Project } from '../../models';


export default function ProjectCard({ project, itsTechs } : { project: Project, itsTechs : AllSkills | null}) {
    const [currentImg, setCurrentImg] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const infoIconRef = useRef<HTMLSpanElement>(null);

    const handleImageChange = (isNext: boolean) => {
        if (isNext) {
            setCurrentImg((prev) => (prev + 1) % project.screenshots.length);
        } else {
            setCurrentImg((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
        }
    };

    const openFullscreen = () => setIsFullscreen(true);
    const closeFullscreen = () => setIsFullscreen(false);

    const handleInfoHover = () => {
        if (infoIconRef.current) {
            const rect = infoIconRef.current.getBoundingClientRect();
            const tooltipWidth = 300; // Approximate tooltip width

            // Center tooltip horizontally on the icon
            let x = rect.left + rect.width / 2 - tooltipWidth / 2;

            // Ensure tooltip doesn't go off screen
            const padding = 16;
            if (x < padding) x = padding;
            if (x + tooltipWidth > window.innerWidth - padding) {
                x = window.innerWidth - tooltipWidth - padding;
            }

            setTooltipPosition({
                x: x,
                y: rect.bottom + 8
            });
            setShowTooltip(true);
        }
    };

    const handleInfoLeave = () => {
        setShowTooltip(false);
    };

    return (
        <motion.div
            className="fade-in-on-scroll project-card"
            whileFocus={{ scale: 1.05 }}
        >
            {(project.screenshots.length !== 0 && project.screenshots[0] !== "") ? (
                <div
                    className="image-container"
                    style={{ width: (project.screenshots.length > 1) ? '75%' : '100%' }}
                >
                    {project.screenshots.length > 1 ? (
                        <button onClick={() => handleImageChange(false)}>{"<"}</button>
                    ) : (null)}

                    <img 
                        src={project.screenshots[currentImg]}
                        alt={project.name}
                        title='Click to view in fullscreen'
                        onClick={openFullscreen}
                    />

                    {project.screenshots.length > 1 ? (
                        <button onClick={() => handleImageChange(true)}>{">"}</button>
                    ) : (null)}
                </div>
            ): (null)}

            {isFullscreen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
                    onClick={closeFullscreen}
                    style={{ cursor: 'zoom-out' }}
                >
                    <img
                        src={project.screenshots[currentImg]}
                        alt={project.name}
                        className="max-h-[90vh] max-w-[90vw] shadow-lg"
                        onClick={e => e.stopPropagation()} // Empêche la fermeture si on clique sur l'image
                    />
                    <button
                        className="absolute top-4 right-4 text-white text-3xl font-bold"
                        onClick={closeFullscreen}
                        aria-label="Fermer"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        &times;
                    </button>
                </div>
            )}

            <div className="project-header">
                <h3 className="electrolize !text-center !text-3xl">{project.name}</h3>
                <span
                    ref={infoIconRef}
                    className="info-icon"
                    onMouseEnter={handleInfoHover}
                    onMouseLeave={handleInfoLeave}
                >
                    ℹ️
                </span>
            </div>
            <Tooltip
                content={
                    <div className="tooltip-inner">
                        <p className="tooltip-description oregano-regular">{project.description}</p>
                        {itsTechs && itsTechs.length > 0 && (
                            <div className="tooltip-tech-icons">
                                {itsTechs.map(([_, tech], index: number) => (
                                    <Icon key={index} width={"32"} height={"32"} link={tech.link!} name={tech.name} />
                                ))}
                            </div>
                        )}
                    </div>
                }
                visible={showTooltip}
                position={tooltipPosition}
            />
            <div className='w-full'>
                {project.links && project.links.length > 0 ? (
                    <div className='w-full flex justify-center gap-4 flex-wrap'>
                        {project.links.map((link, index: number) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.open(link.url, '_blank')}
                                rel="noopener noreferrer"
                            >
                                {link.label}
                            </motion.button>
                            
                        ))}
                    </div>
                ) : (
                    <p className='oregano-regular'>No links available</p>
                )}
            </div>
        </motion.div>
    );
}