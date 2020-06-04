import React, { useState } from 'react';
import {
    Button,
    FormControl,
    Input,
    InputLabel,
    CircularProgress,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Utils from '../../../utils/Utils';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import FlexRow from '../../layouts/flex-row';
import Ascents from '../../../models/Ascents';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& > div': {
            width: '90%',
            [theme.breakpoints.up('md')]: {
                width: '60%',
            },
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
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

export default function AddAscentForm() {
    const classes = useStyles();

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
        ascentObj.climbName = climbName;
        ascentObj.ascentType = ascentType;
        ascentObj.grade = grade;
        ascentObj.height = height;
        ascentObj.when = dayjs(when).format('YYYY-MM');
        ascentObj.cragName = cragName;
        Ascents.addNewAscent(ascentObj);

        // fake loading
        setWaiting(true);
        setTimeout(function () {
            setWaiting(false);
        }, 1000);
    };

    const [waiting, setWaiting] = useState(false);

    return (
        <form
            className={classes.form}
            onSubmit={(e) => e.preventDefault() && false}
        >
            <FormControl margin="normal" required>
                <InputLabel className={classes.formLabel} htmlFor="climbName">
                    Climb Name
                </InputLabel>
                <Input
                    id="climbName"
                    name="climbName"
                    autoComplete="off"
                    autoFocus
                    value={climbName}
                    onChange={(e) => setClimbName(e.target.value)}
                />
            </FormControl>
            <FormControl margin="normal" required>
                <InputLabel className={classes.formLabel} htmlFor="ascentType">
                    Ascent type
                </InputLabel>
                <Select
                    name="ascentType"
                    id="ascentType"
                    autoComplete="off"
                    value={ascentType}
                    onChange={(e) => setAscentType(e.target.value)}
                >
                    {Utils.createTickTypeSelects()}
                </Select>
            </FormControl>
            <FormControl margin="normal" required>
                <InputLabel className={classes.formLabel} htmlFor="grade">
                    Grade
                </InputLabel>
                <Input
                    name="grade"
                    type="grade"
                    id="grade"
                    autoComplete="off"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                />
            </FormControl>
            <FormControl margin="normal" required>
                <InputLabel className={classes.formLabel} htmlFor="height">
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
            <FormControl margin="normal" required>
                <MuiPickersUtilsProvider utils={DayjsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        disableFuture
                        className={classes.formLabel}
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
            <FormControl margin="normal" required>
                <InputLabel className={classes.formLabel} htmlFor="cragName">
                    Crag name?
                </InputLabel>
                <Input
                    name="cragName"
                    type="cragName"
                    id="cragName"
                    autoComplete="off"
                    value={cragName}
                    onChange={(e) => setCragName(e.target.value)}
                />
            </FormControl>
            {waiting ? (
                <FlexRow>
                    <CircularProgress
                        style={{
                            color: 'green',
                            marginBottom: '10px',
                            marginTop: '10px',
                        }}
                        size={30}
                    />
                </FlexRow>
            ) : (
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    className={classes.submit}
                >
                    Submit
                </Button>
            )}
        </form>
    );
}
