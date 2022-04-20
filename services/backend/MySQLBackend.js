const mysql = require("mysql2/promise");
const coinAPI = require("../CoinApi");

class MySQLBackend {
  constructor() {
    this.coinApi = new coinAPI();
    this.connection = null;
  }

  async connect() {
    this.connection = await mysql.createConnection({
      host: "localhost",
      port: 3406,
      user: "root",
      password: "mypassword",
      database: "maxcoin",
    });
    return this.connection;
  }

  async disconnect() {
    return this.connection.end();
  }

  async insert() {
    const data = await this.coinApi.fetch();
    const sql = "INSERT INTO coinvalues (valueDate,coinValue) VALUES ?";
    const values = [];
    Object.entries(data.bpi).forEach((entry) => {
      return values.push([entry[0], entry[1]]);
    });
    return this.connection.query(sql, [values]);
  }

  async getMax() {
    return this.connection.query(
      "SELECT * FROM coinvalues ORDER BY coinValue DESC LIMIT 0,1"
    );
  }

  async max(){
      console.info("Connection to Mysql");
      console.time("Mysql-connect");
      const connection = this.connect();
      if(connection){
          console.info("Succefully connected to Mysql");
      }else{
          throw new Error("Connecting to Mysql failed");
      }
      console.timeEnd("Mysql-connect");

      console.info("Insert into Mysql");
      console.time("mysql-insert");
      const insertResult = await this.insert();
      console.timeEnd("Mysql-insert");

      console.info(`Inserted ${insertResult[0].affectedRows} rows into Mysql table`);

      console.info("Querying Mysql");
      console.time("mysql find");
      const result = await this.getMax();
      const row = result[0][0];
      console.timeEnd("Mysql-find");

      console.info("Disconnecting from Mysql");
      console.time("Mysq-disconnect");
      await this.disconnect();
      console.timeEnd("Mysq-disconnect");

      return row;
  }
}
module.exports = MySQLBackend;
