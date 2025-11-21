import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AnimatedText.css';

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    letterDelay?: number;
}

export default function AnimatedText({
    text,
    className = '',
    delay = 0,
    letterDelay = 0.05
}: AnimatedTextProps) {
    const letters = text.split('');
    const [animationState, setAnimationState] = useState<'hidden' | 'visible' | 'floating'>('hidden');

    // Trigger animation on mount
    useEffect(() => {
        setAnimationState('visible');
    }, []);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: letterDelay
            }
        },
        floating: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02
            }
        }
    };

    const child = {
        hidden: {
            y: -100,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        floating: {
            y: [0, -8, 0],
            opacity: 1,
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.span
            className={`animated-text ${className}`}
            variants={container}
            initial="hidden"
            animate={animationState}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={`${letter}-${index}`}
                    variants={child}
                    className="animated-letter"
                    style={{ display: 'inline-block' }}
                    onAnimationComplete={() => {
                        if (animationState === 'visible' && index === letters.length - 1) {
                            setTimeout(() => setAnimationState('floating'), 500);
                        }
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}
