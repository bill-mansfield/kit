import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../services/firebase';
import FlexRow from '../layouts/flex-row';
import FlexColumn from '../layouts/flex-column';
import UploaderComponent from '../Uploader/uploader';
import Navbar from '../Nav/navbar';

const useStyles = makeStyles((theme) => ({}));

export default function Uploader(props) {
    const classes = useStyles();
    const [quote, setQuote] = useState('');

    useEffect(() => {
        if (!firebase.getCurrentUsername()) {
            // not logged in
            alert('Please login first');
            props.history.replace('/login');
        } else {
            firebase.getCurrentUserQuote().then(setQuote);
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

};
