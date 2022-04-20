const mySQLBackend = require("./services/backend/MySQLBackend");

async function runMysql() {
  const mySqlBackend = new mySQLBackend();
  return mySqlBackend.max();
}

runMysql()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
