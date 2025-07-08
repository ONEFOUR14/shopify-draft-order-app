document.querySelector('form[action="/checkout"]').addEventListener('submit', async function(e) {
  e.preventDefault();
  const cart = await fetch('/cart.js').then(res => res.json());
  await fetch('https://your-app-url.com/api/create-draft', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ cart })
  });
  location.href = '/checkout';
});