## Documentation

## Generate Token 

- route:
  - `POST /generate_token`
- response:
  - body
    - `Authorization`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjIwNDIwNDU3Mjc5NzE5NCwidmFsdWUiOjIwNDIwNDU3Mjc5NzE5NCwiaWF0IjoxNjMwODIzMjg1fQ.Yi5VLRNPh0rZ-6mof8OYJFiwn768bze6KorgjDOpE4U`
  - body
    - `200`: `Token Generated`
- error:
  - `500 Internal Server Error`

```
- Token generated for 30 minutes

- Token has an object that is stored in Redis
```

## Create User

- route:
  - `POST /create`
- request:
  - headers
    - `{ Authorization: token }`
  - body
    - `{ userName: 'userName', accountNumber: 'accountNumber', emailAddress: 'emailAddress@mail.com, identityNumber: identityNumber }`
- response:
  - `201`: `{ _id: id, userName: 'userName', accountNumber: 'accountNumber', emailAddress: 'emailAddress@mail.com, identityNumber: identityNumber }`
- error:
  - `500 Internal Server Error`
  - `400 Validation Error`

```
- Token is validated with JWT and checked if has same value in Redis
- Email validation: unique email and valid email format
```

## Read User by Account Number

- route:
  - `GET /read/account_number/:accNum`
- request
  - headers
    - `{ Authorization: token }`
- response
  - `201`: `{ _id: id, userName: 'userName', accountNumber: 'accountNumber', emailAddress: 'emailAddress@mail.com, identityNumber: identityNumber }`
- error:
  - `500 Internal Server Error`
  - `400 Bad Request`
```
- Token is validated with JWT and checked if has same value in Redis
- Get AccountNumber from Redis first, if it does not exit, get data from DB through backend_microservice
```

## Read User by Identity Number

- route:
  - `GET /read/identity_number/:idNum`
- request
  - headers
    - `{ Authorization: token }`
- response
  - `200`: `{ _id: id, userName: 'userName', accountNumber: 'accountNumber', emailAddress: 'emailAddress@mail.com, identityNumber: identityNumber }`
- error:
  - `500 Internal Server Error`
  - `400 Bad Request`

```
- Token is validated with JWT and checked if has same value in Redis
- Get IdentityNumber from Redis first, if it does not exit, get data from DB through backend_microservice
```

## Update User By Account Number

- route:
  - `PATCH /update/account_number/:accNum`
- request
  - headers
    - `{ Authorization: token }`
  - body
    - `{ userName: 'userName', emailAddress: 'emailAddress@mail.com, identityNumber: identityNumber }`
- response
  - `200`: `{ n: 1, ok: 1, nModified: 1 }`
- error:
  - `500 Internal Server Error`
  - `400 Bad Request`

```
- Token is validated with JWT and checked if has same value in Redis
```

## Update User By Identity Number

- route:
  - `PATCH /update/identity_number/:idNum`
- request
  - headers
    - `{ Authorization: token }`
  - body
    - `{ userName: 'userName', emailAddress: 'emailAddress@mail.com, accountNumber: accountNumber }`
- response
  - `200`: `{ n: 1, ok: 1, nModified: 1 }`
- error:
  - `500 Internal Server Error`
  - `400 Bad Request`

```
- Token is validated with JWT and checked if has same value in Redis
```

## Delete User By Account Number

- route:
  - `DELETE /delete/account_number/:accNum`
- request
  - headers
    - `{ Authorization: token }`
- response
  - `200`: `{ n: 1, ok: 1, deletedCount: 1 }`
- error:
  - `500 Internal Server Error`
  - `400 Bad Request`

```
- Token is validated with JWT and checked if has same value in Redis
```

## Delete User By Identity Number

- route:
  - `DELETE /delete/identity_number/:idNum`
- request
  - headers
    - `{ Authorization: token }`
- response
  - `200`: `{ n: 1, ok: 1, deletedCount: 1 }`
- error:
  - `500 Internal Server Error`
  - `400 Bad Request`

```
- Token is validated with JWT and checked if has same value in Redis
```