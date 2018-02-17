# D'App'll Vote!

This app is designed to help people living overseas or serving in the military to vote. It was started during a 36 hour sprint at the EthDenver hackathon.

## Dev Setup:

#### 0:  
$ psql  
CREATE DATABASE dappll_vote;  
CREATE DATABASE dappll_vote_test;  

#### 1:  
$ knex migrate:latest  

#### 2:  
In config/dev.js:  
    module.exports = {
      jwtKey: "typeSomeRandomCharactersUntilYouAreSatisfiedWithTheLength"
    }

#### 3:  
Include in .gitignore
- .gitignore
- yarn.lock
- node_modules
- config/dev.js

## Things to think about for future iterations:

- How do we incorporate validating the pin that the user receives in the mail?
- How do we authenticate a user login with both email and SSN at the same time?
