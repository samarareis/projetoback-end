
const database = require('./config/database');
require('./models');

async function syncDatabase() {
  try {
    await database.authenticate();
    console.log('Conexão com MySQL confirmada!');

    await database.sync();
    console.log('Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas:', error.message);
  } finally {
    await database.close();
  }
}

syncDatabase();
