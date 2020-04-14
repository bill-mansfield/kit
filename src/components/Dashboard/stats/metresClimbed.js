import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

export default function metresClimbed() {
    const classes = useStyles();

    const ascentData = () => {
        return firebase.getDataDownloadURL();
    }
    console.log(ascentData());

    return (
        <Typography variant="h3">
            Metres climbed: 
        </Typography>
    )
}
