# 🛒 E-Commerce REST API

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4%2B-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Joi](https://img.shields.io/badge/Joi-Validation-blue)](https://joi.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

A modular e-commerce REST API built with **Node.js**, **Express**, and **MongoDB**. The project includes user authentication, password hashing, JWT authorization, product management, order management, Joi request validation, centralized error handling, and API rate limiting.

## ✨ Features

- 👤 User registration and login.
- 🔐 Password hashing with `bcryptjs`.
- 🎟️ JWT access-token generation and verification.
- 🛡️ Role support for `user` and `admin`.
- 📦 Product creation, listing, retrieval, update, and deletion.
- 🧾 Order creation and user-specific order retrieval.
- 🚚 Admin-only order-status updates.
- ✅ Joi validation with custom error messages.
- 🧱 Mongoose model validation.
- 🗂️ Repository layer for database operations.
- ⚠️ Centralized application error handling.
- 🔁 MongoDB duplicate-key error handling.
- ⏱️ JWT invalid-token and expired-token handling.
- 🚦 General and authentication-specific rate limiting.
- 🩺 Health-check endpoint.
- 🧹 Graceful shutdown for HTTP and MongoDB connections.

## 🧰 Tech Stack

| Technology         | Purpose                           |
| ------------------ | --------------------------------- |
| Node.js            | JavaScript runtime                |
| Express            | REST API framework                |
| MongoDB            | NoSQL database                    |
| Mongoose           | MongoDB ODM and schema validation |
| Joi                | Request validation                |
| bcryptjs           | Password hashing and comparison   |
| jsonwebtoken       | JWT creation and verification     |
| express-rate-limit | Request-rate limiting             |
| dotenv             | Environment configuration         |

## 📁 Project Structure

```text
src/
├── config/
│   └── env.js
├── controllers/
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   └── validate.js
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── repositories/
│   ├── orderRepository.js
│   ├── productRepository.js
│   └── userRepository.js
├── routes/
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── AppError.js
│   └── catchAsync.js
├── validators/
│   ├── orderValidator.js
│   ├── productValidator.js
│   └── userValidator.js
├── main.js
└── server.js
```

> If your project does not use a `src` directory, remove `src/` from the paths above.

## ⚙️ Requirements

- Node.js 20 or newer.
- MongoDB running locally or a MongoDB Atlas connection.
- npm or another compatible package manager.

## 🚀 Installation

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
npm install
```

Create a `.env` file in the project root:

```env
PORT=8080
URL=mongodb://localhost:27017/ecommerce
JWT_EXPIRE=7d
JWT_SECRET=replace_this_with_a_long_random_secret
NODE_ENV=development
```

> Never commit `.env` or expose `JWT_SECRET` in source control.

## 📜 Available Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Run the application:

```bash
npm run dev
```

For production:

```bash
npm start
```

## 🌐 Base URL

```text
http://localhost:8080/api
```

## 🩺 Health Check

### `GET /api/health`

```json
{
  "status": "success",
  "message": "API is running."
}
```

## 🔐 Authentication API

### Register a user

```http
POST /api/users/register
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "role": "user"
}
```

### Login

```http
POST /api/users/login
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

The response contains a JWT:

```json
{
  "status": "success",
  "message": "Login successful.",
  "token": "your.jwt.token",
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

Send the token in protected requests:

```http
Authorization: Bearer your.jwt.token
```

### Find a user

```http
GET /api/users/:id
Authorization: Bearer your.jwt.token
```

## 🛍️ Product API

### Create a product

```http
POST /api/products
Content-Type: application/json
```

```json
{
  "name": "Wireless Mouse",
  "price": 2499,
  "stock": 20,
  "category": "electronics"
}
```

### List products

```http
GET /api/products
```

### Get one product

```http
GET /api/products/:id
```

### Update a product

```http
PATCH /api/products/:id
Content-Type: application/json
```

```json
{
  "price": 2299,
  "stock": 30
}
```

### Delete a product

```http
DELETE /api/products/:id
```

## 🧾 Order API

All order endpoints require authentication.

### Create an order

```http
POST /api/orders
Authorization: Bearer your.jwt.token
Content-Type: application/json
```

```json
{
  "items": [
    {
      "product": "66f00f9b1b2c3d4e5f6a7b8c",
      "quantity": 2
    }
  ],
  "totalAmount": 4998
}
```

### Get my orders

```http
GET /api/orders/my-orders
Authorization: Bearer your.jwt.token
```

### Get one order

```http
GET /api/orders/:id
Authorization: Bearer your.jwt.token
```

Users can access their own orders. Administrators can access any order.

### Update order status

Only administrators can update order status:

```http
PATCH /api/orders/:id
Authorization: Bearer admin.jwt.token
Content-Type: application/json
```

```json
{
  "status": "shipped"
}
```

Allowed statuses:

```text
pending
processing
shipped
delivered
cancelled
```

## ✅ Validation

The API validates requests with Joi before controllers run. Invalid requests return a structured response:

```json
{
  "status": "fail",
  "message": "Request validation failed.",
  "details": [
    {
      "field": "price",
      "message": "Product price cannot be negative."
    }
  ]
}
```

Product categories:

```text
electronics
fashion
home
beauty
sports
books
food
other
```

## ⚠️ Error Handling

The centralized error handler supports:

- Joi validation errors — `400 Bad Request`.
- Mongoose validation errors — `400 Bad Request`.
- Invalid MongoDB ObjectIds — `400 Bad Request`.
- Duplicate MongoDB values — `409 Conflict`.
- Invalid JWTs — `401 Unauthorized`.
- Expired JWTs — `401 Unauthorized`.
- Missing authentication — `401 Unauthorized`.
- Forbidden roles — `403 Forbidden`.
- Missing resources — `404 Not Found`.
- Unexpected server errors — `500 Internal Server Error`.

Example not-found response:

```json
{
  "status": "fail",
  "message": "Product not found."
}
```

## 🚦 Rate Limiting

The API includes two rate limits:

- General API limiter: 100 requests per IP address every 15 minutes.
- Authentication limiter: 10 failed authentication attempts per IP address every 15 minutes.

When a limit is exceeded:

```json
{
  "status": "fail",
  "message": "Too many requests from this IP address. Please try again after 15 minutes."
}
```

## 🔒 Security Notes

- Store only hashed passwords in MongoDB.
- Never return the password field in API responses.
- Keep `JWT_SECRET` outside the source code.
- Use HTTPS in production.
- Do not trust client-provided order totals in a production checkout flow.
- Recalculate order totals from current product prices on the server.
- Verify product stock before creating an order.
- Consider a shared rate-limit store such as Redis when running multiple API instances.
- Use a production MongoDB deployment with authentication and network restrictions.

## 🧪 Testing with Postman or Insomnia

1. Start MongoDB.
2. Start the API with `npm run dev`.
3. Register a user.
4. Log in and copy the returned token.
5. Add the token as a Bearer token in protected requests.
6. Create products.
7. Create and retrieve orders.
8. Log in with an admin account to update order status.

## 📌 Current Order Total Limitation

The current order endpoint accepts `totalAmount` from the request body for simplicity. For a real e-commerce system, the controller should calculate this value from the database:

```text
product price × requested quantity = item subtotal
sum of item subtotals = order total
```

The server should also check stock and update inventory atomically.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit with a clear message.
5. Open a pull request.

## 📄 License

This project is available under the MIT License.

## 👨‍💻 Author

Developed as a modular Node.js and MongoDB e-commerce API project
