# Goverment Grant Reimburstment API &#x1F4D8;

&nbsp;

In the project directory,\
Create a `.env` file in the project directory and copy the environment variables provided below.

After creating you can run:

### `docker-compose up`

&nbsp;

If you wish to modify or make changes to the code:

### `npm install`

&nbsp;

Runs the app in the development mode.\
Open docker desktop and ensure mongo_db is running on `port:27017` and express backend is running on `port:3001`

The server will reload if you make edits.

&nbsp;

## System Requirements

- NodeJS
- MongoDB
- Docker

&nbsp;

## Environment variables (Example)

```
PORT=3001
DB_USERNAME=grant_user
DB_PASSWORD=grant_password
DB_HOST=mongo_db
```

&nbsp;

## Postman

Conveniently import the `Grant_API.postman_collection.json` file provided [here](https://github.com/kimikolim/government_grant_api/blob/master/public/Grant_API.postman_collection.json) into your postman app to import the routes and create new household and family members body objects.

Alternatively you can copy text provided in the `swagger.yaml` file [here]() and replace it in the online [swagger editor](https://editor.swagger.io/).

&nbsp;

## &#x1F34E; Features

1. Create Household
1. Add a family member to household
1. List all Households
1. Show one Household
1. Grant Disbursement endpoints
   - Student Encouragement Bonus
   - Family Togetherness Scheme
   - Elder Bonus
   - Baby Sunshine Grant
   - YOLO GST Grant

&nbsp;

## Structure Overview

#### Folders

<strong><em>controllers</em></strong> - contains list of app routes and associate them to a controller that contains implementation code.\
<strong><em>errors</em></strong> - custom error middleware handler.\
<strong><em>models</em></strong> - plain objects that represent business entities.\
<strong><em>resources</em></strong> - contains classes with response DTOs that used to encapsulate data and Joi validators.\
<strong><em>services</em></strong> - functions that contains code that interacts with MongoDB directly.\
<strong><em>utils</em></strong> - general reusable functions.

![Structure]()

&nbsp;

## Backend (EXPRESS)

| Package Name | Description                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------- |
| nodemon      | Automatically restarting the node application when file changes in the directory are detected |
| dotenv       | Loads environment variables from a `.env` file                                                |
| express      | Minimalist web framework for node                                                             |
| mongodb      | MongoDB driver for Node.js                                                                    |
| mongoose     | MongoDB object modeling tool designed to work in an asynchronous environment                  |
| cors         | middleware that can be used to enable CORS with various options                               |
| joi          | Object schema validation                                                                      |

&nbsp;

## Routes (House Controller)

| Type       | Controller | Route               | Description                                    |
| ---------- | ---------- | ------------------- | ---------------------------------------------- |
| **POST**   | /api/v1    | /create             | creates a new household                        |
| **GET**    | /api/v1    | /household          | retrieves all households from db               |
| **GET**    | /api/v1    | /household/:houseId | finds and retrieves a single household from db |
| **DELETE** | /api/v1    | /:houseId           | removes a single household and all occupants   |

&nbsp;

## Routes (Member Controller)

| Type       | Controller | Route                   | Description                           |
| ---------- | ---------- | ----------------------- | ------------------------------------- |
| **POST**   | /api/v1    | /create/:houseId/member | creates a new household family member |
| **DELETE** | /api/v1    | /:houseId/:id           | removes a single household occupant   |

&nbsp;

## Routes (Grant Controller)

| Type    | Controller    | Route                       | Description                                                                                                    |
| ------- | ------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **GET** | /api/v1/grant | /student-encouragment-bonus | retrieves households with `total annual income < 150k` & returns occupants with `age < 16yo`                   |
| **GET** | /api/v1/grant | /family-togetherness-scheme | retrieves households with occupant that is `MARRIED` and with a `spouse` & returns occupants with `age < 18yo` |
| **GET** | /api/v1/grant | /elder-bonus                | retrieves only `HDB` households with occupants with `age > 50yo`                                               |
| **GET** | /api/v1/grant | /baby-sunshine-grant        | retrieves households & returns occupants `age < 5yo`                                                           |
| **GET** | /api/v1/grant | /yolo-gst-grant             | retrieves only `HDB` households with `total annual income < 100k`                                              |

&nbsp;

## Assumptions Made

- Adding a new member to same household assumes no duplicates
- Occupation type `UNEMPLOYED` & `STUDENT` assumes income is zero
- Marital status `MARRIED` and any child in the same household assumed as children
- `SINGLE` & `DIVORCED` assumes occupant has no `spouse`
- Adding of members only allowed if a household already exists
  > Not allowed to create member without an existing valid household
- <strong>Bonus</strong>: Deletion of records are hard deletes
  > Data is not retained or stored
- <strong>Bonus</strong>: Deletion of household deletes all corresponding occupants

&nbsp;

## Improvements

- Data validation
- Unit Testing
- Modular folder restructure
- Ideally relational db eg. Postgres
- Authorisation and authentication
- Swagger API spec

&nbsp;

## &#x1F534; Warning

This application is a work in progress and the early stages of development.

> Not for commercial use. Mavericks Consulting Pte Ltd ®
