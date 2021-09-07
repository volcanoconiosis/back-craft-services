'use strict';

process.env.SECRET = "toes";

const supertest = require('supertest');
const {app} = require('../src/server');
const { db } = require('../src/auth/models/index');

const mockRequest = supertest(app);


let users = {
  user: { 
    username: "userTest1245456",
    firstName: "user",
    profilePicture:"ss",
    lastName:"user",
    password: 'user',
    email: 'userTest1244665@user.com',
    phone: '0789',
    location: 'zqq',
    store: ' ',
    workType: ' ' ,
    role:'user' 
  },
};

beforeAll(async () => {
  await db.sync();
  
});

describe('Auth Router', () => {

    Object.keys(users).forEach(userType => {
  
      describe(`${userType} users`, () => {
  
        it('can create one', async () => {
  
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
  
        it(' get client Data for him ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .get('/clientData')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });

        it(' get client Data for him ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .post('/client')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });
        
        it(' clientUpdate Data for him ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .put('/client/updateany/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });
        //  =============== start add to favWorker ==========
        it(' add in the favWorker array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .post('/client/favWorker/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });


        it(' delete from favWorker array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .delete('/client/favWorker/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });

    //  =================== end test favWorker=============== 
    // ---------------------------------------------------------------------------
    //  =============== start add to favImg ==========
        it(' add in the favoriteImg array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .post('/client/favoriteImg/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });


        it(' delete from favoriteImg array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .delete('/client/favoriteImg/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });
    //  =================== end test favImg=============== 
    // ---------------------------------------------------------------------------
    //  =============== start add to recently ==========
        it(' add in the recently array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .post('/client/recently/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });


        it(' delete from recently array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .delete('/client/recently/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });
    //  =================== end test recently=============== 
    // ---------------------------------------------------------------------------
    //  =============== start add to notification ==========
        it(' add in the notification array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .post('/client/notification/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });


        it(' delete from notification array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .delete('/client/notification/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });
    //  =================== end test notification=============== 
    // ---------------------------------------------------------------------------
    //  =============== start add to chat ==========
        it(' add in the chat array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .post('/client/chat/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });


        it(' delete from chat array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .delete('/client/chat/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });
    //  =================== end test chat=============== 
    // ---------------------------------------------------------------------------
    //  =============== start add to post ==========
        it(' add in the post array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .post('/client/post/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });


        it(' delete from post array  ', async () => {
  
          // First, use basic to login to get a token
          const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;
  
          // First, use basic to login to get a token
          const bearerResponse = await mockRequest
            .delete('/client/post/1')
            .set('Authorization', `Bearer ${token}`)
  
          // Not checking the value of the response, only that we "got in"
          expect(bearerResponse.status).toBe(200);
          
        });
    //  =================== end test post =============== 

    it(' add in the support ', async () => {
  
       

        // First, use basic to login to get a token
        const Response = await mockRequest.post('/support')
         

        // Not checking the value of the response, only that we "got in"
        expect(Response.status).toBe(200);
        
      });
  
      });
  
     
  
    });
  
  });