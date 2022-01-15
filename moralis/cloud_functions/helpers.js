// const Parse = require("parse/node");
// const Moralis = require("moralis");

// const serverUrl = "https://gpcsccfs4eyy.grandmoralis.com:2053/server";
// const appId = "nDoAAbLEDLmP9TArw7fXMikJnSTiB4XJlCDkfo4L";

// Moralis.initialize(appId);
// Moralis.serverURL = serverUrl;

function getUsers() {
  const query = new Parse.Query("User");
  query.limit(1000);
  const result = query.find({ useMasterKey: true });
  return result;
}

function getUsernames() {
  // const query = new Parse.Query("User");
  // query.limit(1000);
  // const result = query.find({ useMasterKey: true });
  users = getUsers();
  const usernames = users.map((ParseUser) => ({
    params: {
      username: ParseUser.username
    }
  }));
  return usernames;
  // return result;
}

// return fileNames.map((fileName) => ({
//     params: {
//       id: fileName.replace(/\.md$/, ``),
//     },
//   }));
// }
