import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import firebase from '../../services/firebase';
import 'react-dropzone-uploader/dist/styles.css';

const useStyles = makeStyles((theme) => ({
    uploader: {
        backgroundColor: theme.palette.secondary.light,
    },
}));

export default function Uploader(props) {
    const classes = useStyles();
    const children = props;

    // function writeJsonString(json) {
    //     firebase.database().ref('jsonString/').set({
    //     jsonString: json
    //     });
    // }

    // var putFile = file;
    // Papa.parse(file, {
    //     complete: function(results) {
    //     writeJsonString(JSON.stringify(results));
    //     console.log(results);
    //     }
    // });

    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' };
    };

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        console.log(status, meta, file);
    };

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files) => {
        console.log(files.map((f) => f.meta));
    };

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
        />
    );
}
