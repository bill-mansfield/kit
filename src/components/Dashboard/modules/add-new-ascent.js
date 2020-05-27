import React, { useState, useEffect } from 'react';
import {
    Typography,
    Button,
    FormControl,
    Input,
    InputLabel,
    CircularProgress,
} from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
    heck: {
        color: 'h',
    },
}));

export default function AddAscent() {
    const classes = useStyles();
    const [climbName, setClimbName] = useState();
    const [ascentType, setAscentType] = useState();
    const [grade, setGrade] = useState();
    const [height, setHeight] = useState();
    const [when, setWhen] = useState(new dayjs().format('DD/MM/YYYY'));
    const [cragName, setCragName] = useState();

    const handleDateChange = (date) => {
        setWhen(date);
    };

    const handleSubmit = () => {
        let ascentObj = {};
        ascentObj.climbName = climbName;
        ascentObj.ascentType = ascentType;
        ascentObj.grade = grade;
        ascentObj.height = height;
        ascentObj.when = when;
        ascentObj.cragName = cragName;
        console.log(ascentObj);
        Ascents.addNewAscent(ascentObj);
    };

    console.log(new dayjs().format('DD/MM/YYYY'));
    const [waiting, setWaiting] = useState(false);

    return (
        <FlexColumn style={{ width: '60%' }}>
            <Typography variant="h2">Add Ascent</Typography>
            <form
                className={classes.form}
                onSubmit={(e) => e.preventDefault() && false}
            >
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="climbName">Climb Name</InputLabel>
                    <Input
                        id="climbName"
                        name="climbName"
                        autoComplete="off"
                        autoFocus
                        value={climbName}
                        onChange={(e) => setClimbName(e.target.value)}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="ascentType">Ascent type</InputLabel>
                    <Select
                        name="ascentType"
                        type=""
                        id="ascentType"
                        autoComplete="off"
                        value={ascentType}
                        onChange={(e) => setAscentType(e.target.value)}
                    >
                        <MenuItem value="Onsight">Onsight</MenuItem>
                        <MenuItem value="Flash">Flash</MenuItem>
                        <MenuItem value="Red point">Red point</MenuItem>
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
                    <InputLabel htmlFor="height">Climb height</InputLabel>
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
                            variant="inline"
                            label="Ascent date"
                            margin="normal"
                            id="date-picker-inline"
                            value={when}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="cragName">
                        What is the name of the crag?
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
                        <CircularProgress size={20} />
                    </FlexRow>
                ) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                )}
            </form>
        </FlexColumn>
    );
}
