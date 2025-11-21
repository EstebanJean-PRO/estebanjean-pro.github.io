import '/src/common.css'
import './Header.css'
import { motion } from 'framer-motion';

import { useTheme } from '../../models';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header>
            <div id="link-to-index">
                <motion.h1
                    className="audiowide-regular !text-5xl"
                    whileHover={{ scale: 1.1 }}
                >
                    E
                </motion.h1>
                <motion.h1
                    className="audiowide-regular !text-5xl"
                    whileHover={{ scale: 1.1 }}
                >
                    J
                </motion.h1>
            </div>
            <div id="link-navigator">
                <a className="offside-regular" href="#about">About</a>
                <a className="offside-regular" href="#project-presenter">Work</a>
                <a className="offside-regular" href="#contact">Contact</a>
            </div>
            <div id="color-changer" onClick={toggleTheme}>
                <motion.img
                    width="48"
                    height="48"
                    src={theme === 'dark'
                        ? "https://img.icons8.com/ios-filled/50/FFFFFF/sun--v1.png"
                        : "https://img.icons8.com/ios-filled/50/000000/moon-symbol.png"
                    }
                    alt="Toggle theme"
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                />
            </div>
        </header>
    );
}