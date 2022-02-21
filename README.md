# WhereTo

WhereTo is a scalable location-sharing social application run on MERN Stack (MongoDb, Express.js, React.js, and Node).

## Features

* Authentication System
  * Encrypted passwords
  * JWS Token to ensure authentication and authorization (public | Logged-in) 
* APIs
  * Various APIs to perform CRUD operations
* Add/manage/display locations (Google Maps/Google Geocoding APIs)
* Store Images
   
### Deployed website: [In Progress]

## Developer Guide

### Technologies and Software Used:

* Stack: MongoDb, Express.js, React.js, Node
* Third-party component: JWT, Bcrypt.js, Mongoose
* Third-party APIs: Google Maps, Google Geocoding
* Additional Tools: Mongodb Connect, Postman

### Required Downloads

MongoDb, Express.js, React.js, Node.js, Npm

## Setup 

### Backend
1. First clone the given repo and locate repo in local folder directory
2. `cd /WhereTo/Backend`
3. `npm install` to install all dependencies used in project
4. (MongoDb) Change connection string in `app.js` file to the appropriate database on your end
6. `npm start` to start up the server (@port 5000) to start handling API calls

### Frontend
2. `cd /WhereTo/Frontend`
3. `npm install` to install all dependencies used in project
5. `npm start` to start project

## Previews:
![Login page](https://user-images.githubusercontent.com/44854519/146817481-391c33c3-b161-42c0-bff9-64dc61b9a445.png)
![Homepage](https://user-images.githubusercontent.com/44854519/146817516-0bcdffd4-34bf-40c6-b250-089f4e3fb412.png)
![product details](https://user-images.githubusercontent.com/44854519/146817522-9cb56fa4-18ed-4729-8f78-57b6d54850e4.png)
![search](https://user-images.githubusercontent.com/44854519/146817525-9e648693-d64f-46ae-9517-fcd463007553.png)

## Versions:
    1.0.0: Listed features added and implemented
    
## Future Features to Be Added
1. Storing Images
2. Finish JWT Token implementation for authorization and authentication
    
