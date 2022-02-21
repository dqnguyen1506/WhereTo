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

# Previews:
#![Screenshot 2022-02-20 at 21-52-48 React App](https://user-images.githubusercontent.com/44854519/154897306-5c7edee4-9e60-48ec-98a4-db11333608a9.png)
![Screenshot 2022-02-20![Screenshot 2022-02-20 at 21-53-44 React App](https://user-images.githubusercontent.com/44854519/154897354-4b2f3f35-a176-4255-a3da-3c9d561701ef.png)
 at 21-53-16 React App](https://user-images.githubusercontent.com/44854519/154897335-986a3897-4201-4718-a4ec-b27e495d0e14.png)
![Screenshot 2022-02-20 at 21-53-31 React App](https://user-images.githubusercontent.com/44854519/154897341-4af609b9-0bf3-4271-a749-fab603403a58.png)
![Screenshot 2022-02-20 at 21-52-11 React App](https://user-images.githubusercontent.com/44854519/154897350-754ca2c6-b909-431e-bbfb-5c2dd5e0d0f8.png)


## Versions:
    1.0.0: Listed features added and implemented
    
## Future Features to Be Added
1. Storing Images
2. Finish JWT Token implementation for authorization and authentication
    
