import '/src/common.css'

import Header from './components/header/Header';
import Greeter from './components/greeter/Greeter';
import Footer from './components/footer/Footer';
import MainContent from './components/mainContent/MainContent';
import { useState, useEffect } from 'react';
import { CacheStorage, cleanupTimers, ThemeContext } from './models';

function addScrollAppearEvent() {

    // Scroll invitation fades in 5 seconds after page has loaded if user hasn't scrolled yet
    if (!CacheStorage['user-has-scrolled']) {
        CacheStorage.scrollInvAppearTimeout = setTimeout(() => {
            CacheStorage.invitFadeInEffect = setInterval(
                () => {
                    const SCROLL_INVIT = document.getElementById('scroll-inv')!;

                    let opacity = Number(SCROLL_INVIT.style.opacity);
                    if (opacity < 1) {
                        opacity += 0.1;
                        SCROLL_INVIT.style.opacity = String(opacity);
                    } else {
                        clearInterval(CacheStorage.invitFadeInEffect);
                        delete CacheStorage.invitFadeInEffect;
                    }
                }, 50
            );
        }, 5000);
    }
}

function addScrollDisappearEvent() {

    // If user scrolls, clear timeout and hide scroll invitation if necessary
    window.addEventListener('scroll', (event) => {
        if (event.timeStamp > 500 && !CacheStorage['user-has-scrolled']) {
            CacheStorage['user-has-scrolled'] = true;

            clearTimeout(CacheStorage.scrollInvAppearTimeout);
            delete CacheStorage.scrollInvAppearTimeout;
            clearInterval(CacheStorage.invitFadeInEffect);
            delete CacheStorage.invitFadeInEffect;
            
            const SCROLL_INVIT = document.getElementById('scroll-inv')!;

            if (Number(SCROLL_INVIT.style.opacity) > 0) {
                CacheStorage.invitFadeOutEffect = setInterval(
                    () => {
                        let opacity = Number(SCROLL_INVIT.style.opacity);
                        if (opacity > 0) {
                            opacity -= 0.1;
                            SCROLL_INVIT.style.opacity = String(opacity);
                        } else {
                            clearInterval(CacheStorage.invitFadeOutEffect);
                            delete CacheStorage.invitFadeOutEffect;
                        }
                    }, 50
                );
            }
        }
    });
}

export default function Page() {
    // Theme management
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    // Toggle theme function
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    };

    useEffect(() => {
        CacheStorage['user-has-scrolled'] = false;

        // Timed events (aka Intervals and Timeouts)
        addScrollAppearEvent();
        addScrollDisappearEvent();

        return () => {
            cleanupTimers();
        }
    }, []);

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                (entry.target as HTMLElement).style.opacity = '1';
                (entry.target as HTMLElement).style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(20px)';
        (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Skills' and Projects' data at page's root
    const [mySkills, setMySkills] = useState([]);

    async function FetchMySkills() {
        try {
            let skillsObj: any = [];

            const skillsResp = await fetch('/data/skills.json',
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            await skillsResp.json().then(skills => {skillsObj = Object.entries(skills)});
            setMySkills(skillsObj);
        } catch (error) {
            console.warn(error, "error");
        }
    };

    useEffect(() => {
        FetchMySkills();
    }, []);

    // Circular cursor moving with mouse
    window.onmousemove = (e) => {
        const CIRCULAR_CURSOR = document.getElementById("circular-cursor")!;
        let circleSize = Number(CIRCULAR_CURSOR.style.width.slice(0, -2));

        CIRCULAR_CURSOR.style.opacity = '1';
        CIRCULAR_CURSOR.style.left = String(e.clientX+window.scrollX - (circleSize / 2)) + 'px';
        CIRCULAR_CURSOR.style.top = String(e.clientY+window.scrollY - (circleSize / 2)) + 'px';

        if (CacheStorage.cursorDisappearTimeout) {
            clearTimeout(CacheStorage.cursorDisappearTimeout);
            delete CacheStorage.cursorDisappearTimeout;
        }

        CacheStorage.cursorDisappearTimeout = setTimeout(() => {
            CacheStorage.cursorFadeOutEffect = setInterval(
                () => {
                    if (Number(CIRCULAR_CURSOR.style.opacity) > 0) {
                        CIRCULAR_CURSOR.style.opacity = String(Number(CIRCULAR_CURSOR.style.opacity) - 0.1);
                    } else {
                        clearInterval(CacheStorage.cursorFadeOutEffect);
                        delete CacheStorage.cursorFadeOutEffect;
                    }
                }, 25
            );
        }, 500);
    }

    // Reset scroll position on page reload
    window.onbeforeunload = () => {
        window.scrollTo(0, 0);
    };

    // Smooth scroll on all links inside page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector((anchor.getAttribute('href'))!)!.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    

    // Whole page's content is returned to main.jsx
    return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div id="circular-cursor" style={{width: "50px", height: "50px"}}></div>

        <Header/>
        <Greeter/>
        <MainContent skills={mySkills} />
        <Footer/>
    </ThemeContext.Provider>
    );
}