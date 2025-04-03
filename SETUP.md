# Setup
To set up your machine to run these tests, we will need cypress, as well as some additional packages for parallel execution and reporting.
## Run the following
`npm install cypress`

`npm install cypress-multi-reporters --save-dev`

`npm install cypress-parallel -D`

# Running

To run the app, navigate to the source folder and run 

`npm run cy:parallel`  

Results will be in the `runner_results` folder, and screenshots of failed tests in `cypress/screenshots`.
There is an example screenshot of a test failure already, from when I modified one of the tests to fail for a demonstration






