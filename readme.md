# Goverment Grant Reimburstment API &#x1F4D8;



&nbsp;

In the project directory, you can run:

### `npm install`
### `docker-compose up`

Runs the app in the development mode.\
Open docker desktop and ensure mongo_db is running on `port:27017` and express backend is running on `port:3001`

The server will reload if you make edits.

&nbsp;

## System Requirements
1. NodeJS
1. MongoDB

&nbsp;

## Environment variables (Example)
```

```

&nbsp;

## &#x1F34E;  Features



&nbsp;

## Structure Overview
#### Folders

<strong><em>controllers</em></strong> - contains list of app routes and associate them to a controller that contains implementation code.\
<strong><em>models</em></strong> - plain objects that represent business entities..\
<strong><em>resources</em></strong> - contains classes with response DTOs that used to encapsulate data and Joi validators.\
<strong><em>services</em></strong> - functions that contains code that interacts with MongoDB directly.\
<strong><em>dtos</em></strong> - data transfer objects used to encapsulate and transfer data between functions.\
<strong><em>errors</em></strong> - custom error middleware handler.



![Structure]()


&nbsp;

## Backend (EXPRESS)
Package Name | Description
--- | ---
nodemon | Automatically restarting the node application when file changes in the directory are detected
dotenv | Loads environment variables from a `.env` file
express | Minimalist web framework for node
mongodb | MongoDB driver for Node.js
mongoose | MongoDB object modeling tool designed to work in an asynchronous environment
bcryptjs | A library to help hash passwords.
cors | middleware that can be used to enable CORS with various options
joi | Object schema validation

&nbsp;

## Routes (Controller)



&nbsp;


&nbsp;



&nbsp;

## Improvements




&nbsp;

## &#x1F534; Warning
This application is a work in progress and the early stages of development. 
> Not for commercial use. Mavericks Consulting Pte Ltd ®