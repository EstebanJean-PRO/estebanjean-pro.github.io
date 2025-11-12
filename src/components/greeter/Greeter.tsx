import '/public/common.css'
import './Greeter.css'

function HiddenText({timers}) {
    return (
        <div id="hidden-text" className="flex-col"
            onMouseEnter={(event) => {
                clearInterval(timers.hidingDivDisappearInterval);
                timers.hidingDivAppearInterval = setInterval(
                    () => {
                        let opacity = Number(event.target.style.opacity);
                        if (opacity < 1) {
                            opacity += 0.1;
                            event.target.style.opacity = String(opacity);
                        } else {
                            clearInterval(timers.hidingDivAppearInterval);
                        }
                    }, 90
                );

                for (let i = 0; i < event.target.children.length; i++) {
                    let timeoutName = 'sentence' + String(i+1) + 'AppearTimeout';
                    timers[timeoutName] = setTimeout(() => {
                        let intervalName = 'sentence' + String(i+1) + 'AppearInterval';
                        timers[intervalName] = setInterval(
                            () => {
                                let opacity = Number(event.target.children[i].style.opacity);
                                if (opacity < 1) {
                                    opacity += 0.1;
                                    event.target.children[i].style.opacity = String(opacity);
                                } else {
                                    clearInterval(timers[intervalName]);
                                }
                            }, 75
                        );
                    }, 1000 + 1500 * i);
                }
            }}

            onMouseLeave={(event) => {
                clearInterval(timers.hidingDivAppearInterval);
                timers.hidingDivDisappearInterval = setInterval(
                    () => {
                        if (event.target.style.opacity > 0) {
                            event.target.style.opacity -= 0.1;
                        } else {
                            clearInterval(timers.hidingDivDisappearInterval);
                        }
                    }, 50
                );

                for (let i = 0; i < event.target.children.length; i++) {
                    let timeoutName = 'sentence' + String(i+1) + 'AppearTimeout';
                    let intervalName = 'sentence' + String(i+1) + 'AppearInterval';
            
                    if (timers[timeoutName]) {
                        clearTimeout(timers[timeoutName]);
                        clearInterval(timers[intervalName]);
                    }
            
                    if (event.target.children[i].style.opacity > 0 || timers[intervalName]) {
                        let disapIntervalName = 'sentence' + String(i+1) + 'DisappearInterval';
            
                        timers[disapIntervalName] = setInterval(
                            () => {
                                if (event.target.children[i].style.opacity > 0) {
                                    event.target.children[i].style.opacity -= 0.1;
                                } else {
                                    clearInterval(timers[disapIntervalName]);
                                }
                            }, 50
                        );
                    }
                }
            }}
        >
            <h2 className="vast-shadow-regular !text-2xl">This portfolio is prone to changes</h2>
            <h2 className="vast-shadow-regular !text-2xl">Like everything in this world</h2>
        </div>
    );
}

export default function Greeter({timers}) {
    return (
        <section id="greeter" className="flex-col">
            <div id="greet-text" className="flex-col">
                <h1 className="rampart-one-regular">Esteban JEAN</h1>
                <HiddenText timers={timers} />
                <h1 className="rampart-one-regular">Full-Stack Developer</h1>
            </div>
            <div id="scroll-inv" className="flex-col">
                <p className="offside-regular">Scroll !</p>
                <img width="26" height="26" src="https://img.icons8.com/metro/26/FFFFFF/long-arrow-down.png"/>
            </div>
        </section>
    );
}