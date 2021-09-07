'use strict';

process.env.SECRET = "toes";

const supertest = require('supertest');
const {app} = require('../src/server');
const { db } = require('../src/auth/models/index');


const mockRequest = supertest(app);

beforeAll(async () => {
    await db.sync();
    
  });
  let users = {
    user: { 
      username: "ahmad",
      firstName: "user",
      profilePicture:"ss",
      lastName:"user",
      password: 'user',
      email: 'ahmad@user.com',
      phone: '0789',
      location: 'zqq',
      store: ' ',
      workType: ' ' ,
      role:'user' 
    },
   
  };


xdescribe('for routes.js', () => {
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
    
          it(' update his accuant  ', async () => {
    
            // First, use basic to login to get a token
            const response = await mockRequest.post('/signin')
              .auth(users[userType].username, users[userType].password);
    
            const token = response.body.token;
    
            // First, use basic to login to get a token
            const bearerResponse = await mockRequest
              .put('/updateaccount')
              .set('Authorization', `Bearer ${token}`)
    
            // Not checking the value of the response, only that we "got in"
            expect(bearerResponse.status).toBe(200);
            
          });
        //   it(' deleteaccount   ', async () => {
    
        //     // First, use basic to login to get a token
        //     const response = await mockRequest.post('/signin')
        //       .auth(users[userType].username, users[userType].password);
    
        //     const token = response.body.token;
    
        //     // First, use basic to login to get a token
        //     const bearerResponse = await mockRequest
        //       .delete('/deleteaccount')
        //       .set('Authorization', `Bearer ${token}`)
    
        //     // Not checking the value of the response, only that we "got in"
        //     expect(bearerResponse.status).toBe(200);
            
            
        //   });

          it(' getAllWorkers  ', async () => {

            const Response = await mockRequest.get('/getAllWorkers')
            expect(Response.status).toBe(200);
            
          });

        
  
})
    
}) 

})
    