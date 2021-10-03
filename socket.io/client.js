'use strict';

const client = require('socket.io-client');
const host = "http://localhost:8000/messanger";
const socket = client.connect(host);
let clientID ='1';
let workerID ='2';
/*-----------------------------------------------------------------*/
const value = process.argv[2];
const myID = process.argv[3];
const hisID = process.argv[4];

let msgdata=[value,myID,hisID]
socket.emit('new_chore', msgdata);

socket.on('added', payload=> {
    console.log("Thank you for adding : ", payload , " to the queue");
    // socket.disconnect();
});
/*-----------------------------------------------------------------*/
socket.emit('sendClientID', clientID,workerID)
// pulling msgs 
socket.emit('get_all_2');

socket.on('chore_2', msg=> {
    console.log("client got this msg: ", msg)
    // socket.emit('received', msg, workerID)
})
