### 1. Set up server. 
Install express, body-parser, concurrently, mongoose. Set up nodemon as dev dependency with -D. Set up proxy at port whatever. Change main app start spot:  "main": "server.js", and set "proxy": `"http://localhost:5000"`

### 2. Set up scripts: 
    - "client-install": "npm install --prefix client",
    - "start": "node server.js",
    - "server": "nodemon server.js",
    - "client": "npm start --prefix client", (run just the client)
    - "dev": "concurrently \"npm run server\" \"npm run client\""

### 3. Create server.js file in the root of whole project. Connect mongoDB.
```javascript
const db = require('./config/keys').mongoURI;
mongoose.connect(db).then(() => console.log("mongoDBconnected")).catch(err => console.log(err));
```

### 4. Start server 
```javascript
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
```

### 5. Create models in `models` folder. 
Import any models into server.js and connect with ```app.use``` middleware.

```javascript
var mongoose = require("mongoose");
//const validator = require("validator");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },

  stocks: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Stock" 
  },

  email: {
    type: String,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid email address'})
      }
    }
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
```

### 6. Create routes 
Add any new routes to server.js. Test routes with POSTMAN 

`// Middleware`
`app.use('/api/user', user);`

```javascript
const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Routes
//GET Users
router.get('/', (req, res) => {
    User.find()
    .sort({ date: -1})
    .then(user => res.json(user))
});

// Add new user
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name
    });

    newUser.save().then(user => res.json(user));
});

module.exports = router;
```

# Client 

### 1. Create client folder 
`create-react-app .` in  `client` folder 
**important**  add `"proxy": "http://localhost:5000",` in client package.json, so that you don't have to start each endpoint with  `http://localhost:5000`, but instead can just do `/`

### 2. Install material design (in client package.json)
include in app.js file. import components in as you need them.
`npm install @material-ui/core`
`npm install @material-ui/icons`
In public/index.html, add in CDN 
`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />`
`<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />`

Then import material icons in component as needed

### 3. Create components for react 
Create components folder in src. create fast react class component with **rcc <tab>**

### 4. Install redux
npm i redux react-redux redux-thunk in `client` folder

### 5. Create inital redux store and import into app.js 
create store.js file in src folder in client. This will be the store for the whole application. the only way to change is to dispatch action on it. `rootReduce` is imported into this file

In order to implement this store into our application, we need to bring in `provider` into app.js. This is from `react-redux` and is the glue between react and redux. We need to wrap entire application with this `provider` so the whole application can access the store 

### 6. Create reducers 
create reducers folder in src folder. first create `rootReducer`, which is index.js. The point of rootreducer is to bring in all our other reducers. A reducer is needed for each state item per se. (EX: need reducer for stocks, need reducer for authentication, etc)

```javascript
import { combineReducers } from 'redux';
import stockReducer from './stockReducer';

// combine all reducers in applicatio here
export default combineReducers({
    stock: stockReducer
})
```
Reducer is where the actual state is going to go in the application. actions get items and communicate to these reducers. actions can send along payloads to reducers 

### 7. Create actions folder 
create actions folder in `src`. 
All actions need types. Then bring these types into reducer

```javascript
//    types.js
//usually you have action type for anything you're going to "do" or "change" in your application

export const GET_STOCKS = 'GET_STOCKS';
export const ADD_STOCK = 'ADD_STOCK';
export const DELETE_STOCK = 'DELETE_STOCK';
```

for each action (action type), there needs to be a switch case so the reducer can act on the application state depending on the action

```javascript
//  stockReducer.js
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_STOCKS:
            return {
                ...state
            }
        default:
            return state;
    }
}
```

```javascript 
// stockAction.js
import { GET_STOCKS, ADD_STOCK, DELETE_STOCK } from './actions/types';


// we call these actions from within the component 
export const getStocks = () => {
    return {
        type: GET_STOCKS
    }
}
```

### 8. Adding redux state to react components
actions are called from react components. 
must import connect (to connect react and redux) and the action function into the react compoment

`import { connect } from 'react-redux';`
`import { getStocks } from '../actions/stockActions';`
`import PropTypes from 'prop-types';`

then, when we export react component, we export with `connect()` to connect that component with `store` on export 

we also need to map props to actions with mapStateToProps

```javascript
// stock is what we used in rootReducer 
const mapStateToProps = state => ({
  stock: state.stock
}) 

export default connect(mapStateToProps, { getStocks })(StockTable);
```


any actions that need to be called should be called in functions in react component 

```javascript 
   componentDidMount() {
    this.props.getStocks();
  }

  onDeleteClick = (id) => {
    this.props.deleteStock(id);
  }
```

### 9. Redux Form 
If a component is hooked to redux, it is called a `container`

just because we're storing state in redux, doesnt mean components shouldnt have their own state. for example, modal or popup state dont need to be stored in redux. When you're creating a form for example, you always want state to be in the component 


### 10. Pattern for adding things with redux 
1. Add action to ___Actions.js file 
2. Add case to reducer (what happens)



### 11. Initial state 
Add "loading" value to inital state 
npm install axios 

# Deploy
Because we're running both a node and cleint server at the same time, we need to make changes to our server.js file to tell it to serve react act if its not hitting API. This is postbuild script 

```javascript
// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder

    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
```

`scripts`
```javascript
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

```
### 13. Log in to heroku on command line with heroku login
then, heroku create 

had to eliminate redux dev tools for production 

# User Auth 
### 1. Create user model, then create route to register user 
```javascript
app.use('/api/user', require('./api/user'));
app.use('/api/stocks', require('./api/stocks'));
```

side note, dont need body-parser anymore. it's included in express 

### 2. Implementing Json web tokens 
npm i jsonwebtoken
npm i config (for hiding env variables)

in config folder, create "Default.json" file for storing env variables 
`const config = require('config');`
`const db = config.get('mongoURI');`

Now, we have to sign tokens when response is sent back from server. user.id will be in json web token so we can access it 

```javascript 
...
newUser.save()
.then(user => {
  // sign jwt web token 
  jwt.sign({
      id: user.id,
      name: user.name
  },config.get('jwtSecret'),
  { expiresIn: 3600 },
  (err, token) => {
      if(err) throw err;
      res.json({
          token: token,
          user: {
              id: user.id,
              name: user.name,
              email: user.email
          }
      })
  }
  )
});
```

Now, whether user registers or signs in, response from the server will be the same. token and then user object 

### 3. Middleware for auth 
Create middleware folder in root, with authorize.js file 
create authorize function thast checks request header for token. If no token , send back 401 status (unauthorized)

### 4. To protect any route and make sure user is logged in
`const authorize = require('../middleware/authorize');`

then put authorize as second argument in any api request

### 5. Create route in authorize.js to check/ get current user
This gets current users information by using the token.
We need to do this because jwt authentication is stateless. There are no sessions, and no data is stored in memory.
So we need to constantly valdiate that the user is logged in. So we need a route that takes the token and returns the user data    

```javascript
// returns user
router.get('/user', authorize, (req, res) => {
    User.findById(req.user.id)
    .select('-password')    //ignores password and doesnt return it
    .then(user => res.json(user));
})
```


# Implementing authorization into Redux 
