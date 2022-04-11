# Unizapp frontend
[https://unizapp.herokuapp.com/](https://unizapp.herokuapp.com/)  
Angular CLI: v13.3.1  
Node: v16.13.0
## Development environment
`npm run start`  
This environment is intended to be executed with backend in localhost.  
Development variables are located in `/src/environments/environmentGrade.ts`
## Production environment
`npm run start-prod`  
This environment is intended to be executed with backend deployed in Heroku.  
Production variables are located in `/src/environments/environment.prodGrade.ts`

## Heroku
Heroku is configured to deploy all commits to main branch.  
Heroku starts the app reading from `Procfile`.

## Protractor
Config and test files are in `/e2e` directory.  
Set up:  
1. Run `npm install -g protractor`.  

Run tests:  
1. Run `npm run start-prod`. (Angular project must be running)  
2. Run `npm run e2e`.  
      (If this command fails, update your chrome version
   using this command `sudo apt-get update && sudo apt-get --only-upgrade install google-chrome-stable`.)  
      (If command keeps failing, update webdriver too `node node_modules/protractor/bin/webdriver-manager update`)

## Error handling  
![errorHandling](https://user-images.githubusercontent.com/45805074/162187709-668f8276-c2f7-45cd-9e05-cc9258c43d47.png)
All server and client exceptions that hasn't been handled by other classes, are handled
by GlobalErrorHandling class and later are notified and logged in the app.
