# Bagholder Bets

Bagholder Bets is a MERN Stack Psuedo Stock Trading Platform allowing users to buy and sell stock, analyze technical metrics, and read stock news.
[Visit Application here](https://www.bagholderbets.com/welcome)

![alt text](/client/src/assets/Bagholdersbetslaptop1.png)

## Motivation

One of my favorite apps of all time is [Robinhood](https://robinhood.com/). One app disrupted the entire trillion dollar investing industry. I wanted to see how much functionality I could replicate.

## Features

- Client-server design with mobile-first responsive front end using React styled with React-Bootstrap and NodeJS/ Express backend to execute MongoDB CRUD operations, using Redux to connect them both and provide a global state store
- User login and signup authorization with JSON web token (JWT) for private route protection/access control and identification
- Configured testing automation continuous integration/ deployment (CI/CD) to Heroku with git version control using Github pipeline

## Technology

> <img src="/client/src/assets/js.svg" width="40px"> <img src="/client/src/assets/react.svg" width="40px"> <img src="/client/src/assets/react-bootstrap.png" width="40px"> <img src="/client/src/assets/node.svg" width="40px"> <img src="/client/src/assets/express.svg" width="40px"> <img src="/client/src/assets/mongodb.svg" width="40px"> <img src="/client/src/assets/redux.png" width="40px"> <img src="/client/src/assets/heroku.svg" width="40px"> <img src="/client/src/assets/git.svg" width="40px">

- React and JavaScript on the frontend
- Styled with React-Bootstrap
- NodeJS for runtime environment
- Express for the server
- Redux for state management
- MongoDB for the database
- Axios for promise-based requests to backend
- Hosted with Heroku
- Git and Github for version control

## Usage

Clone the repository and create a .env file in the project root and add in your mongoDB URI, jwt secret, and api keys from IEX

```text
mongoURI="YOUR_API_TOKEN"
jwtSecret="YOUR_API_TOKEN"
iexToken="YOUR_API_TOKEN"
REACT_APP_IEX_TOKEN="YOUR_API_TOKEN"
```

To deploy locally and run server and client with concurrently:

```javascript
npm run dev
```

## License

The project is licensed under the MIT License.
