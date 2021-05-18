import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Button } from '@material-ui/core';
import { createTurn } from '../reducers/turnsReducer';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },

      marginBottom: "100px"
    },
}));


const NewTurn = () => {
    const dispatch = useDispatch();
    const clasess = useStyles();
    const [values, setValues] = useState({
        sex: '',
        description: '',
        firstName: '',
        lastName: '',
        age: ''
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const handleNewTurn = (e) => {
        e.preventDefault();

        const turn = {
            description: values.description,
            firstName: values.firstName,
            lastName: values.lastName,
            age: values.age,
            sex: values.sex,
        };

        dispatch(createTurn(turn))
    }

    return (
        <form className={clasess.root} autoComplete="off">
            <TextField onChange={handleChange('description')} value={values.description} label="Description" />
            <TextField onChange={handleChange('firstName')} value={values.firstName} label="First Name" />
            <TextField onChange={handleChange('lastName')} value={values.lastName} label="Last Name" />
            <TextField 
                select 
                label="Select"
                value={values.sex}
                onChange={handleChange('sex')}
                helperText="Please select your sex"
            >
                <MenuItem key="Male" value="Male">
                    Male
                </MenuItem>
                <MenuItem key="Female" value="Female">
                    Female
                </MenuItem>
            </TextField>
            <TextField onChange={handleChange('age')} value={values.age} label="Age" />
            <Button variant="contained" color="primary" onClick={handleNewTurn}>
                Send
            </Button>
        </form>
    )
}

export default NewTurn