import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, turns.length - page * rowsPerPage);

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