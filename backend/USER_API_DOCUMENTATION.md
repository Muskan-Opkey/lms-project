# LMS Backend API - User Management Endpoints

## Users API

### Create User (Sign Up)

**Endpoint:** `POST /api/v1/users/signup`

**Description:** Create a new user account in the system

**Request Body:**
```json
{
  "id": "user_1775569207312_rba3hb07f",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "registeredAt": "2026-04-07T13:40:07.312Z"
}
```

**Validation Rules:**
- `id`: Required, not empty
- `name`: Required, 3-255 characters
- `email`: Required, valid email format, unique in database
- `password`: Required, minimum 8 characters
- `registeredAt`: Optional, defaults to current timestamp

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "user_1775569207312_rba3hb07f",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "registeredAt": "2026-04-07T13:40:07.312Z"
  },
  "timestamp": "2026-04-07T13:40:07.500Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Email already exists"
  },
  "timestamp": "2026-04-07T13:40:07.500Z"
}
```

**Validation Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Please provide a valid email",
        "value": "invalid-email"
      }
    ]
  },
  "timestamp": "2026-04-07T13:40:07.500Z"
}
```

---

### Get All Users

**Endpoint:** `GET /api/v1/users`

**Description:** Retrieve all registered users from the database

**Request:** No body required

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "user_1775569207312_rba3hb07f",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "registered_at": "2026-04-07 13:40:07"
    },
    {
      "id": "user_1775569148581_cvgnyllf5",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "registered_at": "2026-04-07 13:39:08"
    }
  ],
  "timestamp": "2026-04-07T13:40:07.500Z"
}
```

**Note:** Password field is excluded from response for security

---

### Get User By ID

**Endpoint:** `GET /api/v1/users/:id`

**Description:** Retrieve a specific user by their ID

**URL Parameters:**
- `id`: User ID (string)

**Example:** `GET /api/v1/users/user_1775569207312_rba3hb07f`

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user_1775569207312_rba3hb07f",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "registered_at": "2026-04-07 13:40:07"
  },
  "timestamp": "2026-04-07T13:40:07.500Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "User not found"
  },
  "timestamp": "2026-04-07T13:40:07.500Z"
}
```

---

### Delete User

**Endpoint:** `DELETE /api/v1/users/:id`

**Description:** Delete a user account from the database

**URL Parameters:**
- `id`: User ID (string)

**Example:** `DELETE /api/v1/users/user_1775569207312_rba3hb07f`

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "timestamp": "2026-04-07T13:40:07.500Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "User not found"
  },
  "timestamp": "2026-04-07T13:40:07.500Z"
}
```

---

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Indexes:**
- `idx_user_email` on `email` column
- `idx_user_registered_at` on `registered_at` column

---

## Date/Time Handling

**Important:** The API automatically converts between ISO 8601 (frontend) and MySQL datetime format (backend).

**Frontend sends:**
```
2026-04-07T13:40:07.312Z
```

**Backend converts to:**
```
2026-04-07 13:40:07
```

This is handled automatically by the `formatDateForMySQL()` helper function in `userController.js`.

---

## Error Handling

All errors follow this structure:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "details": []  // Optional, for validation errors
  },
  "timestamp": "2026-04-07T13:40:07.500Z"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

---

## Testing with cURL

### Create User
```bash
curl -X POST http://localhost:3000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user_test_123",
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!",
    "registeredAt": "2026-04-07T13:40:07.312Z"
  }'
```

### Get All Users
```bash
curl http://localhost:3000/api/v1/users
```

### Get User by ID
```bash
curl http://localhost:3000/api/v1/users/user_test_123
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/v1/users/user_test_123
```

---

## Security Notes

1. **Passwords:** Currently stored in plain text. **IMPORTANT:** In production, passwords should be hashed using bcrypt or similar.
2. **Authentication:** No authentication/authorization implemented yet. Add JWT tokens for production.
3. **Rate Limiting:** API is protected with rate limiting (100 requests per 15 minutes per IP).
4. **CORS:** Configured to allow requests from `http://localhost:3136` and `http://localhost:4200`.
5. **Validation:** All inputs are validated and sanitized using express-validator.

---

## Integration with Frontend

The Angular frontend uses `UserService` to interact with these endpoints:

**File:** `src/app/services/user.service.ts`

**Methods:**
- `addUser(user)` → Calls `POST /api/v1/users/signup`
- `getUsersFromDB()` → Calls `GET /api/v1/users`
- `deleteUserFromDB(id)` → Calls `DELETE /api/v1/users/:id`

**Components:**
- `SignupComponent` - Uses `addUser()` for registration
- `DashboardComponent` - Uses `getUsersFromDB()` to display users
