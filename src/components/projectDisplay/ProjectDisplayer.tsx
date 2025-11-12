import './ProjectDisplayer.css';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';


export default function ProjectDisplayer({ techs }) {
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

    let elementToRender =
        (myProjects && myProjects.length > 0)
        ? myProjects.map((project, index) =>
            <ProjectCard key={index} project={project} itsTechs={
                techs
                .filter(([key, value]) => project.techs.includes(key))
                .map(([key, value]) => value)
            } />)
        : <p className='oregano-regular'>No projects available</p>;

    return (
        <div id="project-presenter" className='flex flex-col items-center justify-center'>
            <p className="audiowide-regular !text-5xl">My Projects</p>
            <div className='!grid !w-[98vw] !mt-12 items-center justify-items-center gap-10 md:!grid-cols-1 lg:!grid-cols-2 xl:!grid-cols-3'>
                {elementToRender}
            </div>
        </div>
    );
}