import express from 'express'
import sectionRoutes from './routes/user.routes';
var cors = require('cors')
import './db';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3001');

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
	app.use(cors());
	next()
})

app.use('/', sectionRoutes);

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
