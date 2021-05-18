import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, Button } from '@material-ui/core';
import { deleteTurn } from '../reducers/turnsReducer';
import TablePaginationActions from './TablePaginationActions';

const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
});

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const BasicTable = () => {
    const turns = useSelector(state => state.turns);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleDelete = (id) => {
        dispatch(deleteTurn(id));
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} arial-label="Simple data">
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Sex</TableCell>
                        <TableCell align="right">Created</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? turns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : turns
                    ).map((turn) => (
                        <TableRow key={turn.id}>
                            <TableCell component="th" scope="row">
                                {turn.description}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {turn.firstName}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {turn.lastName}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {turn.age}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {turn.sex}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {turn.createdAt}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                <Button variant="contained" color="primary" onClick={() => handleDelete(turn.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={turns.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                 </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default BasicTable;