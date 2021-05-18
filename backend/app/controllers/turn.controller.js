const db = require('../models');
const Turn = db.turns;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.description) {
        res.status(400).send({
            message: 'Content can not be empty'
        });
        
        return;
    }

    const turn = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sex: req.body.sex,
        age: req.body.age,
        description: req.body.description
    };

    Turn.create(turn)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error ocurred while creating the Turn'
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Turn.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving turns.'
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Turn.destroy({
        where: { id: id }
    })
        .then(num =>{
            if(num == 1) {
                res.send({
                    message: 'Turn was deleted succesfully'
                });
            } else {
                res.send({
                    message: `Cannot delete Turn with id=${id}. Maybe Turn was not found`
                });
            }   
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete turn with id=' + id
            });
        });
};