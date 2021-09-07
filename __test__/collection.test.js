"use strict";

const { userModel } = require("../src/auth/models");
const Collection = require("../src/auth/models/dataCollection");

describe("collection ", () => {
  it("constructor()", () => {
    let model = "my name is ahmad";
    let customer = new Collection(model);
    expect(customer.model).toEqual(model);
    expect(customer).toBeInstanceOf(Collection);
  });

//   it("create()", async() => {
//     let userCollection = new Collection(userModel);
//     let obj = {
//       username: " ss",
//       firstName: "s",
//       profilePicture: "s",
//       lastName: "s",
//       password: "s",
//       email: "sss",
//       phone: "s",
//       location: "s",
//       store: "s",
//       workType: "s",
//     };
//     // userCollection.create(obj);
//   expect(userCollection.create(obj)).toBe(obj);
//   });
});
