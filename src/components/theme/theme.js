import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({});

const theme = createMuiTheme({
    breakpoints: {
		values: {
			xs: 0,
			sm: 700,
			md: 960,
			lg: 1280,
			xl: 1920,
		}
    },
	
    status: {
        body1: {
            fontSize: '32px',
        }
	},
});

export default function Theme(props) {
	return ThemeProvider({...props, theme: theme});
}
