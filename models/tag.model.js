const { connection } = require("../config/connection");

const getByIdQuery = "SELECT * FROM tag " + "WHERE tag_id = ? ";

const getAll = async () => {
  try {
    const [rows] = await connection.query("SELECT * FROM tag");
    return rows;
  } catch (error) {
    return {
      error: true,
      message: `Error: ${error}`,
    };
  } finally {
    connection.releaseConnection();
  }
};

const createTag = async (tagData) => {
  try {
    const { tag_name } = tagData;

    const [row] = await connection.query(
      "INSERT INTO tag" + "(tag_name)" + "VALUES(?);",
      [tag_name]
    );

    const [createdTag] = await connection.query(getByIdQuery, row.insertId);

    return createdTag;
  } catch (error) {
    return {
      error: true,
      message: `Error: ${error}`,
    };
  } finally {
    connection.releaseConnection();
  }
};

const deleteTag = async (id) => {
  try {
    const [row] = await connection.query(
      "DELETE FROM tag WHERE tag_id = ?",
      id
    );

    if (row.affectedRows === 0) {
      return {
        error: true,
        message: "No fields were removed",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: `Error: ${error}`,
    };
  } finally {
    connection.releaseConnection();
  }
};
module.exports = { getAll, createTag, deleteTag };
