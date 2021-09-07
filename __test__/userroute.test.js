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
        username: "worker22",
        firstName: "worker",
        profilePicture:"ss",
        lastName:"worker",
        password: 'worker',
        email: 'worker22@worker.com',
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
  
        xit('can create admin', async () => {
  
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

        xit("upload profile pictuer for all users ", async () => {
            const response = await mockRequest
              .post("/signin")
              .auth(users[userType].username, users[userType].password);
  
            const token = response.body.token;
            const bearerResponse = await mockRequest
              .post("/profilepicture")
              .set("Authorization", `Bearer ${token}`);
  
            expect(bearerResponse.status).toBe(200);
          });
  
      });
  
     
  
    });
  
  });