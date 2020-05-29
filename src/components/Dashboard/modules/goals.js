import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import FlexRow from '../../layouts/flex-row';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const useStyles = makeStyles((theme) => ({
    formControl: {},
    formSelect: {
        [theme.breakpoints.up('md')]: {},
    },
    goalForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        width: '100%',
        justifyContent: 'space-between',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    },
    letterSpacing: {
        paddingRight: '5px',
        paddingLeft: '5px',
    },
    addButton: {
        padding: '10px 20px 10px 20px',
        backgroundColor: theme.palette.accent.green,
        border: `2px solid ${theme.palette.accent.green}`,
        borderRadius: '25px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    goalPanel: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
    },
    formLabel: {
        color: `${theme.palette.text.main} !important`,
        '& > label': {
            color: `${theme.palette.text.main} !important`,
        },
    },
}));

export default function Goals() {
    const classes = useStyles();
    const theme = useTheme();

    const [waiting, setWaiting] = useState(false);
    const [ascentType, setAscentType] = useState('Onsight');
    const [grade, setGrade] = useState('16');

    const handleSubmit = () => {
        setWaiting(true);
        let goalObj = {};
        goalObj.ascentType = ascentType;
        goalObj.grade = grade;
        console.log(goalObj);
    };

    return (
        <ExpansionPanel className={classes.goalPanel}>
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.addButton} variant="h2">
                    Add Goal
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                style={{ flexDirection: 'column', justifyContent: 'center' }}
            >
                <div className={classes.goalForm}>
                    <Typography className={classes.letterSpacing}>
                        I will
                    </Typography>
                    <FormControl required className={classes.formControl}>
                        <InputLabel
                            htmlFor="ascentType"
                            className={classes.formLabel}
                        >
                            Ascent type
                        </InputLabel>
                        <Select
                            native
                            className={classes.formSelect}
                            value={ascentType}
                            onChange={(e) => setAscentType(e.target.value)}
                            inputProps={{
                                name: 'ascentType',
                                id: 'ascentType',
                            }}
                        >
                            <option value={'Onsight'}>Onsight</option>
                            <option value={'Flash'}>Flash</option>
                            <option value={'Red point'}>Red Point</option>
                        </Select>
                    </FormControl>
                    <Typography className={classes.letterSpacing}>A</Typography>
                    <FormControl required className={classes.formControl}>
                        <InputLabel
                            className={classes.formLabel}
                            htmlFor="grade"
                        >
                            Grade
                        </InputLabel>
                        <Select
                            native
                            className={classes.formSelect}
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        >
                            <option value={16}>16</option>
                            <option value={17}>17</option>
                            <option value={18}>18</option>
                            <option value={19}>19</option>
                            <option value={20}>20</option>
                            <option value={21}>21</option>
                            <option value={22}>22</option>
                            <option value={23}>23</option>
                            <option value={24}>24</option>
                            <option value={25}>25</option>
                            <option value={26}>26</option>
                            <option value={27}>27</option>
                            <option value={28}>28</option>
                            <option value={29}>29</option>
                            <option value={30}>30</option>
                            <option value={31}>31</option>
                            <option value={32}>32</option>
                            <option value={33}>33</option>
                            <option value={34}>34</option>
                        </Select>
                    </FormControl>
                </div>
                {waiting ? (
                    <FlexRow>
                        <CircularProgress size={20} />
                    </FlexRow>
                ) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                )}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
