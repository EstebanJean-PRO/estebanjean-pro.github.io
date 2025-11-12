import '/public/common.css'
import './Header.css'
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <header>
            <div id="link-to-index">
                <motion.h1
                    className="rampart-one-regular"
                    animate={{
                            transform: [
                                "translateY(-8px)",
                                "translateY(6px)",
                                "translateY(-8px)"
                            ],
                            transition: {
                                ease: "easeInOut",
                                bounce: 0.75,
                                duration: 2,
                                repeat: Infinity
                            }
                        }}
                >
                    E
                </motion.h1>
                <motion.h1
                    className="rampart-one-regular"
                    animate={{
                            transform: [
                                "translateY(-3px)",
                                "translateY(5px)",
                                "translateY(-3px)"
                            ],
                            transition: {
                                ease: "easeInOut",
                                bounce: 0.75,
                                duration: 2,
                                repeat: Infinity
                            }
                        }}
                >
                    J
                </motion.h1>
            </div>
            <div id="link-navigator">
                <a className="offside-regular" href="#about">About</a>
                <a className="offside-regular" href="#project-presenter">Work</a>
                <a className="offside-regular" href="#contact">Contact</a>
            </div>
            <div id="color-changer" style={{opacity: "0"}}>
                <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/FFFFFF/contrast.png" alt="O"/>
            </div>
        </header>
    );
}