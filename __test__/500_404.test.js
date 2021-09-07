"use strict";
const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);


describe("API Server", () => {
    // bad route
    it("handles not found request", async () => {
      const response = await request.get("/notttfouuundreqquuest");
      expect(response.status).toEqual(404);
    });
  
    // bad method
    it("handles my internal server errors", async () => {
      const response = await request.post("/bad");
      expect(response.status).toEqual(404);
    });
  
      // bad method
      it("handles my internal server errors", async () => {
        const response = await request.get("/badmethod");
        expect(response.status).toEqual(500);
      });
  
  });
  
  