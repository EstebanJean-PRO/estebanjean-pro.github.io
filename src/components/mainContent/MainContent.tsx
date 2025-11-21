import '/src/common.css'
import './MainContent.css'

import { Icon } from '../Icon';
import HardSkills from '../skills/HardSkills';
import SoftSkills from '../skills/SoftSkills';
import ProjectDisplayer from '../projectDisplay/ProjectDisplayer';
import { AllSkills } from '../../models';

export default function MainContent({ skills } : { skills: AllSkills }) {
    return (
        <section id="content" className="flex-col">
            <div className="flex-col">
                <div id="about" className="text-block">
                    {/* Profile Image */}
                    <div className='fade-in-on-scroll flex flex-col items-center text-center'>
                        <img className='rounded-full' width={480} height={480} src="/data/img/Me.jpg" alt="That's me!" title='Hello there!' />
                    </div>

                    {/* Elevator Pitch */}
                    <div className='fade-in-on-scroll elevator-pitch'>
                        <p className="tektur">
                            Full-stack developer driven by curiosity and continuous learning.
                            <br />
                            I create thoughtful solutions using modern web technologies while constantly
                            expanding my technical expertise.
                        </p>
                    </div>

                    {/* Practicing since 2018 */}
                    <div className='fade-in-on-scroll'>
                        <h1 className="audiowide-regular" style={{fontSize: "5vw"}}>
                            Practicing since <strong style={{fontSize: "6vw"}}>2018</strong>
                        </h1>
                    </div>

                    {/* Soft Skills */}
                    {skills && skills.length > 0 ? (
                        <SoftSkills skills={skills} />
                    ) : (
                        <p>Skills not loaded.</p>
                    )}

                    {/* Hard Skills */}
                    {skills && skills.length > 0 ? (
                        <HardSkills skills={skills} />
                    ) : (
                        <p>Skills not loaded.</p>
                    )}
                </div>

                <ProjectDisplayer skills={skills} />
            </div>
        </section>
    );
}