# SR_CARDS_WEBHOOK API Documentation

## Introduction

The **SR_CARDS_WEBHOOK** collection provides endpoints for health checks, retrieving logs, and posting webhook data related to SR Cards. This documentation details each endpoint, including request and response examples, to help you integrate and test the API effectively.

---

## Endpoints

### 1. Health

- **Name:** Health
- **Method:** GET
- **URL:** `http://localhost:3000`
- **Description:** *(No description provided)*

#### Request
- No request body or parameters.

#### Response
- **Status Code:** 200 (Expected)
- **Example:** *(No example response provided)*

---

### 2. Logs

- **Name:** Logs
- **Method:** GET
- **URL:** `http://localhost:3000/sr-cards/logs`
- **Description:** *(No description provided)*

#### Request
- No request body or parameters.

#### Response
- **Status Code:** 200 (Expected)
- **Example:** *(No example response provided)*

---

### 3. Webhook

- **Name:** Webhook
- **Method:** POST
- **URL:** `http://localhost:3000/sr-cards/webhook`
- **Description:** *(No description provided)*

#### Request
- **Body Type:** `raw` (JSON)
- **Example Body:**
  ```json
  {
    "type": "test",
    "message": "hello_world"
  }