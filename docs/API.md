# Luxio Market - API Documentation

## Base URL

- **Development**: `http://localhost:3001/api`
- **Production**: `https://api.luxiomarket.shop/api`

## Authentication

Most endpoints require authentication via JWT token stored in HTTP-only cookie named `auth_token`.

### Headers

```
Content-Type: application/json
```

For authenticated requests, the cookie is automatically sent by the browser.

## Endpoints

### Health Check

#### GET /health

Check if the API is running and healthy.

**Response:**
```json
{
  "status": "ok",
  "message": "API is healthy",
  "timestamp": "2025-11-01T00:00:00.000Z"
}
```

---

### Authentication

#### POST /auth/signup

Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "country": "France",
  "city": "Paris",
  "address": "123 Main St",
  "phone": "+33123456789",
  "language": "fr"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inscription réussie",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### POST /auth/login

Authenticate user and create session.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "firstName": "John",
    "emailVerified": true
  }
}
```

#### POST /auth/logout

Log out the current user and destroy session.

**Response:**
```json
{
  "ok": true,
  "message": "Déconnexion réussie"
}
```

#### GET /auth/me

Get current authenticated user information.

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "emailVerified": true
  }
}
```

#### POST /auth/forgot-password

Request password reset email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email de réinitialisation envoyé"
}
```

#### POST /auth/reset-password

Reset password using token from email.

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "newSecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mot de passe réinitialisé avec succès"
}
```

---

### Products

#### GET /products

Get all available products.

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "product_id",
      "name": "iPhone 17 Pro",
      "price": 1299.99,
      "originalPrice": 1499.99,
      "discount": 13,
      "image": "/assets/iphone-17-pro.jpg",
      "category": "smartphones",
      "description": "Latest flagship smartphone",
      "features": ["5G", "Pro Camera", "A18 Chip"],
      "available": true
    }
  ]
}
```

#### POST /products/create
*Requires authentication and admin role*

Create a new product.

**Request Body:**
```json
{
  "name": "Product Name",
  "price": 999.99,
  "originalPrice": 1199.99,
  "discount": 17,
  "category": "smartphones",
  "description": "Product description",
  "image": "/path/to/image.jpg",
  "features": ["Feature 1", "Feature 2"],
  "available": true
}
```

---

### Orders

#### POST /payment/submit-order

Submit a new order.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 1,
      "price": 1299.99
    }
  ],
  "totalAmount": 1299.99,
  "paymentMethod": "card",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Paris",
    "country": "France",
    "postalCode": "75001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "order_id",
  "paymentUrl": "https://payment.provider.com/checkout"
}
```

---

### Users

#### GET /users

*Requires authentication*

Get current user profile.

**Response:**
```json
{
  "id": "user_id",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "country": "France",
  "city": "Paris",
  "emailVerified": true,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request parameters",
  "details": "Email format is invalid"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

Authentication endpoints (/auth/login, /auth/signup, /auth/forgot-password) are rate-limited:
- **Development**: 10 requests per 15 minutes per IP
- **Production**: 5 requests per 15 minutes per IP

## CORS

The API accepts requests from:
- **Development**: `http://localhost:5000`
- **Production**: `https://luxiomarket.shop`

Credentials (cookies) are included in cross-origin requests.

## Security

- All passwords are hashed using bcrypt
- JWT tokens are stored in HTTP-only cookies
- CSRF protection is enabled on all state-changing endpoints
- Rate limiting prevents brute force attacks
- All sensitive data is encrypted at rest

## Webhooks

### Payment Webhooks

The API supports webhooks from payment providers:

#### POST /payment/stripe-webhook

Stripe webhook for payment events.

#### POST /payment/oxapay-callback

OxaPay webhook for crypto payment events.

**Note**: These endpoints bypass CSRF protection and use webhook signatures for authentication.
