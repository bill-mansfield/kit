import React, { useState, useEffect } from 'react';
import Firebase from '../../../services/Firebase';
import { Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../../models/Table';
import { useTheme } from '@material-ui/core/styles';
import * as icons from '../../../assets/icons';
import Goals from '../../../models/Goals';
import Select from '@material-ui/core/Select';
import Utils from '../../../utils/Utils';

const useStyles = makeStyles((theme) => ({}));

export default function GoalTable(props) {
    const theme = useTheme();
    const tableIcons = icons.tableIcons;

    const [columns, setColumns] = React.useState([
        {
            title: 'Ascent Type',
            field: 'ascentType',
            editComponent: (props) => (
                <Select
                    name="ascentType"
                    id="ascentType"
                    autoComplete="off"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                >
                    {Utils.createTickTypeSelects()}
                </Select>
            ),
        },
        { title: 'Grade', field: 'grade' },
        { title: 'Name', field: 'climbName' },
    ]);

    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setData(await Goals.getGoals());
        };
        fetchData();
    }, []);

    return (
        <MaterialTable
            style={{
                width: '80%',
                backgroundColor: theme.palette.primary.main,
            }}
            title="Your Goals"
            icons={tableIcons}
            columns={columns}
            data={data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setData([...data, newData]);

                            //Write new goal to DB
                            Goals.addGoal(newData);
                            resolve();
                        }, 1000);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;

                            //Update DB with updated goal
                            Goals.updateGoal(newData);
                            setData([...dataUpdate]);

                            resolve();
                        }, 1000);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);

                            //Delete goal from DB
                            Goals.deleteGoal(oldData);
                            setData([...dataDelete]);

                            resolve();
                        }, 1000);
                    }),
            }}
        />
    );
}
