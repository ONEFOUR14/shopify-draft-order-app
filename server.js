const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Shopify, ApiVersion } = require('@shopify/shopify-api');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: ['read_draft_orders', 'write_draft_orders', 'read_checkouts', 'write_checkouts'],
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ''),
  API_VERSION: ApiVersion.April24,
  IS_EMBEDDED_APP: false,
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

const createDraft = require('./api/create-draft');
const checkoutUpdate = require('./webhooks/checkout-update');

app.post('/api/create-draft', createDraft);
app.post('/webhooks/checkout-update', checkoutUpdate);

app.listen(3000, () => console.log('Server listening on port 3000'));