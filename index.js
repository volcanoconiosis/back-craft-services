'use strict';

require('dotenv').config();
const {db}=require('./src/auth/models/index2')
const {start}=require('./src/server');

db.sync().then(()=>{
    start(process.env.PORT||8000);
});