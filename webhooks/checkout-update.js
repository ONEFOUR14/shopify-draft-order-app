const { Shopify } = require('@shopify/shopify-api');

module.exports = async (req, res) => {
  const body = req.body;
  const session = await Shopify.Utils.loadOfflineSession(process.env.SHOP);

  const draftOrderId = req.cookies.draft_order_id;
  if (!draftOrderId) return res.status(200).send('No draft order found');

  const draftOrder = new Shopify.Rest.DraftOrder({ session });
  draftOrder.id = draftOrderId;
  if (body.email) draftOrder.email = body.email;
  if (body.shipping_address) draftOrder.shipping_address = body.shipping_address;

  await draftOrder.save({ update: true });
  res.status(200).send('Draft order updated');
};