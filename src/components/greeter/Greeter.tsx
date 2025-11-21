import '/src/common.css'
import './Greeter.css'
import { CacheStorage } from '../../models';
import { Icon } from '../Icon';
import AnimatedText from '../AnimatedText';

function HiddenText() {
    return (
        <div id="hidden-text" className="flex-col"
            onMouseEnter={(event) => {
                clearInterval(CacheStorage.hidingDivDisappearInterval);
                delete CacheStorage.hidingDivDisappearInterval;

                CacheStorage.hidingDivAppearInterval = setInterval(
                    () => {
                        let opacity = Number((event.target as HTMLElement).style.opacity);
                        if (opacity < 1) {
                            opacity += 0.1;
                            (event.target as HTMLElement).style.opacity = String(opacity);
                        } else {
                            clearInterval(CacheStorage.hidingDivAppearInterval);
                            delete CacheStorage.hidingDivAppearInterval;
                        }
                    }, 90
                );

                for (let i = 0; i < (event.target as HTMLElement).children.length; i++) {
                    let timeoutName = 'sentence' + String(i+1) + 'AppearTimeout';
                    CacheStorage[timeoutName] = setTimeout(() => {
                        let intervalName = 'sentence' + String(i+1) + 'AppearInterval';
                        CacheStorage[intervalName] = setInterval(
                            () => {
                                let opacity = Number(((event.target as HTMLElement).children[i] as HTMLElement).style.opacity);
                                if (opacity < 1) {
                                    opacity += 0.1;
                                    ((event.target as HTMLElement).children[i] as HTMLElement).style.opacity = String(opacity);
                                } else {
                                    clearInterval(CacheStorage[intervalName]);
                                    delete CacheStorage[intervalName];
                                }
                            }, 75
                        );
                    }, 1000 + 1500 * i);
                }
            }}

            onMouseLeave={(event) => {
                clearInterval(CacheStorage.hidingDivAppearInterval);
                delete CacheStorage.hidingDivAppearInterval;

                CacheStorage.hidingDivDisappearInterval = setInterval(
                    () => {
                        if (Number((event.target as HTMLElement).style.opacity) > 0) {
                            (event.target as HTMLElement).style.opacity = String(Number((event.target as HTMLElement).style.opacity) - 0.1);
                        } else {
                            clearInterval(CacheStorage.hidingDivDisappearInterval);
                            delete CacheStorage.hidingDivDisappearInterval;
                        }
                    }, 50
                );

                for (let i = 0; i < (event.target as HTMLElement).children.length; i++) {
                    let timeoutName = 'sentence' + String(i+1) + 'AppearTimeout';
                    let intervalName = 'sentence' + String(i+1) + 'AppearInterval';
            
                    if (CacheStorage[timeoutName]) {
                        clearTimeout(CacheStorage[timeoutName]);
                        clearInterval(CacheStorage[intervalName]);
                        delete CacheStorage[timeoutName];
                        delete CacheStorage[intervalName];
                    }

                    if (Number(((event.target as HTMLElement).children[i] as HTMLElement).style.opacity) > 0 || CacheStorage[intervalName]) {
                        let disapIntervalName = 'sentence' + String(i+1) + 'DisappearInterval';
            
                        CacheStorage[disapIntervalName] = setInterval(
                            () => {
                                if (Number(((event.target as HTMLElement).children[i] as HTMLElement).style.opacity) > 0) {
                                    ((event.target as HTMLElement).children[i] as HTMLElement).style.opacity = String(Number(((event.target as HTMLElement).children[i] as HTMLElement).style.opacity) - 0.1);
                                } else {
                                    clearInterval(CacheStorage[disapIntervalName]);
                                    delete CacheStorage[disapIntervalName];
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

export default function Greeter() {
    return (
        <section id="greeter" className="flex-col">
            <div id="greet-text" className="flex-col">
                <h1 className="audiowide-regular">
                    <AnimatedText text="Esteban JEAN" delay={0.75} />
                </h1>
                <HiddenText/>
                <h1 className="audiowide-regular">
                    <AnimatedText text="Full-Stack Developer" delay={1.5} />
                </h1>
            </div>
            <div id="scroll-inv" className="flex-col">
                <p className="offside-regular">Scroll !</p>
                <Icon width="26" height="26" icons8type="metro" link="long-arrow-down" name="Scroll!" />
            </div>
        </section>
    );
}