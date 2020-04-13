import React, { useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Dropzone from 'react-dropzone-uploader';
import firebase from '../../services/firebase';

const useStyles = makeStyles((theme) => ({
    dropzoneStyles: {
        dropzone: {
            backgroundColor: '#483D4C',
            overflow: 'hidden',
            border: 'dashed 5px #59BDFF',
        },
        previewImage: {
            color: '#fff',
        },
        inputLabelWithFiles: {
            display: 'none',
        },
        dropzoneReject: {
            borderColor: 'red',
            backgroundColor: '#DAA',
        },
    },
}));

export default function Uploader(props) {
    const classes = useStyles();
    const [awaitingUpload, setAwaitingUpload] = useState(true);

    const getUploadParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' };
    };

    const handleChangeStatus = ({ meta, file }, status) => {
        console.log(status, meta, file);

        if (status === 'rejected_file_type') {
            alert('Bad file type, please upload a .csv file');
        }
        if (status === 'headers_received') {
            console.log(file);
            firebase
                .getStorageRef()
                .put(file)
                .then(function () {
                    console.log('Uploaded a file!');
                    setAwaitingUpload(false);
                });
        }
    };

    const toggleUploader = () => {
        return awaitingUpload ? (
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
                    addClassNames={classes.dropzoneStyles}
                    styles={{
                        inputLabel: (files, extra) =>
                            extra.reject
                                ? { color: 'red' }
                                : { color: 'white' },
                    }}
                />
            </>
        ) : (
            <Typography variant="h2">Upload successful</Typography>
        );
    };

    return toggleUploader();
}
