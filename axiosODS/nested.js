var axios = require("axios");

// POST REQUEST
var data = JSON.stringify({
  client_id: "bf484ac1-8d3d-4ca2-bf6d-300dda569da2",
  client_secret: "2Fys5ShsdqWKxhuaRhqeNKgG40PFeX",
  grant_type: "client_credentials",
});

var config = {
  method: "post",
  url:
    "https://login.myacxiom.com/api/v1/auth/jwt/token?includeToken=1&enc=stitch&apps=odsacxiom",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

const res = axios(config)
  .then(function (response) {
    console.log("\nPERFORMING A POST REQUEST...");
    // console.log(JSON.stringify(response.data));  // entire object
    // console.log("response.data:", response.data["access_token"]);  // token
    var accessToken = response.data["access_token"];

    // GET REQUEST
    var config = {
      method: "get",
      url:
        "https://{{HOST}}/api/v1/sources?client={{mongo_client}}&secret={{mongo_secret}}&email=HELEN.DOE@synth.com&recordTypes=test",
      headers: {
        Authorization: "Bearer " + accessToken,
        "X-Request-Id": "12345-1234-12345-1234-123456",
      },
    };

    axios(config)
      .then(function (response) {
        console.log("\nPERFORMING A GET REQUEST...");
        // console.log(JSON.stringify(response.data));
        outsideFunction(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  .catch(function (error) {
    console.log(error);
  });

function outsideFunction(data) {
  console.log("\nOUTSIDE FUNCTION CALLED...");
  console.log("\nDATA PASSED TO OUTSIDE FUNCTION: \n");
  console.log(data);
}
