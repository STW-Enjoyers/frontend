# Unizapp frontend
[https://unizapp.herokuapp.com/](https://unizapp.herokuapp.com/)  
Angular CLI: v13.3.1  
Node: v16.13.0
## Development environment
`npm run start`  
This environment is intended to be executed with backend in localhost.  
Development variables are located in `/src/environments/environment.ts`
## Production environment
`npm run start-prod`  
This environment is intended to be executed with backend deployed in Heroku.  
Production variables are located in `/src/environments/environment.prod.ts`

## Heroku
Heroku is configured to deploy all commits to main branch.  
Heroku starts the app reading from `Procfile`.
##Protractor
Config and test files are in `/e2e` directory.  
Set up:  
1. Run `npm install -g protractor`.  

Run tests:  
1. Run `npm run start-prod`. (Angular project must be running)  
2. Run `npm run e2e`.  
   (If this command fails, update your chrome version
using this command `sudo apt-get update && sudo apt-get --only-upgrade install google-chrome-stable`)

