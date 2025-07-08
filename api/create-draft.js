const { Shopify } = require('@shopify/shopify-api');

module.exports = async (req, res) => {
  const cart = req.body.cart;

  const session = await Shopify.Utils.loadOfflineSession(process.env.SHOP);

  const lineItems = cart.items.map((item) => ({
    variant_id: item.variant_id,
    quantity: item.quantity
  }));

  const draftOrder = new Shopify.Rest.DraftOrder({ session });
  draftOrder.line_items = lineItems;
  draftOrder.note = 'Auto-created when entering checkout';
  draftOrder.tags = ['auto-created'];

  await draftOrder.save();

  res.cookie('draft_order_id', draftOrder.id, { httpOnly: true });
  res.status(200).json({ success: true, draft_order_id: draftOrder.id });
};