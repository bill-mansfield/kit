import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone-uploader';
import firebase from '../../services/firebase';
import 'react-dropzone-uploader/dist/styles.css';

const useStyles = makeStyles((theme) => ({
    dropzone: {
        display: 'block',
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

    const getUploadParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' };
    };

    // called every time a file's `status` changes

    let successProps = { overflow: 'hidden' };

    const handleChangeStatus = ({ meta, file, remove }, status) => {
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
                });
        }
        if (status === 'done') {
            remove();
        }
        if (status === 'removed') {
            //
        }
    };

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            accept="text/csv"
            inputContent={(files, extra) =>
                extra.reject ? '.csv files only' : 'Drag Files'
            }
            styles={{
                dropzone: { successProps },
                inputLabelWithFiles: { display: 'none' },
                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                inputLabel: (files, extra) =>
                    extra.reject ? { color: 'red' } : {},
            }}
        />
    );
}
