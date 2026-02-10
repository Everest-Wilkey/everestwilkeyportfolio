# Contact Form API Contract

**Route**: `POST /api/contact`
**Auth**: None (public endpoint, protected by Turnstile CAPTCHA)

---

## Request

### Headers

| Header       | Value              |
|--------------|--------------------|
| Content-Type | application/json   |

### Body

```json
{
  "name": "string (1-100 chars, required)",
  "email": "string (valid email, required)",
  "message": "string (1-2000 chars, required)",
  "turnstileToken": "string (Turnstile response, required)"
}
```

---

## Responses

### 200 OK — Message sent

```json
{
  "success": true,
  "message": "Message sent successfully."
}
```

### 400 Bad Request — Validation error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    { "field": "email", "message": "Invalid email address." },
    { "field": "message", "message": "Message must be between 1 and 2000 characters." }
  ]
}
```

### 403 Forbidden — CAPTCHA verification failed

```json
{
  "success": false,
  "message": "CAPTCHA verification failed. Please try again."
}
```

### 500 Internal Server Error — Delivery failure

```json
{
  "success": false,
  "message": "Unable to send message. Please try emailing directly.",
  "fallbackEmail": "contact@everestwilkey.com"
}
```

---

## Server-Side Flow

1. Parse and validate request body (name, email, message).
2. Verify `turnstileToken` via Cloudflare Turnstile siteverify
   API (`POST https://challenges.cloudflare.com/turnstile/v0/siteverify`).
3. If CAPTCHA invalid → return 403.
4. Sanitize input (strip HTML tags, trim whitespace).
5. Send email via Resend API with sender info and message.
6. If Resend succeeds → return 200.
7. If Resend fails → return 500 with fallback email address.

---

## Rate Limiting

- Limit: 5 requests per IP per 15-minute window.
- Response when exceeded:

```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

Status code: `429 Too Many Requests`
