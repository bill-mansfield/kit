import React, { useState, useEffect } from 'react';
import Firebase from '../../services/Firebase';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../models/Table';
import { useTheme } from '@material-ui/core/styles';
import * as icons from '../../assets/icons';
import Ascents from '../../models/Ascents';

const useStyles = makeStyles((theme) => ({}));

export default function AscentsTable(props) {
    const theme = useTheme();
    const tableIcons = icons.tableIcons;

    const [columns, setColumns] = React.useState([
        { title: 'Name', field: 'climbName' },
        { title: 'Ascent Type', field: 'ascentType' },
        { title: 'Grade', field: 'grade' },
        { title: 'Crag', field: 'cragName' },
        { title: 'Height', field: 'height' },
        { title: 'Date', field: 'when' },
    ]);

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
            columns={columns}
            data={data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setData([...data, newData]);
                            Ascents.addNewAscent(newData);
                            resolve();
                        }, 1000);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            console.log(newData);
                            Table.updateAscent(newData);
                            setData([...dataUpdate]);

                            resolve();
                        }, 1000);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setColumns((prevState) => {
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
