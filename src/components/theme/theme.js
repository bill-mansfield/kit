import React, { useContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import Navbar from '../Nav/navbar.js';

const white = '#fff';

function pxToRem(value) {
    return `${value / 16}rem`;
}

const breakpoints = createBreakpoints({});
const darkTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#002b36',
            light: '#eee8d5',
        },
        secondary: {
            main: '#93a1a1',
            light: '#586e75',
        },
        text: {
            main: '#073642',
            light: '#fdf6e3',
        },
        accent: {
            green: '#859900',
            cyan: '#2aa198',
            blue: '#268bd2',
        },
    },
});

const theme = createMuiTheme({
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
            dark: '#002b36',
        },
        secondary: {
            main: '#586e75',
            dark: '#93a1a1',
        },
        text: {
            main: '#fdf6e3',
            dark: '#073642',
        },
        accent: {
            green: '#859900',
            cyan: '#2aa198',
            blue: '#268bd2',
        },
    },
});

export default function Theme(props) {
    const darkTheme = false;
    return ThemeProvider({
        ...props,
        theme: darkTheme ? { theme, ...darkTheme } : theme,
    });
}
