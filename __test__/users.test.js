'use strict';

process.env.SECRET = "toes";

const supertest = require('supertest');
const {app} = require('../src/server');
const { db } = require('../src/auth/models/index');

const mockRequest = supertest(app);


let users = {
  admin: { 
        username: "admin2",
        firstName: "admin",
        profilePicture:"ss",
        lastName:"admin",
        password: 'admin',
        email: 'admin2@admin.com',
        phone: '0789',
        location: 'zqq',
        store: ' ',
        workType: ' ' ,
        role:"admin"
    },

  worker: { 
        username: "worker2",
        firstName: "worker",
        profilePicture:"ss",
        lastName:"worker",
        password: 'worker',
        email: 'worker2@worker.com',
        phone: '0789',
        location: 'zqq',
        store: ' ',
        workType: ' ' ,
        role:'worker' 
    },
  user: { 
    username: "user2",
    firstName: "user",
    profilePicture:"ss",
    lastName:"user",
    password: 'user',
    email: 'user2@user.com',
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

    });

   

  });

});
describe('bad logins', () => {
    it('basic fails with known user and wrong password ', async () => {

      const response = await mockRequest.post('/signin')
        .auth('admin', 'xyz')
      const userObject = response.body;

      expect(response.status).toBe(403);
      expect(userObject.user).not.toBeDefined();
      expect(userObject.token).not.toBeDefined();
     
    });

    it('basic fails with unknown user', async () => {

      const response = await mockRequest.post('/signin')
        .auth('nobody', 'xyz')
      const userObject = response.body;

      expect(response.status).toBe(403);
      expect(userObject.user).not.toBeDefined();
      expect(userObject.token).not.toBeDefined()
      
    });

    it('bearer fails with an invalid token', async () => {

      // First, use basic to login to get a token
      const bearerResponse = await mockRequest
        .get('/getCurrentUser')
        .set('Authorization', `Bearer foobar`)

      // Not checking the value of the response, only that we "got in"
      expect(bearerResponse.status).toBe(500);
      
    })
  })