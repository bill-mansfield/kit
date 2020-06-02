import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import FlexColumn from '../../layouts/flex-column';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import AddAscentForm from './add-ascent-form';

const useStyles = makeStyles((theme) => ({
    formCol: {
        display: 'flex',
        width: '90%',
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
    },
    addButton: {
        padding: '10px 20px 10px 20px',
        backgroundColor: theme.palette.accent.green,
        border: `2px solid ${theme.palette.accent.green}`,
        borderRadius: '25px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    formLabel: {
        color: `${theme.palette.text.main} !important`,
        '& > label': {
            color: `${theme.palette.text.main} !important`,
        },
    },
}));

export default function AddAscent() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <FlexColumn style={{ paddingTop: '10%' }}>
            <ExpansionPanel
                style={{ backgroundColor: theme.palette.secondary.main }}
            >
                <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.addButton} variant="h2">
                        Add Ascent
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ justifyContent: 'center' }}>
                    <div className={classes.formCol}>
                        <AddAscentForm />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </FlexColumn>
    );
}
