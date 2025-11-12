import '/public/common.css'
import './MainContent.css'

import DevIcon from '../DevIcon';
import ProjectDisplayer from '../projectDisplay/ProjectDisplayer';


function SpecialtyCard({id, icon, name, techs}) {
    return (
        <div className="fade-in-on-scroll spe-card flex-col">
            <img src={`https://img.icons8.com/${icon}.png`} alt="Icon" />
            <h1 className="audiowide-regular">{name}</h1>
            <div>
                {
                    techs.map(([name, info]) => {
                        if (info.relevant && info.usedFor === id) {
                            return <DevIcon key={name} width="64" height="64" link={info.link} name={info.name} />;
                        }
                    })
                }
            </div>
        </div>
    );
}

function SpecialtyCards({techs}) {
    return (
        <section id="spe-cards">
            <SpecialtyCard
                id="frontend"
                name="Front-end"
                icon="pastel-glyph/100/FFFFFF/code--v1"
                techs={techs}
            />

            <SpecialtyCard
                id="backend"
                name="Back-end / API"
                icon="ios-filled/100/FFFFFF/gears"
                techs={techs}
            />

            <SpecialtyCard
                id="data"
                name="Data Storage"
                icon="ios-filled/100/FFFFFF/database"
                techs={techs}
            />

            <SpecialtyCard
                id="devops"
                name="DevOps"
                icon="material/96/FFFFFF/devops"
                techs={techs}
            />
        </section>
    );
}

export default function MainContent({timers, techs}) {
    return (
        <section id="content" className="flex-col">
            <div className="flex-col">
                <div id="about" className="text-block">
                    <div className='fade-in-on-scroll flex flex-col items-center text-center'>
                        <img className='rounded-full' width={480} height={480} src="/data/img/Me.jpg" alt="That's me!" title='Hello there!' />

                        <h1 className="audiowide-regular" style={{fontSize: "5vw"}}>Practicing since <strong style={{fontSize: "6vw"}}>2018</strong></h1>
                    </div>
                    

                    {techs ?
                        <SpecialtyCards techs={techs} />
                        :
                        <p>Techs not loaded.</p>
                    }

                    {techs ?
                        <div id='the-rest'
                            className="fade-in-on-scroll flex-col"
                        >
                            <p className="audiowide-regular">I adapt to all systems</p>
                            <div>
                                {techs.map(([name, info]) => {
                                    if (info.relevant && info.usedFor === "os") {
                                        return <DevIcon key={name} width="64" height="64" link={info.link} name={info.name} />;
                                    }
                                })}
                            </div>

                            <p className='audiowide-regular'>And I design!</p>
                            <div>
                                {techs.map(([name, info]) => {
                                    if (info.relevant && info.usedFor === "conception") {
                                        return <DevIcon key={name} width="64" height="64" link={info.link} name={info.name} />;
                                    }
                                })}
                            </div>
                        </div>
                        :
                        <p>Techs not loaded.</p>
                    }
                </div>

                <ProjectDisplayer techs={techs} />
            </div>
        </section>
    );
}