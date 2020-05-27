import 'react-dropzone-uploader/dist/styles.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Dropzone from 'react-dropzone-uploader';
import Papa from 'papaparse';
import Ascents from '../../models/Ascents';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    dropZoneWrapper: {
        backgroundColor: theme.palette.secondary.dark,
        overflow: 'hidden',
        border: 'dashed 5px #59BDFF',
    },
    previewImage: {
        color: theme.palette.primary.text,
    },
    inputLabelWithFiles: {
        display: 'none',
        color: theme.palette.primary.text,
    },
    dropzoneReject: {
        borderColor: theme.palette.danger.main,
        backgroundColor: theme.palette.danger.light,
    },
    dropzoneActive: {
        borderColor: theme.palette.success.main,
        backgroundColor: theme.palette.success.light,
    },
    preview: {
        padding: '50px 3%',
        borderBottom: 'none',
        '& > span': {
            color: theme.palette.primary.text,
        },
        '& > div > progress': {
            backgroundColor: 'red',
        },
        '& > div > span': {
            backgroundImage: 'none !important',
        },
    },
}));

export default withRouter(function UploaderComponent(props) {
    const classes = useStyles();

    const onUpload = () => {
        props.history.replace('/dashboard');
    };

    const getUploadParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' };
    };

    const storeAscents = (file) => {
        Papa.parse(file, {
            complete: function (parsedResults) {
                Ascents.validateAscentData(parsedResults);
                onUpload();
            },
        });
    };

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === 'rejected_file_type') {
            alert('Bad file type, please upload a .csv file');
        }
        if (status === 'headers_received') {
            storeAscents(file);
        }
    };

    return (
        <>
            <Typography variant="h3">
                Please upload your ascent data in in a .csv below
            </Typography>
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                accept="text/csv"
                inputContent={(files, extra) =>
                    extra.reject ? '.csv files only' : 'Drag Files'
                }
                addClassNames={{
                    dropzone: classes.dropZoneWrapper,
                    previewImage: classes.previewImage,
                    inputLabelWithFiles: classes.inputLabelWithFiles,
                    dropzoneReject: classes.dropzoneReject,
                    dropzoneActive: classes.dropzoneActive,
                    preview: classes.preview,
                }}
                styles={{
                    inputLabel: (files, extra) =>
                        extra.reject ? { color: 'red' } : { color: 'white' },
                }}
            />
        </>
    );
});
