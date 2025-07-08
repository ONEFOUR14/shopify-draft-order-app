const { Shopify } = require('@shopify/shopify-api');

module.exports = async (req, res) => {
  const body = req.body;
  const shop = process.env.SHOP.replace('https://', '');
  const token = process.env.SHOPIFY_ADMIN_TOKEN;

  const client = new Shopify.Clients.Rest(shop, token);
  const draftOrderId = req.cookies.draft_order_id;
  if (!draftOrderId) return res.status(200).send('No draft order found');

  await client.put({
    path: `draft_orders/${draftOrderId}`,
    data: {
      draft_order: {
        email: body.email || undefined,
        shipping_address: body.shipping_address || undefined
      }
    },
    type: 'json'
  });

  res.status(200).send('Draft order updated');
};
