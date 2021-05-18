import axios from 'axios';
const baseUrl = '/api/turns';

const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
}

const createTurn = async (turn) => {
    const request = await axios.post(baseUrl, turn);
    return request.data;
};

const deleteTurn = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`);
    return request.data;
}

const service = {
    getAll, 
    createTurn, 
    deleteTurn
}

export default service;

