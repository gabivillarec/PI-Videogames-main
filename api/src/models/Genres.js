const {DataTypes} = require('sequelize');

const Genres = (sequelize)=>{

sequelize.define('genres',{

    id : {   
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false,
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    }

  }, {timestamp : false});
};

module.exports = Genres;