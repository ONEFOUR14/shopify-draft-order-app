const { Shopify } = require('@shopify/shopify-api');

module.exports = async (req, res) => {
  const cart = req.body.cart;
  const shop = process.env.SHOP.replace('https://', '');
  const token = process.env.SHOPIFY_ADMIN_TOKEN;

  const client = new Shopify.Clients.Rest(shop, token);

  const lineItems = cart.items.map(item => ({
    variant_id: item.variant_id,
    quantity: item.quantity
  }));

  const response = await client.post({
    path: 'draft_orders',
    data: {
      draft_order: {
        line_items: lineItems,
        note: 'Auto-created when entering checkout',
        tags: ['auto-created']
      }
    },
    type: 'json'
  });

  const draftOrderId = response.body.draft_order.id;

  res.cookie('draft_order_id', draftOrderId, { httpOnly: true });
  res.status(200).json({ success: true, draft_order_id: draftOrderId });
};
