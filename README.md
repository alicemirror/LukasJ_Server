# LukasJ Server
This repository is part of the LukasJ project aiming to develop a RESTfulserver exchanging data through token 
authorization with a client.

The server is developed with NodeJs, JWT, Restify interfacing a MongoDB database

## Development Architecture
The image below shows the development and testing architecture where both the client and server have been developed

![Architecture](https://raw.githubusercontent.com/alicemirror/LukasJ_Server/master/images/DevelopmentArchitecture.jpg)

## Server configuration
The local parameters for the server configuration, IP adress, port etc. are all included in the config.js file
```
module.exports = {
    name: 'LukasJ-JWT',
    version: '0.0.2',
    JWT_SECRET  : 'jwt-secret-token-generator',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    db: {
        uri: 'mongodb://127.0.0.1:27017/lukas',
    },
}
```
## Version History
### 1.0.1 Server implementation with database access (two collections)
### 1.0.2 Implementation of the JWT token
- Added the routes in separate folders and introduced the routes versioning
- Modified the restful endpoints with the prefix /api 
- Known bugs: token is not generated correctly
- Rest path prefix should be reviewed
### 1.0.2 Release candidate
- SOLVED: the endpoints now works under the /api path
- SOLVED: JWT token generation bug has been solved due an internal bug of the NodeJS JWT library. Updated NodeJS and NPM to version 5.x and recreated the node_modules

## Server Test

![Architecture](https://raw.githubusercontent.com/alicemirror/LukasJ_Server/master/images/Postman.png)

The server Restful endpoints have been tested with Postman. The documented tests APIs calls are available on the public Postman [project documentation](https://documenter.getpostman.com/view/4048873/lukasj-jwt/RVu4HASS)

## Server Running
The server is launched with the command **node LukasJ.js** When the server is running provides an informational session log to the console.

![Architecture](https://raw.githubusercontent.com/alicemirror/LukasJ_Server/master/images/Server.png)

## Database Notes

![Architecture](https://raw.githubusercontent.com/alicemirror/LukasJ_Server/master/images/MongoDB.png)

The server is connected to a MongoDB databse storing data through the protected endpoints.
The actual version include the following collections:

- **Manager** Authorized users
- **Project** A test collection to store simply projects description and status

***Note: the actual 1.0.2 server version does not implement the Projects collection endpoints***
