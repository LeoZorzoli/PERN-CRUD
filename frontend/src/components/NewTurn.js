import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Button } from '@material-ui/core';
import { useField } from '../hooks/index';
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
    const [sex, setSex] = useState('');
    const description = useField('text')
    const firstName = useField('text')
    const lastName = useField('text')
    const age = useField('number')

    const handleChange = (e) => {
        e.preventDefault();
        setSex(e.target.value);
    }

    const handleNewTurn = (e) => {
        e.preventDefault();

        const turn = {
            description: description.value,
            firstName: firstName.value,
            lastName: lastName.value,
            age: age.value,
            sex: sex,
        };

        dispatch(createTurn(turn))
    }

    return (
        <form className={clasess.root} autoComplete="off">
            <TextField {...description} label="Description" />
            <TextField {...firstName} label="First Name" />
            <TextField {...lastName} label="Last Name" />
            <TextField 
                select 
                label="Select"
                value={sex}
                onChange={handleChange}
                helperText="Please select your sex"
            >
                <MenuItem key="Male" value="Male">
                    Male
                </MenuItem>
                <MenuItem key="Female" value="Female">
                    Female
                </MenuItem>
            </TextField>
            <TextField {...age} label="Age" />
            <Button variant="contained" color="primary" onClick={handleNewTurn}>
                Send
            </Button>
        </form>
    )
}

export default NewTurn