const mysql = require('mysql2');
const config = require('../config/dbconfig');
const Sequelize = require('sequelize');

const connection = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });  
  
connection
  .authenticate()
  .then(() => {
    console.log('sequelize connection has been established');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

let User = require('../models/Users')(connection, Sequelize);
let Event = require('../models/Events')(connection, Sequelize);
console.log('EVENTTTTTttttttttt', Event);
  // force: true will drop the table if it already exists
  // Event.sync({force: true}).then(() => {
  //   console.log('SYNC IN EVENTS-----------------------')
  //   // Table created
  //   return Event.create({
  //     venueId: 123456,
  //     userId: '1',
  //     name: 'Festivus',
  //     description: 'for the rest of us',
  //     zip: 23456,
  //     city: "Dallas",
  //     state: "TX",
  //     photo: 'pic.jpeg',
  //     minCommits: 10,
  //     commits: 6
  //   });
  // });

// // // force: true will drop the table if it already exists
// User.sync({force: false}).then(() => {
//   console.log('SYNCCCCCCCCCCCCC________')
//   // Table created
//   return User.create({
//     googleId: 123456,
//     isBand: '1',
//     name: 'FunkMonkey',
//     description: 'off the vine',
//     email: 'monkey123@gmail.com',
//     age: 22,
//     zip: 23456,
//     city: "Dallas",
//     state: "TX",
//     photo: 'pic.jpeg',
//     status: 'cool'
//   });
// });


// //Venues
// const Venue = connection.define('Venue', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   },
//   description: {
//     type: Sequelize.TEXT,
//     defaultValue: ''
//   },
//   zip: {
//     type: Sequelize.INTEGER,
//     defaultValue: null
//   },
//   city: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   },
//   state: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   },
//   photo: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   },
//   location: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   }
// });


// const checkUser = function(id, callback){     
//      let sql = `SELECT google_id FROM Users WHERE google_id = "${id}"`;
//      connection.query(sql, (err, data) => {
//          if(err){
//              callback(err, null)
//             } else {
//                 callback(null, data);
//             }
//         });
// }
    
// const newUser = function(profile, callback){
//         let sql = `INSERT INTO Users(google_id, name, email, photo) VALUES("${profile.id}", "${profile.displayName}", "${profile.emails[0].value}", "${profile.photos[0].value}")`;
//         connection.query(sql, (err, data) => {
//             if(err){
//                 callback(err, null);
//             } else {
//                 callback(null, data);
//             }
//         });
// }

// const getUserInfo = function(id, callback){
//     let sql =  `SELECT * FROM Users WHERE google_id = "${id}"`;
//     connection.query(sql, (err, data) => {
//         if(err){
//             callback(err, null)
//         } else {
//             callback(null, data)
//         }
//     })
// }
    
    
// exports.getUserInfo = getUserInfo;
// exports.checkUser = checkUser;
// exports.newUser = newUser;
// exports.connection = connection;
   