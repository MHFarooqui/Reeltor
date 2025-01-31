# Reeltor API  

Reeltor API provides user authentication, notification management, and user profile updates.  

## 🚀 Features  
- User Registration  
- User Login & Notification Retrieval  
- Admin Notification Management  
- Update User Data  

## 📌 Prerequisites  
- Node.js  
- Curl or any API testing tool (e.g., Postman, Thunder Client)  
- If you want to run the API locally, you will need to fill .env file with your Postgres DB credentials.

Or use the hosted version here: https://reeltor-jkfd.onrender.com/

---

## 🔹 1. User Registration  

Registers a new user with essential details.  

### **Endpoint:**  
`POST /api/User/register`  

### **Request:**  
```bash
curl -X POST 'http://localhost:5000/api/User/register' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "userName": "Demi01",
    "Password": "admin",
    "Mobile_number": "0123456789",
    "bio": "Hello! Khana khake jana."
}'
```

## 🔹 2. User Login & Notification Retrieval  

This endpoint allows a user to log in and fetch notifications based on their availability and criticality.  

### **Endpoint:**  
`POST /api/User/login`  

### **Request:**  
#### **Headers:**  
| Key            | Value                |
|---------------|----------------------|
| Accept        | application/json      |
| Content-Type  | application/json      |

#### **Body (JSON):**  
```json
{
  "userName": "DU01",
  "Password": "admin"
}
```

### **Request:**  
```bash
curl  -X GET \
  'http://localhost:5000/api/User/login' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
   "userName": "DU01",
  "Password": "admin"
}'
```

## 🔹 3. Admin Notification  

This endpoint allows an admin to send notifications to either a specific user or all users.  

### **Endpoint:**  
`POST /api/admin/send`  

### **Request:**  
#### **Headers:**  
| Key            | Value                |
|---------------|----------------------|
| Accept        | application/json      |
| Content-Type  | application/json      |

#### **Body (JSON):**  
```json
{
  "NoticeContent": "Just a demo51",
  "userid": 1,
  "SpecificUser": false,
  "isCritical": false
}
```

### **Request:**  
```bash
curl -X POST 'http://localhost:5000/api/admin/send' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "NoticeContent": "Just a demo51",
    "userid": 1,
    "SpecificUser": false,
    "isCritical": false
}'
```

## 🔹 Update User Data  

This endpoint updates a user’s details, including their availability times.  

### **Endpoint:**  
`PUT /api/User/update/{userId}`  

### **Request:**  

#### **Headers:**  
| Key            | Value                      |
|---------------|----------------------------|
| Accept        | application/json            |
| Authorization | Bearer `<JWT_TOKEN>`        |
| Content-Type  | application/json            |

#### **Body (JSON):**  
```json
{
  "userName": "DU01",
  "Password": "admin",
  "mobile_number": "4578963210",
  "bio": "Hello again",
  "availability_from": "10:20:30",
  "availability_till": "20:20:30"
}
```

### **Request:**  
```bash
curl -X PUT 'http://localhost:5000/api/User/update/2' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <JWT_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "userName": "DU01",
    "Password": "admin",
    "mobile_number": "4578963210",
    "bio": "Hello again",
    "availability_from": "10:20:30",
    "availability_till": "20:20:30"
}'

```