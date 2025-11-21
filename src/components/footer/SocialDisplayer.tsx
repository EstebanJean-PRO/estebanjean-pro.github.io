import "/src/common.css"
import "./SocialDisplayer.css"

import { useState } from "react"

import { CacheStorage, useTheme } from "../../models";
import { Icon, getIcons8Url } from "../Icon";

interface SocialDisplayerProps {
    id: string;
    title: string;
    displayedText: string;
    defaultIcon: string;
    swapperIcon: string;
    clickHandler: () => void;
}

export default function SocialDisplayer({ id, title, displayedText, defaultIcon, swapperIcon, clickHandler }: SocialDisplayerProps) {
    const lengthState = useState(0);
    const { theme } = useTheme();

    function enterTextEvent() {
        if (displayedText.length === 0) {
            return
        }

        const SOCIAL_DISPLAY = document.getElementById(id);
        const DISPLAY_P = SOCIAL_DISPLAY!.querySelector("p");

        if (CacheStorage[id + "-erasing"] || DISPLAY_P!.style.display === 'none') {
            clearInterval(CacheStorage[id + "-erasing"]);
            delete CacheStorage[id + "-erasing"];
        }
        
        if (swapperIcon.length > 0) {
            SOCIAL_DISPLAY!.querySelector('img')!.src = getIcons8Url("ios-filled", "100", theme, swapperIcon);
        }
        DISPLAY_P!.style.display = 'block';
    
        CacheStorage[id + "-entering"] = setInterval(() => {
            DISPLAY_P!.innerHTML = displayedText.slice(0, lengthState[0]);
            
            if (DISPLAY_P!.innerHTML.length === displayedText.length) {
                clearInterval(CacheStorage[id + "-entering"]);
                delete CacheStorage[id + "-entering"];
            }
    
            lengthState[0]++;
        }, 75);
    }
    
    function eraseTextEvent() {
        if (typeof displayedText === 'string' && displayedText.length === 0) {
            return
        }

        const SOCIAL_DISPLAY = document.getElementById(id);
        const DISPLAY_P = SOCIAL_DISPLAY!.querySelector("p");

        if (CacheStorage[id + "-entering"] || DISPLAY_P!.style.display === 'block') {
            clearInterval(CacheStorage[id + "-entering"]);
            delete CacheStorage[id + "-entering"];
        }
    
        CacheStorage[id + "-erasing"] = setInterval(() => {
            lengthState[0]--;
    
            DISPLAY_P!.innerHTML = DISPLAY_P!.innerHTML.slice(0, lengthState[0]);
    
            if (DISPLAY_P!.innerHTML.length <= 0) {
                DISPLAY_P!.style.display = 'none';
                if (swapperIcon.length > 0) {
                    SOCIAL_DISPLAY!.querySelector('img')!.src = getIcons8Url("ios-filled", "100", theme, defaultIcon);
                }
                clearInterval(CacheStorage[id + "-erasing"]);
                delete CacheStorage[id + "-erasing"];
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
            <Icon
                width="100"
                height="100"
                icons8type={"ios-filled"}
                link={defaultIcon}
            />
            <p className="offside-regular" style={{display: "none"}}></p>
        </div>
    );
}