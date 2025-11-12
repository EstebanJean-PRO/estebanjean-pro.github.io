import "/public/common.css"
import "./SocialDisplayer.css"

import { useState } from "react"

export default function SocialDisplayer({ id, title, displayedText, isIconSwap, defaultIcon, swapperIcon, clickHandler, timers }) {
    const lengthState = useState(0);

    function enterTextEvent() {
        if (typeof displayedText === 'string' && displayedText.length === 0) {
            return
        }

        const SOCIAL_DISPLAY = document.getElementById(id);
        const DISPLAY_P = SOCIAL_DISPLAY.querySelector("p");

        if (timers[id + "-erasing"] || DISPLAY_P.style.display === 'none') {
            clearInterval(timers[id + "-erasing"]);
        }
        
        if (isIconSwap && (typeof swapperIcon === 'string' && swapperIcon.length > 0)) {
            SOCIAL_DISPLAY.querySelector('img').src = swapperIcon;
        }
        DISPLAY_P.style.display = 'block';
    
        timers[id + "-entering"] = setInterval(() => {
            DISPLAY_P.innerHTML = displayedText.slice(0, lengthState[0]);
            
            if (DISPLAY_P.innerHTML.length === displayedText.length) {
                clearInterval(timers[id + "-entering"]);
            }
    
            lengthState[0]++;
        }, 75);
    }
    
    function eraseTextEvent() {
        if (typeof displayedText === 'string' && displayedText.length === 0) {
            return
        }

        const SOCIAL_DISPLAY = document.getElementById(id);
        const DISPLAY_P = SOCIAL_DISPLAY.querySelector("p");

        if (timers[id + "-entering"] || DISPLAY_P.style.display === 'block') {
            clearInterval(timers[id + "-entering"]);
        }
    
        timers[id + "-erasing"] = setInterval(() => {
            lengthState[0]--;
    
            DISPLAY_P.innerHTML = DISPLAY_P.innerHTML.slice(0, lengthState[0]);
    
            if (DISPLAY_P.innerHTML.length <= 0) {
                DISPLAY_P.style.display = 'none';
                if (isIconSwap && (typeof swapperIcon === 'string' && swapperIcon.length > 0)) {
                    SOCIAL_DISPLAY.querySelector('img').src = defaultIcon;
                }
                clearInterval(timers[id + "-erasing"]);
            }
        }, 20);
    }

    return (
        <div
            id={id}
            className="fade-in-on-scroll social-displayer flex-col"
            style={{alignItems: "center"}}

            title={title}
            onMouseEnter={enterTextEvent}
            onMouseLeave={eraseTextEvent}

            onClick={clickHandler}
        >
            <img width="100" height="100" src={defaultIcon} />
            <p className="offside-regular" style={{display: "none"}}></p>
        </div>
    );
}