module.exports = (sequelize, Sequelize) => {
    const Turn = sequelize.define('turn', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });

    return Turn;
};