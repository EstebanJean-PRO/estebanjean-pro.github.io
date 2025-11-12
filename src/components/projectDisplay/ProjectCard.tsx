import './ProjectDisplayer.css';
import { useState } from 'react';
import { motion } from 'framer-motion';

import DevIcon from '../DevIcon';


export default function ProjectCard({ project, itsTechs }) {
    const [currentImg, setCurrentImg] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleImageChange = (isNext) => {
        if (isNext) {
            setCurrentImg((prev) => (prev + 1) % project.screenshots.length);
        } else {
            setCurrentImg((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
        }
    };

    const openFullscreen = () => setIsFullscreen(true);
    const closeFullscreen = () => setIsFullscreen(false);

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
                        <button onClick={() => handleImageChange(false)}>Prev</button>
                    ) : (null)}

                    <img 
                        src={project.screenshots[currentImg]}
                        alt={project.title}
                        title='Click to view in fullscreen'
                        onClick={openFullscreen}
                    />

                    {project.screenshots.length > 1 ? (
                        <button onClick={() => handleImageChange(true)}>Next</button>
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
                        alt={project.title}
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

            <h3 className="audiowide-regular !text-center !text-3xl">{project.name}</h3>
            <p className="oregano-regular !text-center !text-xl">{project.description}</p>
            {itsTechs ? (
                <span className='flex flex-wrap justify-center gap-2'>
                    {itsTechs.map((tech, index) => (
                        <DevIcon key={index} width={50} height={50} link={tech.link} name={tech.name} />
                    ))}
                </span>
            ) : (
                <p className='oregano-regular'>No techs specified</p>
            )}
            <div className='w-full'>
                {project.links && project.links.length > 0 ? (
                    <div className='w-full flex justify-center gap-4 flex-wrap'>
                        {project.links.map((link, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.open(link.url, '_blank')}
                                rel="noopener noreferrer"
                            >
                                {link.name}
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