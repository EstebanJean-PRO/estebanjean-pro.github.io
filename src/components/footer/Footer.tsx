import '/src/common.css'
import './Footer.css'
import { motion } from 'framer-motion';

import SocialDisplayer from './SocialDisplayer';

export default function Footer() {
    return (
        <div className="flex-col">
            <div style={{height: "50vh", backgroundImage: "linear-gradient(180deg, var(--body-background), var(--element-background))"}}></div>
            <footer id="contact" className="flex-col">
                <div>
                    <motion.h1
                        className="audiowide-regular !text-9xl"
                        whileHover={{ scale: 1.1 }}
                    >
                        E
                    </motion.h1>
                    <motion.h1
                        className="audiowide-regular !text-9xl"
                        whileHover={{ scale: 1.1 }}
                    >
                        J
                    </motion.h1>
                </div>

                <div className="flex-col" style={{rowGap: "2cm"}}>
                    <SocialDisplayer
                        id="email-displayer"
                        title="Click me to send my maker an email!"
                        displayedText="esteban-jean.pro@hotmail.com"
                        defaultIcon="secured-letter--v1"
                        swapperIcon="letter-with-email-sign"
                        clickHandler={() => {
                            window.location.href = "mailto:esteban-jean.pro@hotmail.com";
                        }}
                    />

                    <SocialDisplayer
                        id="linkedin-displayer"
                        title="Click me to go to my maker's LinkedIn page!"
                        displayedText="@newjeanesteban"
                        defaultIcon="linkedin"
                        swapperIcon=""
                        clickHandler={() => {
                            window.open("https://linkedin.com/in/newjeanesteban/", "_blank")!.focus();
                        }}
                    />

                    <SocialDisplayer
                        id="github-displayer"
                        title="Click me to go to my maker's GitHub page!"
                        displayedText="@MrLepoischiche"
                        defaultIcon="github"
                        swapperIcon=""
                        clickHandler={() => {
                            window.open("https://github.com/MrLepoischiche", "_blank")!.focus();
                        }}
                    />
                </div>

                <p id='disclaimer' className="offside-regular">
                    Esteban JEAN 2025. All rights reserved.
                </p>
            </footer>
        </div>
    );
}