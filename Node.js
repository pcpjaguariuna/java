const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Permite requisições de outras origens

const dbConfig = {
    user: 'jefferson.ferreira',
    password: 'Brasil123',
    server: '10.77.0.28',
    database: 'db_pcp_jaguariuna_acompanhamento_operacional',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to false for production
    }
};

app.get('/data', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM [dbo].[NOVA_ESCALA_OPERACIONAL]');
        res.json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
