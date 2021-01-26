var axios = require("axios");

function acxiosPOST() {
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
  console.log("\nPERFORMING A POST REQUEST...");
  var access_token = axios(config).then(
    (response) => response.data["access_token"]
  );
  return access_token;
}

// using .then, which extracts the data
acxiosPOST()
  .then((accessToken) => {
    console.log("LOG: accessToken ===", accessToken);
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
        console.log(
          "LOG: JSON.stringify(response.data) ===",
          JSON.stringify(response.data)
        );
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

// export default acxiosPOST;
module.exports = acxiosPOST;
