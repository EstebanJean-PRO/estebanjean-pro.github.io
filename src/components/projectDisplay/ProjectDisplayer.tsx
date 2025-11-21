import './ProjectDisplayer.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { AllSkills, Project } from '../../models';


export default function ProjectDisplayer({ skills }: { skills: AllSkills }) {
    const [myProjects, setMyProj] = useState([]);

    async function FetchMyProjects() {
        try {
            const projResp = await fetch('/data/projects.json',
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            if (!projResp.ok) {
                throw new Error('Network response was not ok');
            }

            const projData = await projResp.json();
            setMyProj(projData);
        } catch (error) {
            console.warn(error, "error");
        }
    };

    useEffect(() => {
        FetchMyProjects();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    let elementToRender =
        (myProjects && myProjects.length > 0)
        ? myProjects.map((project: Project, index) =>
            <motion.div key={index} variants={cardVariants}>
                <ProjectCard project={project} itsTechs={
                    skills
                    .filter(([key, _]) => project.techs.includes(key))
                } />
            </motion.div>)
        : <p className='oregano-regular'>No projects available</p>;

    return (
        <div id="project-presenter" className='flex flex-col items-center justify-center'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="project-heading-container"
            >
                <h2 className="electrolize !text-5xl">My Projects</h2>
                <motion.div
                    className="heading-underline"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />
            </motion.div>
            <motion.div
                className='!grid !w-[98vw] !mt-12 items-center justify-items-center gap-10 md:!grid-cols-1 lg:!grid-cols-2 xl:!grid-cols-3'
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {elementToRender}
            </motion.div>
        </div>
    );
}