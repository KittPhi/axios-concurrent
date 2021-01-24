const axios = require("axios");
const querystring = require("querystring");

// Example to GET Object
axios.get("http://jsonplaceholder.typicode.com/posts").then((resp) => {
  console.log(resp.data);
});

// GET where id=100
axios.get("http://jsonplaceholder.typicode.com/posts?id=100").then((resp) => {
  console.log(resp.data);
});

// Example to add a user to the server or database,
async function addUserByPostRequest() {
  params = {
    id: 6,
    first_name: "Bryan",
    last_name: "Dijkhuizen",
    email: "bryan@dijkhuizenmedia.com",
    password: "************",
  };
  let res = await axios.post("http://localhost:3000/users/", params);
  console.log(res.data);
}

axios.post(
  "http://jsonplaceholder.typicode.com/posts",
  querystring.stringify({ foo: "bar" })
);


