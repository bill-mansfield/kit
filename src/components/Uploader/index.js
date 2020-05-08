import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../../services/Firebase';
import FlexRow from '../layouts/flex-row';
import FlexColumn from '../layouts/flex-column';
import UploaderComponent from '../Uploader/uploader';
import Navbar from '../Nav/navbar';

const useStyles = makeStyles(theme => ({}));

export default function Uploader(props) {
    const classes = useStyles();
    const [quote, setQuote] = useState('');

    useEffect(() => {
        if (!Firebase.getCurrentUsername()) {
            // not logged in
            alert('Please login first');
            props.history.replace('/login');
        }
    }, [quote]);

    return (
        <>
            <Navbar />
            <FlexColumn
                style={{
                    justifyContent: 'center',
                    height: '91vh',
                }}
            >
                <FlexRow>
                    <FlexColumn>
                        <UploaderComponent awaitingUpload />
                    </FlexColumn>
                </FlexRow>
            </FlexColumn>
        </>
    );
}
