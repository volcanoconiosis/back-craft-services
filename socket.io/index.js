const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const uuid = require('uuid').v4;

const msgQueue= {
    chores : {}
}

let target;
let target2;
const messanger = io.of('/messanger'); //namespace
messanger.on('connection', socket=> {
    console.log("CONNECTED", socket.id)
    // when the parent adds a new chore
    socket.on('new_chore', payload=> {
        const id = uuid();
        msgQueue.chores[id] = payload;
         target= msgQueue.chores[id][2]
        socket.emit('added', payload); // telling the parent a task was added
        messanger.emit('chore', {id: id, payload: msgQueue.chores[id][0] })
        let result ={
            event:'chore',
            payload:payload

        }

        console.log(result)
        

    });

    socket.on('sendWorkerID',(workerID,clientID)=>{
        if (workerID==target) {
            socket.on('get_all', ()=> {
                Object.keys(msgQueue.chores).forEach(id=> {
                    if(msgQueue.chores[id].includes(workerID) && msgQueue.chores[id].includes(clientID)){
                        socket.emit('chore', {id: id, payload: msgQueue.chores[id][0] })
                        // let result1= payload
                        // console.log('Event', result1)
                    }  
                });
            });
           }
    })


    socket.on('responsMsg', payload=> {
        const id = uuid();
        msgQueue.chores[id] = payload;
         target2= msgQueue.chores[id][2]
         socket.emit('added_2', payload); // telling the parent a task was added
         messanger.emit('chore_2', {id: id, payload: msgQueue.chores[id][0] })
         let result=payload
         console.log(result);

    });
   
    socket.on('sendClientID',(clientID,workerID)=>{

        if (clientID==target2) {
            socket.on('get_all_2', ()=> {

                Object.keys(msgQueue.chores).forEach(id=> {
                    if(msgQueue.chores[id].includes(clientID) && msgQueue.chores[id].includes(workerID)){
                        socket.emit('chore_2', {id: id, payload: msgQueue.chores[id][0] })
                    }
                });
            });
        }
    })
/*if we want to delete the msgs from the queue But it's optional and depend on the sinario so you need to check it*/
    // socket.on('received', (msg,workerID) => {
    //     console.log('workerid--=>..',workerID);
        

    //     Object.keys(msgQueue.chores).forEach(id=> {
    //         console.log(id.includes(workerID));
    //         if (id.includes(workerID)) {
    //             delete msgQueue.chores[msg.id];
    //         }
    //     });
    //     console.log("received on queue will remove it ...")
    //     // he child confirmed receiving , remove from queue
        
    //     console.log("after delete msgQueue @@@@@@@@@@ ", msgQueue)
    // })
});


http.listen(3000, function() {
    console.log('listening on port 3000')
  })



