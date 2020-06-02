import React, { useState, useEffect } from 'react';
import Firebase from '../../services/Firebase';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../models/Ascents-table';
import { useTheme } from '@material-ui/core/styles';
import * as icons from '../../assets/icons';

const useStyles = makeStyles((theme) => ({}));

export default function AscentsTable(props) {
    const theme = useTheme();
    const tableIcons = icons.tableIcons;
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Ascent Type', field: 'ascentType' },
            { title: 'Grade', field: 'grade' },
            { title: 'Crag', field: 'cragName' },
            { title: 'Height', field: 'height' },
        ],
    });

    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setData(await Table.getTableAscents());
        };
        fetchData();
    }, []);

    return (
        <MaterialTable
            style={{ backgroundColor: theme.palette.primary.main }}
            title="Your Ascents"
            icons={tableIcons}
            columns={state.columns}
            data={data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}
