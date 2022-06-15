const pool = require('../utils/pool');

class Reptile {
  id;
  name;
  family;
  genus;

  constructor(row) {
    this.id = row.id;
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

  static async insert({ name, genus, family }) {
    const { rows } = await pool.query(
      'INSERT INTO reptiles (name, genus, family) VALUES ($1, $2, $3) RETURNING * ',
      [name, genus, family]
    );
    return new Reptile(rows[0]);
  }

  static async updateById(id, attrs) {
    const reptile = await Reptile.getById(id);
    if (!reptile) return null;
    const { name, family, genus } = { ...reptile, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE reptiles 
      SET name=$2, genus=$3, family=$4 
      WHERE id=$1 RETURNING *`,
      [id, name, genus, family]
    );
    return new Reptile(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM reptiles WHERE id = $1 RETURNING *',
      [id]
    );
    return new Reptile(rows[0]);
  }
}

module.exports = { Reptile };
