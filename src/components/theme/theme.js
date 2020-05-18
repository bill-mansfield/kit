import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import Navbar from '../Nav/navbar.js';

const white = '#fff';

function pxToRem(value) {
    return `${value / 16}rem`;
}

const breakpoints = createBreakpoints({});

const themeObject = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    overrides: {
        MuiTypography: {
            h1: {
                fontSize: pxToRem(24),
                color: white,
                marginBottom: '15px',
                [breakpoints.up('md')]: {
                    fontSize: pxToRem(32),
                },
            },
            h2: {
                fontSize: pxToRem(21),
                color: white,
                fontWeight: '400',
                marginBottom: '10px',
                textAlign: 'center',
                [breakpoints.up('md')]: {
                    fontSize: pxToRem(24),
                },
            },
            h3: {
                fontSize: pxToRem(18),
                color: white,
                fontWeight: '300',
                marginBottom: '10px',
                textAlign: 'center',
                [breakpoints.up('md')]: {
                    fontSize: pxToRem(21),
                },
            },
            body1: {
                fontSize: pxToRem(14),
                color: white,
                [breakpoints.up('md')]: {
                    fontSize: pxToRem(18),
                },
            },
        },
        MuiButton: {
            label: {
                fontSize: pxToRem(16),
                color: white,
                [breakpoints.up('md')]: {
                    fontSize: pxToRem(18),
                },
            },
        },
        MuiFormLabel: {
            root: {
                color: white,
            },
        },
        MuiInput: {
            underline: {
                '&:before': {
                    content: 'none',
                },
            },
        },
        MuiInputBase: {
            input: {
                color: white,
            },
        },
    },

    palette: {
        primary: {
            main: '#eee8d5',
            // dark: '#002b36',
        },
        secondary: {
            main: '#586e75',
            // dark: '#93a1a1',
        },
        text: {
            main: '#fdf6e3',
            // dark: '#073642',
        },
        accent: {
            green: '#859900',
            cyan: '#2aa198',
            blue: '#268bd2',
        },
        type: 'light',
    },
};
console.log(themeObject);

export default function Theme(props) {
    const useDarkTheme = () => {
        const [darkTheme, setDarkTheme] = useState(themeObject);
        const {
            palette: { type },
        } = darkTheme;
        const toggleDarkTheme = () => {
            const updatedTheme = {
                ...darkTheme,
                palette: {
                    ...themeObject.palette,
                    type: type === 'light' ? 'dark' : 'light',
                },
            };
            setDarkTheme(updatedTheme);
        };
        console.log(darkTheme);
        return [darkTheme, toggleDarkTheme];
    };

    const [darkTheme, toggleDarkTheme] = useDarkTheme();
    const themeConfig = createMuiTheme(darkTheme);

    return ThemeProvider({
        ...props,
        theme: themeConfig,
    });
}
