const { parseJwt } = require("../helpers/common");

module.exports = {
  verifyAuthToken,
};

// Function to verify auth token
async function verifyAuthToken(headerToken) {
  return new Promise(async function (resolve, reject) {
    try {
      const authToken = headerToken;
      const tokenData = authToken.split(" ");
      const token = tokenData[1];
      if (token) {
        const result = await parseJwt(token);
        if (result) {
          const id = result.user_id;
          return resolve({
            id: id,
          });
        } else {
          return reject("Unauthorizd!");
        }
      } else {
        return reject("Unauthorizd!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}
