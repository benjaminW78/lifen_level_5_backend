# Lifen Level 5 backend
## Description
This project is the back-end part of the lifen test level5
It's created with `nodeJs` and `express` and deployed on heroku.

This is a full working server api  which allow you to manage workers and shifts and to know the service fee and total fee for every programmed shifts

## Features

### Shifts
- Shifts crud operations.

### Workers
- Workers crud operations.

## Tree
```
./
├── README.md
├── app.js
├── configuration.js
├── package-lock.json
├── package.json
└── src
    ├── api // contain interface code and nodejs express router
    │   ├── pricing.js
    │   ├── router.js
    │   ├── shifts.js
    │   └── workers.js
    ├── collections // mongodb collection schema (made with mongoose)
    │   ├── days_cost_schema.js
    │   ├── shifts_schema.js
    │   └── workers_schema.js
    ├── modules // profession code
    │   ├── const_errors.js
    │   ├── const_workers_status_pricing.js
    │   ├── pricing.js
    │   ├── shifts.js
    │   └── workers.js
    └── services // external services
        └── database.js

```