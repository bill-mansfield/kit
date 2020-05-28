import React, { useState, useEffect } from 'react';
import {
    Typography,
    Button,
    FormControl,
    Input,
    InputLabel,
    CircularProgress,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { KeyboardDatePicker } from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FlexRow from '../../layouts/flex-row';
import FlexColumn from '../../layouts/flex-column';
import Ascents from '../../../models/Ascents';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

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
}));

export default function AddAscent() {
    const classes = useStyles();
    const theme = useTheme();

    const [climbName, setClimbName] = useState('');
    const [ascentType, setAscentType] = useState('');
    const [grade, setGrade] = useState('');
    const [height, setHeight] = useState('');
    const [when, setWhen] = useState(new dayjs());
    const [cragName, setCragName] = useState('');

    const handleDateChange = (date) => {
        // Target actual date inside date object given from datepicker package
        if (date === null) {
            return;
        } else {
            setWhen(date.$d);
        }
    };

    const handleSubmit = () => {
        let ascentObj = {};
        if (
            climbName === '' ||
            ascentType === '' ||
            grade === '' ||
            height === '' ||
            when === '' ||
            cragName === ''
        ) {
            return;
        }
        setWaiting(true);
        ascentObj.climbName = climbName;
        ascentObj.ascentType = ascentType;
        ascentObj.grade = grade;
        ascentObj.height = height;
        ascentObj.when = dayjs(when).format('YYYY-MM');
        ascentObj.cragName = cragName;
        Ascents.addNewAscent(ascentObj);
    };

    const [waiting, setWaiting] = useState(false);

    return (
        <FlexColumn>
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
                        <form
                            className={classes.form}
                            onSubmit={(e) => e.preventDefault() && false}
                        >
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="climbName">
                                    Climb Name
                                </InputLabel>
                                <Input
                                    id="climbName"
                                    name="climbName"
                                    autoComplete="off"
                                    autoFocus
                                    value={climbName}
                                    onChange={(e) =>
                                        setClimbName(e.target.value)
                                    }
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="ascentType">
                                    Ascent type
                                </InputLabel>
                                <Select
                                    name="ascentType"
                                    id="ascentType"
                                    autoComplete="off"
                                    value={ascentType}
                                    onChange={(e) =>
                                        setAscentType(e.target.value)
                                    }
                                >
                                    <MenuItem value="Onsight">
                                        Onsight
                                    </MenuItem>
                                    <MenuItem value="Flash">Flash</MenuItem>
                                    <MenuItem value="Red point">
                                        Red point
                                    </MenuItem>
                                    <MenuItem value="Tick">Tick</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="grade">Grade</InputLabel>
                                <Input
                                    name="grade"
                                    type="grade"
                                    id="grade"
                                    autoComplete="off"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="height">
                                    Climb height
                                </InputLabel>
                                <Input
                                    name="height"
                                    type="number"
                                    id="height"
                                    autoComplete="off"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <MuiPickersUtilsProvider utils={DayjsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        disableFuture
                                        variant="inline"
                                        label="Ascent date"
                                        id="date-picker-inline"
                                        format="DD/MM/YYYY"
                                        value={when}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="cragName">
                                    What is the name of the crag?
                                </InputLabel>
                                <Input
                                    name="cragName"
                                    type="cragName"
                                    id="cragName"
                                    autoComplete="off"
                                    value={cragName}
                                    onChange={(e) =>
                                        setCragName(e.target.value)
                                    }
                                />
                            </FormControl>
                            {waiting ? (
                                <FlexRow>
                                    <CircularProgress size={20} />
                                </FlexRow>
                            ) : (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="green"
                                    onClick={handleSubmit}
                                    className={classes.submit}
                                >
                                    Submit
                                </Button>
                            )}
                        </form>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </FlexColumn>
    );
}
