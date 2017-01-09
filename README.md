# sead_ecofig_effigy

Visualization prototype for reconstructed environmental markers (Ecofigs) in [SEAD](http://www.sead.se/)/[Bugs CEP](http://bugscep.com/).

## Project Objectives

* To create a boilerplate for JavaScript applications focusing on the tool chain.
* Enable use of npm packages in browser applications (> 350 000 packages)
* Enable use of features in latest version(s) of JavaScript 
* Use npm to simplify dependency management
* Simplify deploy using a bundler
* Enable code linting i.e. code analysis and error detection
* Enable use of task runners for minification, optimazation etc.
* Enable unit testing

## Demo

A fully working live demo can be tested at http:// (demo currently offline)

## Getting Started

These instructions will setup a local copy of the project for development and testing.
See deployment for notes on how to deploy the project on a live system.

### Development Setup

Clone the repository:
```
$ git clone https://github.com/humlab/sead_ecofig_effigy.git
```
Move to folder and install dependencies (node modules):
```
$ cd sead_ecofig_effigy
$ npm install
```
Do a full build of all assets. Note that the glTF-files are converted to glb-files. 
```
$ npm run build:assets
```
Currently, the system uses static data found in ./geo2.json.
Start the webpack-dev-server at port 8080.
```
$ npm run dev:server
```
You can also use any lightweight webserver that can serve static files from a folder.  
If you have Python >= 3.4 installed you can start the http.server:
```
$ npm run python:server
```
Or you can install and start a lightweight node server:
```
$ npm install -g httpserver
$ npm run python:server
```
## Running Tests
Test can be run in any web browser using the webpack-dev-server, or from the terminal (with Node.js). 
First you need to build the tests:
```
$ npm run test:build
```
Then start the (webpack) web server and opens a Mocha test page in the default browser with file watch and hot reload:
```
$ npm run test:server
```
The test results are now avaliable att http://localhost:8090/testBundle.

### Configuration

## Deployment
Create a release build:
```
$ npm run build:release
```
All necessery files now reside in the ./public folder. Copy these files to the web server (of your choise) and serve them as static resources.

## Built With

* [Cesium](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Webpack](https://maven.apache.org/) - Bundler

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


