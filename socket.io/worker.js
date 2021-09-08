'use strict';

const client = require('socket.io-client');
const host = "http://localhost:3000/messanger";
const socket = client.connect(host);
let workerID ='2';
let clientID ='1';
/*------------------------------------------------------------*/
const value = process.argv[2];
const myID = process.argv[3];
const hisID = process.argv[4];

let msgdata=[value,myID,hisID]
// socket.on('worker_msg', message=>{
//     console.log()

// })

socket.emit('responsMsg', msgdata);

socket.on('added_2', payload=> {
    console.log("Thank you for adding : ", payload , " to the queue");
    // socket.disconnect();
});
/*------------------------------------------------------------*/
socket.emit('sendWorkerID', workerID,clientID)
// pulling msgs 
socket.emit('get_all');

socket.on('chore', msg=> {
    console.log("worker got this msg: ", msg)
    // socket.emit('received', msg, workerID)
})
