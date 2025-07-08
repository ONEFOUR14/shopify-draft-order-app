const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const createDraft = require('./api/create-draft');
const checkoutUpdate = require('./webhooks/checkout-update');

app.post('/api/create-draft', createDraft);
app.post('/webhooks/checkout-update', checkoutUpdate);

app.get('/', (req, res) => {
  res.send('Shopify Draft Order App is running');
});

app.listen(3000, () => console.log('Server listening on port 3000'));
