'use strict'
const supertest = require('supertest');
const {app} = require('../src/server');
const { db } = require('../src/auth/models/index');
const mockRequest = supertest(app);

beforeAll(async () => {
    await db.sync();
    
});

let users = {
    admin: { 
          username: "adminTest155541",
          firstName: "admin",
          profilePicture:"ss",
          lastName:"admin",
          password: 'admin',
          email: 'adminTest236561@admin.com',
          phone: '0789',
          location: 'zqq',
          store: ' ',
          workType: ' ' ,
          role:"admin"
      }
  };

  describe('sign up as admin ', () => {

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

        it('get clients just for admin ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .get('/clients')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('get workers just for admin ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .get('/getWorkers')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('get users just for admin ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('get support feed back just for admin ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .get('/support')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })

        it('delete user  just admin can do that  ', async()=>{
            const response = await mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password);
  
          const token = response.body.token;

          const bearerResponse = await mockRequest
            .delete('/deleteuser/1')
            .set('Authorization', `Bearer ${token}`)
            
            expect(bearerResponse.status).toBe(200)
        })




  
      });
  
     
  
    });
  
  });
  
