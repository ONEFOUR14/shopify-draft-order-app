# Shopify 自动草稿订单 App

## 功能简介
- 客户点击进入 checkout 页面时，自动创建草稿订单并包含购物车商品；
- 客户填写邮箱/地址但未完成支付时，通过 webhook 抓取数据自动回写草稿订单；
- 支持部署到本地 (ngrok) 或 Vercel/Render。

## 安装与部署

### 1. 创建 Shopify App
- 登录 [Shopify Partners](https://partners.shopify.com/)
- 创建一个 “Custom App”，获取 API key/secret

### 2. 修改环境变量
复制 `.env.example` 为 `.env`，填写你的商店和 app 资料。

### 3. 启动本地服务
```bash
npm install
node server.js
```

### 4. 使用 ngrok 进行外部访问
```bash
ngrok http 3000
```

### 5. 注入前端 JS（在 `cart.liquid` 添加以下内容）
```html
<script src="https://your-app-url.com/public/inject.js"></script>
```

### 6. Shopify 后台添加 webhook
- 类型：`checkouts/update`
- 地址：`https://your-app-url.com/webhooks/checkout-update`

## 说明
- 草稿订单将在客户点击 checkout 时立即创建；
- 即使客户未付款，也能保存邮箱、地址等信息，便于你后续跟进。