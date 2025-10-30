# OxaPay Integration Setup Guide

This guide explains how to set up OxaPay crypto payment gateway integration in your Luxio application.

## Overview

OxaPay has replaced NowPayments as the crypto payment gateway for this application. OxaPay provides fast and secure cryptocurrency payment processing with no KYC/KYB requirements.

## Required Environment Variables

Add the following environment variable to your `.env` file or Replit Secrets:

```
OXAPAY_API_KEY=your_merchant_api_key_here
```

## Getting Your API Key

1. Sign up at [https://oxapay.com](https://oxapay.com)
2. Navigate to **Dashboard → Merchant API**
3. Click **"Generate API Key"**
4. Copy your `MERCHANT_API_KEY`
5. Add it to your environment variables as `OXAPAY_API_KEY`

## Features

- **Fast Processing**: Invoices generated in <150ms
- **Low Fees**: ~0.4% per transaction
- **No KYC/KYB**: Start accepting payments immediately
- **Multiple Cryptocurrencies**: Bitcoin, Ethereum, USDT (TRC20, ERC20, BEP20), BNB, and more
- **Secure**: HMAC SHA-512 webhook validation
- **Auto-conversion**: Convert incoming crypto to stablecoins

## API Endpoints

The following endpoints handle OxaPay payments:

- **Initialization**: `/api/payment/oxapay-init` - Creates payment invoice
- **Webhook**: `/api/payment/oxapay-webhook` - Handles payment status updates
- **Return URL**: `/api/payment/oxapay-return` - Handles user return after payment

## Database Collection

Orders are stored in the `oxapay_orders` MongoDB collection with the following structure:

```javascript
{
  customerEmail: string,
  customerName: string,
  totalAmount: number,
  cartItems: Array<{id, name, price, quantity}>,
  orderReference: string,
  paymentMethod: 'oxapay',
  status: 'pending' | 'success' | 'failed',
  language: string,
  oxapayTrackId: string,
  payLink: string,
  paymentStatus: string,
  oxapayStatus: string,
  trackId: string,
  payAmount: number,
  payCurrency: string,
  paidAt: Date | null,
  createdAt: Date,
  updatedAt: Date
}
```

## Payment Statuses

OxaPay uses the following payment statuses:

| OxaPay Status | Internal Status | Description |
|---------------|----------------|-------------|
| `Waiting` | `pending` | Waiting for customer payment |
| `Confirming` | `pending` | Payment detected, awaiting confirmations |
| `Paid` | `success` | Payment confirmed |
| `Expired` | `failed` | Invoice expired |
| `Canceled` | `failed` | Payment canceled |

## Webhook Security

The webhook endpoint validates requests using HMAC SHA-512 signatures:

1. Receives webhook with HMAC header
2. Calculates signature using `OXAPAY_API_KEY`
3. Compares calculated vs received signature
4. Rejects invalid requests

## Testing

To test OxaPay integration:

1. Set up your `OXAPAY_API_KEY` in environment variables
2. Make sure MongoDB is connected (`MONGODB_URI`)
3. Configure backend and frontend URLs:
   - `BACKEND_URL` (e.g., `https://luxio.onrender.com`)
   - `FRONTEND_URL` (e.g., `https://luxios.vercel.app`)
4. Start the application
5. Add products to cart and select "OxaPay" payment method
6. Complete checkout - you'll be redirected to OxaPay payment page

## Email Notifications

When a payment is confirmed, the system sends:

- **Customer Confirmation**: Email to customer with order details
- **Admin Notification**: Email to admin with order information

Both emails use the OxaPay email templates defined in `utils/email.ts`.

## Migration from NowPayments

If you're migrating from NowPayments:

1. The old NowPayments endpoints are still available but not actively used
2. Update your checkout flow to use 'oxapay' instead of 'nowpayments'
3. Old orders in `nowpayments_orders` collection remain accessible
4. New orders use the `oxapay_orders` collection

## Support

For OxaPay-related issues:
- **OxaPay Documentation**: [https://docs.oxapay.com](https://docs.oxapay.com)
- **OxaPay Support**: Available 24/7 via dashboard
- **API Reference**: [https://docs.oxapay.com/api-reference](https://docs.oxapay.com/api-reference)

## Additional Resources

- [OxaPay Webhook Documentation](https://docs.oxapay.com/webhook)
- [Supported Cryptocurrencies](https://docs.oxapay.com/supported-currencies)
- [Integration Checklist](https://oxapay.com/blog/crypto-payment-integration-checklist-with-api-for-websites/)
