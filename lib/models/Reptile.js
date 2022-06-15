const pool = require('../utils/pool');

class Reptile {
  name;
  family;
  genus;

  constructor(row) {
    this.name = row.name;
    this.family = row.family;
    this.genus = row.genus;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from reptiles');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from reptiles WHERE id = $1', [
      id,
    ]);
    return rows[0];
  }
}

module.exports = { Reptile };
