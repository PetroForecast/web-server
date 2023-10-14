## Web-server for PetroForecast

### Scripts
`npm run develop`
`npm run coverage`

Basic file structure:- jest will register all files either in a tests folder or any file with .test.js at the end. In my code I did both. 
When writing a jest test, make sure to include any files needed to test the code, like react component libraries or files that are referenced within the code.

Jest commands:- npm test - will run all test in file
npm test {file name} - will run specific files (Note: it will run files that include the words specified in the command, so if you have one file named tester and another name nodetester, it will run both.)
npm run coverage - will run a coverage report

Basic set up of test:
Basic test:const filename = require({location of file});
//^Here we import all of the functions from this file and give it the same name as the file
// we access this function by running filename.function(parms)