import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Firebase from '../../../services/Firebase';
import { useTheme } from '@material-ui/core/styles';
import FlexRow from '../../layouts/flex-row';
import FlexColumn from '../../layouts/flex-column';
import Stats from '../../../models/Stats';
import NoData from './no-data';

export default function NameTitle() {
    const theme = useTheme();
    const [data, setData] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Stats.getSuccessfulAscents());
        };
        fetchData();
    }, []);

    const ifNoAscents = () => {
        if (data === 0) {
            return <NoData />;
        } else {
            return;
        }
    };

    return (
        <FlexRow
            style={{
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                justifyContent: 'flex-start',
                marginTop: '15vh',
                width: '90%',
            }}
        >
            <FlexColumn
                style={{
                    alignItems: 'flex-start',
                    width: '100%',
                }}
            >
                <Typography variant="h1">
                    {Firebase.getCurrentUsername()} - Rock climber
                </Typography>
                {ifNoAscents()}
            </FlexColumn>
        </FlexRow>
    );
}
