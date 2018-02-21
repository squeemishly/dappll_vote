# D'App'll Vote!

This app is designed to help people living overseas or serving in the military to vote. It was started during a 36 hour sprint at the EthDenver hackathon.

## Dev Setup:

#### 0:  
$ psql  
CREATE DATABASE dappll_vote;  
CREATE DATABASE dappll_vote_test;  

#### 1:
$ cd dappll_vote
$ knex migrate:latest  

#### 2:
- Create a JWT_KEY in a .env file in the root of the project.
`JWT_KEY=<YOUR KEY>`

#### 3:  
Include in .gitignore
- yarn.lock
- node_modules
- config/dev.js
- client/build

### 4:
Install everything:
- yarn install
- cd client && yarn install

### 5:
Setup your blockchain environment
- truffle develop
- truffle(develop)> compile
- truffle(develop)> migrate

## Things to think about for future iterations:

- On page refresh, check for a JWT in localStorage. If there is a JWT and it isn't expired (see next), check the JWT on the backend and if valid, return user. Perform this request from an action creator that is dispatched from a componentDidMount() lifecycle hook in App.js.
- Do we add a TTL to the JWT? Possibly set an expiration time in local storage, checking that the time hasn't expired on page refresh
