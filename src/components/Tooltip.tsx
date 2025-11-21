import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Tooltip.css';

interface TooltipProps {
    content: ReactNode;
    visible: boolean;
    position?: { x: number; y: number };
}

export default function Tooltip({ content, visible, position }: TooltipProps) {
    const tooltipContent = (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="tooltip-container"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={position ? {
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        position: 'fixed'
                    } : undefined}
                >
                    <div className="tooltip-content">
                        {content}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(tooltipContent, document.body);
}
