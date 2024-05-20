const express = require('express');
const bodyParser = require('body-parser');
const entityRoutes = require('./routes/entityRoutes');

const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use('/api', entityRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
