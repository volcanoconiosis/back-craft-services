'use strict';

process.env.SECRET = "toes";

const supertest = require('supertest');
const {app} = require('../src/server');
const { db } = require('../src/auth/models/index');

const mockRequest = supertest(app);

beforeAll(async () => {
    await db.sync();
    
});

let users={
    worker: { 
        username: "worker2845",
        firstName: "worker",
        profilePicture:"ss",
        lastName:"worker",
        password: 'worker',
        email: 'worker28441@worker.com',
        phone: '0789',
        location: 'zqq',
        store: ' ',
        workType: ' ' ,
        role:'worker' 
    }
}


describe('worker routes ', () => {

    Object.keys(users).forEach(userType => {
  
      describe(`${userType} users`, () => {
  
        it('can create admin', async () => {
  
          const response = await mockRequest.post('/signup').send(users[userType]);
          const userObject = response.body;
  
          expect(response.status).toBe(201);
          expect(userObject.token).toBeDefined();
          expect(userObject.user.id).toBeDefined();
          expect(userObject.user.username).toEqual(users[userType].username)
          
        });
  
        it('can signin with basic', async () => {
  
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const userObject = response.body;
          expect(response.status).toBe(200);
          expect(userObject.token).toBeDefined();
          expect(userObject.user.id).toBeDefined();
          expect(userObject.user.username).toEqual(users[userType].username)
          
        });
  
        it('can signin with bearer', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .get('/getCurrentUser')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });

        it('get worker data ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .get('/worker')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('get current worker data ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .get('/getCurrentWorker')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('get worker For Client by id', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .get('/workerForClient/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('post worker data', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('update any data for worker in general', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .put('/worker/updateany/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the favoirte worker ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/fav/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('post the favoirte worker ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/fav/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the favoirte image ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/favimg/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the favoirte image ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/favimg/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the recently ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/recently/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the recently ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/recently/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the notification ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/notification/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the notification ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/notification/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the schedulework ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/schedulework/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the schedulework ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/schedulework/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the hiswork ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/hiswork/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the hiswork ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/hiswork/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the offers ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/offers/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the offers ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/offers/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the tools ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/tools/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the tools ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/tools/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the reviews ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/reviews/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the reviews ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/reviews/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the chat ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/chat/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the chat ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/chat/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete the post ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/worker/post/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
        
        it('post the post ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .post('/worker/post/2')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })
  
      });
  
     
  
    });
  
  });