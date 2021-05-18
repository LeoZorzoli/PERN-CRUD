module.exports = app => {
    const turns = require('../controllers/turn.controller');

    var router = require('express').Router();

    router.post('/', turns.create);
    router.get("/", turns.findAll);
    router.delete("/:id", turns.delete);

    app.use('/api/turns', router);
};