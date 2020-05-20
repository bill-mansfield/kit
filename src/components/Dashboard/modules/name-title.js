import React from 'react';
import { Typography } from '@material-ui/core';
import Firebase from '../../../services/Firebase';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FlexRow from '../../layouts/flex-row';
import FlexColumn from '../../layouts/flex-column';

export default function NameTitle() {
    const theme = useTheme();

    return (
        <FlexRow
            style={{
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                justifyContent: 'flex-start',
            }}
        >
            <FlexColumn>
                <Typography variant="h1">
                    {Firebase.getCurrentUsername()} - Rock climber
                </Typography>
            </FlexColumn>
        </FlexRow>
    );
}
