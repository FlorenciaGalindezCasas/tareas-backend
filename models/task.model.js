const { connection } = require("../config/connection");

const getByIdQuery =
  "SELECT * FROM note, tag " +
  "WHERE note_id = ? " +
  "AND note.tag_id = tag.tag_id;";

const getAll = async () => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM note, tag WHERE note.tag_id = tag.tag_id"
    );
    return rows;
  } catch (e) {
    return {
      error: true,
      message: `Error: ${e}`,
    };
  } finally {
    connection.releaseConnection();
  }
};

const createTask = async (noteData) => {
  try {
    const { note_title, note_description, note_date, tag_id , note_status} = noteData;

    const [row] = await connection.query(
      "INSERT INTO note" +
        "(note_title, note_description, note_date, tag_id, note_status)" +
        "VALUES(?,?,?,?,?);",
      [note_title, note_description, note_date, tag_id, note_status]
    );

    const [createdTask] = await connection.query(getByIdQuery, row.insertId);

    return createdTask;
  } catch (error) {
    return {
      error: true,
      message: `Error: ${error}`,
    };
  } finally {
    connection.releaseConnection();
  }
};

const editTask = async (id, body) => {
  try {
    const set = Object.keys(body)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = [...Object.values(body), id];

    const [row] = await connection.query(
      `UPDATE note SET ${set} WHERE note_id = ?`,
      values
    );

    if (row.affectedRows === 0) {
      return {
        error: true,
        message: "No fields were changed",
      };
    }

    const [editedTask] = await connection.query(getByIdQuery, id);

    return editedTask;
  } catch (error) {
    return {
      error: true,
      message: `Error: ${error}`,
    };
  } finally {
    connection.releaseConnection();
  }
};

const deleteTask = async (id) => {
  try {
    const [row] = await connection.query(
      "DELETE FROM note WHERE note_id = ?",
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

module.exports = { getAll, createTask, editTask, deleteTask };
