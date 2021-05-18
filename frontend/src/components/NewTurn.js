import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Button, Grid, Paper, Typography } from '@material-ui/core';
import { createTurn } from '../reducers/turnsReducer';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
    },
}));


const NewTurn = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
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
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <form className={classes.root} autoComplete="off">
                    <Typography variant="h6" gutterBottom>
                        New Turn
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            onChange={handleChange('firstName')} 
                            value={values.firstName} 
                            label="First Name" 
                            fullWidth
                            required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            onChange={handleChange('lastName')} 
                            value={values.lastName} 
                            label="Last Name" 
                            fullWidth
                            required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            onChange={handleChange('description')} 
                            value={values.description} 
                            label="Description" 
                            fullWidth
                            required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>             
                            <TextField 
                                select 
                                label="Select"
                                value={values.sex}
                                onChange={handleChange('sex')}
                                helperText="Please select your sex"
                                fullWidth
                                required
                            >
                                <MenuItem key="Male" value="Male">
                                    Male
                                </MenuItem>
                                <MenuItem key="Female" value="Female">
                                    Female
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            onChange={handleChange('age')} 
                            value={values.age} 
                            label="Age" 
                            fullWidth
                            required
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handleNewTurn}
                      className={classes.button}
                    >
                        Send
                    </Button>
                    </div>
                </form>
            </Paper>
        </main>
    )
}

export default NewTurn