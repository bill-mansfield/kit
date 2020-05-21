import React, { useReducer } from 'react';
import themeContext from '../../hooks/themeContext';
import themeReducer from '../../hooks/themeReducer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

function pxToRem(value) {
    return `${value / 16}rem`;
}

const breakpoints = createBreakpoints({});

export default function Theme(props) {
    const [state, dispatch] = useReducer(themeReducer, {
        isDark: false,
    });
    const children = props;

    const lightPalette = {
        palette: {
            primary: {
                main: '#fdf6e3',
            },
            secondary: {
                main: '#93a1a1',
            },
            text: {
                main: '#002b36',
            },
            accent: {
                green: '#859900',
                cyan: '#2aa198',
                blue: '#268bd2',
            },
        },
    };

    const darkPalette = {
        palette: {
            primary: {
                main: '#002b36',
            },
            secondary: {
                main: '#586e75',
            },
            text: {
                main: '#fdf6e3',
            },
            accent: {
                green: '#859900',
                cyan: '#2aa198',
                blue: '#268bd2',
            },
        },
    };

    const theme = {
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
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                    marginBottom: '15px',
                    [breakpoints.up('md')]: {
                        fontSize: pxToRem(32),
                    },
                },
                h2: {
                    fontSize: pxToRem(21),
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                    fontWeight: '400',
                    marginBottom: '10px',
                    textAlign: 'center',
                    [breakpoints.up('md')]: {
                        fontSize: pxToRem(24),
                    },
                },
                h3: {
                    fontSize: pxToRem(18),
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                    fontWeight: '300',
                    marginBottom: '10px',
                    textAlign: 'center',
                    [breakpoints.up('md')]: {
                        fontSize: pxToRem(21),
                    },
                },
                body1: {
                    fontSize: pxToRem(14),
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                    [breakpoints.up('md')]: {
                        fontSize: pxToRem(18),
                    },
                },
            },
            MuiButton: {
                label: {
                    fontSize: pxToRem(16),
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                    [breakpoints.up('md')]: {
                        fontSize: pxToRem(18),
                    },
                },
            },
            MuiInput: {
                underline: {
                    '&:before': {
                        content: 'none',
                    },
                },
            },
        },
    };

    const darkTheme = {
        ...theme,
        ...darkPalette,
    };

    const lightTheme = {
        ...theme,
        ...lightPalette,
    };
    console.log(darkTheme);

    return (
        <themeContext.Provider value={{ state, dispatch }}>
            <ThemeProvider
                theme={createMuiTheme(state.isDark ? darkTheme : lightTheme)}
                {...children}
            />
        </themeContext.Provider>
    );
}
