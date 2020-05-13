import React, { useEffect } from 'react';
import Firebase from '../../services/Firebase';
import FlexRow from '../layouts/flex-row';
import FlexColumn from '../layouts/flex-column';
import UploaderComponent from '../Uploader/uploader';
import Navbar from '../Nav/navbar';

export default function Uploader(props) {
    useEffect(() => {
        if (!Firebase.getCurrentUsername()) {
            // not logged in
            alert('Please login first');
            props.history.replace('/login');
        }
    }, [props.history]);

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
