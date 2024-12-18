const { connection } = require("../config/connection");
const bcrypt = require("bcrypt");

const createUser = async (userObject) => {
  try {
    const { username, email, password } = userObject;

    const hash = await bcrypt.hash(password, 10);

    console.log(hash);
    const [user] = await connection.query(
      "INSERT INTO user(username, email, password) VALUES(?, ?, ?);",
      [username, email, hash]
    );

    return user;
  } catch (err) {
    return {
      error: true,
      message: `Error: ${err}`,
    };
  } finally {
    connection.releaseConnection();
  }
};

const verifyUser = async (email) => {
  try {
    const [userExists] = await connection.query(
      "SELECT * FROM user WHERE email = ?;",
      email
    );

    return userExists;
  } catch (err) {
    return {
      error: true,
      message: `Error: ${err}`,
    };
  } finally {
    connection.releaseConnection();
  }
};

module.exports = {
  createUser,
  verifyUser,
};
