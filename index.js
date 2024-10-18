require('dotenv').config();
express = require('express');
const app = express();
const cors = require('cors');

require('./DB/connection');

const routes = require('./Routes/routes')
app.use(express.json())
app.use(cors());

app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send("Welcome to Resource Planner API");
})