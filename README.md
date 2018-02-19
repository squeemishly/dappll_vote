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

- How do we incorporate validating the pin that the user receives in the mail?
- How do we authenticate a user login with both email and SSN at the same time?
- Do we add a TTL to the JWT?
- Add an authentication to the SSN.
