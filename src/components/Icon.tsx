import '/src/common.css'

import { useMemo } from 'react';

import { ICONS_BASE_URL, Icons8Type, useTheme } from '../models';

interface IconProps {
    width: string;
    height: string;
    icons8type?: Icons8Type;
    link: string;
    name?: string;
}

export function getIcons8Url(icons8type: string, width: string, theme: 'dark' | 'light', link: string): string {
    const color = (theme === 'dark') ? 'FFFFFF/' : '';
    return `${ICONS_BASE_URL}${icons8type}/${width}/${color}${link}.png`;
}

export function Icon({ width, height, icons8type, link, name } : IconProps) {
    const { theme } = useTheme();

    const iconUrl = useMemo(() => 
        icons8type ? getIcons8Url(icons8type, width, theme, link) : link,
        [theme, link]
    );

    return <img width={width} height={height} src={iconUrl} alt={name} title={name} />
}