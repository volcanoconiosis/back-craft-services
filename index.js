'use strict';

require('dotenv').config();
// const {db}=require('./src/auth/models/index')
const {start}=require('./src/server');

start(process.env.PORT||8000);
// db.sync().then(()=>{
// });