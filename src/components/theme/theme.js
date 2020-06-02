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
    const children = props;
    const [state, dispatch] = useReducer(themeReducer, {
        isDark: false,
    });

    const lightPalette = {
        palette: {
            primary: {
                main: '#eee8d5',
            },
            secondary: {
                main: '#fdf6e3',
            },
            text: {
                main: '#002b36',
            },
            accent: {
                green: '#859900',
                cyan: '#2aa198',
                blue: '#268bd2',
            },
            danger: {
                main: 'red',
            },
        },
    };

    const darkPalette = {
        palette: {
            primary: {
                main: '#073642',
            },
            secondary: {
                main: '#002b36',
            },
            text: {
                main: '#fdf6e3',
            },
            accent: {
                green: '#859900',
                cyan: '#2aa198',
                blue: '#268bd2',
            },
            danger: {
                main: 'red',
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
                h6: {
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
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
                caption: {
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                },
            },
            MuiTableCell: {
                root: {
                    borderBottom: `1px solid ${
                        state.isDark
                            ? darkPalette.palette.secondary.main
                            : lightPalette.palette.secondary.main
                    }`,
                },
                body: {
                    color: `${
                        state.isDark
                            ? darkPalette.palette.text.main
                            : lightPalette.palette.text.main
                    } !important`,
                },
                head: {
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                    backgroundColor: `${
                        state.isDark
                            ? darkPalette.palette.secondary.main
                            : lightPalette.palette.secondary.main
                    } !important`,
                },
                alignLeft: {
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                },
            },
            MuiButton: {
                label: {
                    fontSize: pxToRem(16),
                    textTransform: 'lowercase',
                    fontWeight: '400',
                    width: '170px',
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                    [breakpoints.up('md')]: {
                        fontSize: pxToRem(18),
                    },
                },
                contained: {
                    backgroundColor: darkPalette.palette.accent.green,
                },
            },
            MuiIconButton: {
                root: {
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                },
                colorInherit: {
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                },
            },
            MuiTablePagination: {
                root: {
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
                },
            },
            MuiSelect: {
                icon: {
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
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
                root: {
                    color: state.isDark
                        ? darkPalette.palette.text.main
                        : lightPalette.palette.text.main,
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

    return (
        <themeContext.Provider value={{ state, dispatch }}>
            <ThemeProvider
                theme={createMuiTheme(state.isDark ? darkTheme : lightTheme)}
                {...children}
            />
        </themeContext.Provider>
    );
}
