
# API Testing Guide (MySQL)

Complete guide for testing the LMS Registration API (MySQL backend).

## 📋 Prerequisites

- Backend server running on `http://localhost:3000`
- MySQL database configured and connected
- Tools: cURL, Postman, or PowerShell

## 🧪 Test Scenarios

### 1. Health Check Test

**Purpose:** Verify server is running

**cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/health
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/health" -Method Get
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-03-30T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

**Status Code:** 200

---


### 2. Create Registration - Valid Data

**Purpose:** Test successful registration creation

**cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "designation": "Developer",
    "course": "Angular",
    "location": "New York"
  }'
```

**PowerShell:**
```powershell
$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    name = "John Doe"
    designation = "Developer"
    course = "Angular"
    location = "New York"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/registrations" `
    -Method Post `
    -Headers $headers `
    -Body $body
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "designation": "Developer",
    "course": "Angular",
    "location": "New York",
    "createdAt": "2026-03-30T12:00:00.000Z"
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Status Code:** 201

---


### 3. Create Registration - Missing Required Field

**Purpose:** Test validation error handling (MySQL)

**cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "designation": "Developer",
    "course": "Angular"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      {
        "field": "location",
        "message": "Location is required",
        "value": ""
      }
    ]
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Status Code:** 400

---


### 4. Create Registration - Invalid Name Format

**Purpose:** Test pattern validation (MySQL)

**cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John123",
    "designation": "Developer",
    "course": "Angular",
    "location": "New York"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      {
        "field": "name",
        "message": "Name can only contain letters, spaces, dots, hyphens, and apostrophes"
      }
    ]
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Status Code:** 400

---

### 5. Get All Registrations


**Purpose:** Test retrieval with pagination (MySQL)

**cURL:**
```bash
curl -X GET "http://localhost:3000/api/v1/registrations?page=1&limit=10"
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "designation": "Developer",
      "course": "Angular",
      "location": "New York",
      "created_at": "2026-03-30T12:00:00.000Z",
      "updated_at": "2026-03-30T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalRecords": 1,
    "recordsPerPage": 10
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Status Code:** 200

---

### 6. Get Registration by ID

**Purpose:** Test single record retrieval

**cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/registrations/1
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/registrations/1"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "designation": "Developer",
    "course": "Angular",
    "location": "New York",
    "created_at": "2026-03-30T12:00:00.000Z",
    "updated_at": "2026-03-30T12:00:00.000Z"
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Status Code:** 200

---

### 7. Get Registration by ID - Not Found

**Purpose:** Test 404 error handling

**cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/registrations/99999
```

**Expected Response:**
```json
{
  "success": false,
  "error": {
    "message": "Registration not found"
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Status Code:** 404

---

### 8. Update Registration

**Purpose:** Test record update

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/v1/registrations/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "designation": "Senior Developer",
    "course": "React",
    "location": "San Francisco"
  }'
```

**PowerShell:**
```powershell
$body = @{
    name = "John Doe Updated"
    designation = "Senior Developer"
    course = "React"
    location = "San Francisco"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/registrations/1" `
    -Method Put `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "designation": "Senior Developer",
    "course": "React",
    "location": "San Francisco",
    "created_at": "2026-03-30T12:00:00.000Z",
    "updated_at": "2026-03-30T12:05:00.000Z"
  },
  "timestamp": "2026-03-30T12:05:00.000Z"
}
```

**Status Code:** 200

---

### 9. Delete Registration

**Purpose:** Test record deletion

**cURL:**
```bash
curl -X DELETE http://localhost:3000/api/v1/registrations/1
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/registrations/1" -Method Delete
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration deleted successfully",
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Status Code:** 200

---

### 10. Get Statistics

**Purpose:** Test statistics endpoint

**cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/registrations/stats
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/registrations/stats"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total_registrations": "5",
      "total_courses": "3",
      "total_locations": "4",
      "total_designations": "2"
    },
    "courseBreakdown": [
      {
        "course": "Angular",
        "count": "2"
      },
      {
        "course": "React",
        "count": "2"
      },
      {
        "course": "Python",
        "count": "1"
      }
    ]
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Status Code:** 200

---

### 11. Rate Limiting Test

**Purpose:** Test rate limiting protection

**Bash Script:**
```bash
for i in {1..12}; do
  echo "Request $i"
  curl -X POST http://localhost:3000/api/v1/registrations \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test User '$i'",
      "designation": "Tester",
      "course": "Testing",
      "location": "TestLand"
    }'
  echo "\n"
done
```

**Expected:** After 10 requests in 15 minutes:
```json
{
  "success": false,
  "error": {
    "message": "Too many registration attempts, please try again later."
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Status Code:** 429

---

## 🎯 Postman Collection

### Import into Postman

1. Create a new collection: "LMS Registration API"
2. Add environment variable:
   - `baseUrl`: `http://localhost:3000/api/v1`

### Collection Structure

```
LMS Registration API
├── Health Check (GET {{baseUrl}}/health)
├── Create Registration (POST {{baseUrl}}/registrations)
├── Get All Registrations (GET {{baseUrl}}/registrations?page=1&limit=10)
├── Get Registration by ID (GET {{baseUrl}}/registrations/1)
├── Update Registration (PUT {{baseUrl}}/registrations/1)
├── Delete Registration (DELETE {{baseUrl}}/registrations/1)
└── Get Statistics (GET {{baseUrl}}/registrations/stats)
```

---

## 📊 Test Results Checklist

- [ ] Health check returns 200
- [ ] Valid registration creation returns 201
- [ ] Missing field returns 400 with validation errors
- [ ] Invalid name pattern returns 400
- [ ] Get all registrations returns paginated data
- [ ] Get by ID returns correct record
- [ ] Get non-existent ID returns 404
- [ ] Update works correctly
- [ ] Delete works correctly
- [ ] Statistics endpoint returns correct data
- [ ] Rate limiting triggers after limit exceeded
- [ ] CORS headers present in responses

---

## 🐛 Debugging Failed Tests

### Check Server Logs

```bash
tail -f backend/logs/combined.log
```

### Check Error Logs

```bash
tail -f backend/logs/error.log
```

### Verify Database

```bash
psql -U postgres -d postgresTest

SELECT * FROM "PostgresTable";
```

### Common Issues

1. **Connection Refused**: Backend not running
2. **404 on all endpoints**: Wrong URL or port
3. **CORS error**: Check ALLOWED_ORIGINS in .env
4. **Validation always fails**: Check Content-Type header

---

**Happy Testing! 🧪**
