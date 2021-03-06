import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import FlexRow from '../../layouts/flex-row';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Ascents from '../../../models/Ascents';
import { Input } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Goals from '../../../models/Goals';
import GoalForm from './goalForm';

const useStyles = makeStyles((theme) => ({
    goalPill: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
    },
    goalRow: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },
    },
    goalPanel: {
        width: '100%',
    },
    formCol: {
        display: 'flex',
        width: '90%',
    },
    addButton: {
        padding: '10px 20px 10px 20px',
        backgroundColor: theme.palette.accent.blue,
        border: `2px solid ${theme.palette.accent.blue}`,
        borderRadius: '25px',
    },
    formLabel: {
        color: `${theme.palette.text.main} !important`,
        '& > label': {
            color: `${theme.palette.text.main} !important`,
        },
    },
    goalTitle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export default function Goal() {
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
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setData(await Goals.getAllGoals());
        };
        fetchData();
    }, []);

    return (
        <div className={classes.goalPanel}>
            {data !== '' ? (
                <div className={classes.goalRow}>
                    {data.map((goal) => (
                        <>
                            <div className={classes.goalPill}>
                                <ExpansionPanel
                                    style={{
                                        backgroundColor:
                                            theme.palette.secondary.main,
                                    }}
                                >
                                    <ExpansionPanelSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <div className={classes.goalTitle}>
                                            <Typography variant="h3">
                                                {goal.ascentType} a{' '}
                                                {goal.grade}
                                            </Typography>
                                            <Typography
                                                className={classes.addButton}
                                                variant="h2"
                                            >
                                                Done
                                            </Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        style={{ justifyContent: 'center' }}
                                    >
                                        <div className={classes.formCol}>
                                            <form
                                                className={classes.form}
                                                onSubmit={(e) =>
                                                    e.preventDefault() && false
                                                }
                                            >
                                                <FormControl
                                                    margin="normal"
                                                    required
                                                    style={{ width: '50%' }}
                                                >
                                                    <InputLabel
                                                        className={
                                                            classes.formLabel
                                                        }
                                                        htmlFor="climbName"
                                                    >
                                                        Climb Name
                                                    </InputLabel>
                                                    <Input
                                                        id="climbName"
                                                        name="climbName"
                                                        autoComplete="off"
                                                        autoFocus
                                                        value={climbName}
                                                        onChange={(e) =>
                                                            setClimbName(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl
                                                    margin="normal"
                                                    required
                                                    style={{ width: '50%' }}
                                                >
                                                    <InputLabel
                                                        className={
                                                            classes.formLabel
                                                        }
                                                        htmlFor="ascentType"
                                                    >
                                                        Ascent type
                                                    </InputLabel>
                                                    <Select
                                                        name="ascentType"
                                                        id="ascentType"
                                                        autoComplete="off"
                                                        value={ascentType}
                                                        onChange={(e) =>
                                                            setAscentType(
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        <MenuItem value="Onsight">
                                                            Onsight
                                                        </MenuItem>
                                                        <MenuItem value="Flash">
                                                            Flash
                                                        </MenuItem>
                                                        <MenuItem value="Red point">
                                                            Red point
                                                        </MenuItem>
                                                        <MenuItem value="Tick">
                                                            Tick
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl
                                                    margin="normal"
                                                    required
                                                    style={{ width: '50%' }}
                                                >
                                                    <InputLabel
                                                        className={
                                                            classes.formLabel
                                                        }
                                                        htmlFor="grade"
                                                    >
                                                        Grade
                                                    </InputLabel>
                                                    <Input
                                                        name="grade"
                                                        type="grade"
                                                        id="grade"
                                                        autoComplete="off"
                                                        value={grade}
                                                        onChange={(e) =>
                                                            setGrade(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl
                                                    margin="normal"
                                                    required
                                                    style={{ width: '50%' }}
                                                >
                                                    <InputLabel
                                                        className={
                                                            classes.formLabel
                                                        }
                                                        htmlFor="height"
                                                    >
                                                        Climb height
                                                    </InputLabel>
                                                    <Input
                                                        name="height"
                                                        type="number"
                                                        id="height"
                                                        autoComplete="off"
                                                        value={height}
                                                        onChange={(e) =>
                                                            setHeight(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl
                                                    margin="normal"
                                                    required
                                                    style={{ width: '50%' }}
                                                >
                                                    <MuiPickersUtilsProvider
                                                        utils={DayjsUtils}
                                                    >
                                                        <KeyboardDatePicker
                                                            disableToolbar
                                                            disableFuture
                                                            className={
                                                                classes.formLabel
                                                            }
                                                            variant="inline"
                                                            label="Ascent date"
                                                            id="date-picker-inline"
                                                            format="DD/MM/YYYY"
                                                            value={when}
                                                            onChange={
                                                                handleDateChange
                                                            }
                                                            KeyboardButtonProps={{
                                                                'aria-label':
                                                                    'change date',
                                                            }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </FormControl>
                                                <FormControl
                                                    margin="normal"
                                                    required
                                                    style={{ width: '50%' }}
                                                >
                                                    <InputLabel
                                                        className={
                                                            classes.formLabel
                                                        }
                                                        htmlFor="cragName"
                                                    >
                                                        What is the name of the
                                                        crag?
                                                    </InputLabel>
                                                    <Input
                                                        name="cragName"
                                                        type="cragName"
                                                        id="cragName"
                                                        autoComplete="off"
                                                        value={cragName}
                                                        onChange={(e) =>
                                                            setCragName(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                {waiting ? (
                                                    <FlexRow>
                                                        <CircularProgress
                                                            size={20}
                                                        />
                                                    </FlexRow>
                                                ) : (
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={handleSubmit}
                                                        className={
                                                            classes.submit
                                                        }
                                                    >
                                                        Submit
                                                    </Button>
                                                )}
                                            </form>
                                        </div>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                        </>
                    ))}
                    <GoalForm />
                </div>
            ) : (
                <GoalForm />
            )}
        </div>
    );
}
