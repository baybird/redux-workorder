# nodejs-express-react-mongo

A demo of using React + Node.js + MongoDB + Express + REST API

## Runing

Creat data folder
```bash
$ mkdir data
```

Start MongoDB server
```bash
$ mongod --dbpath data

# Run mongod in the background
$ sudo service mongod restart
$ sudo service mongod status

# or
# The MongoDB daemon (mongod) has a command-line option to run the server in the background...
# --fork
$ mongod --fork --logpath /var/log/mongod.log
```

Install dependencies
```bash
$ npm install
```

Start server
```bash

$ npm start

OR

$ nodemon server.js

Run backend service on background
    $ sudo npm install forever -g
    $ forever start -c nodemon server.js

```

Open
```bash
$ open localhost
```
OR
```browser
http://localhost:3000
```
