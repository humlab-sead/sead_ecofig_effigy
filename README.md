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
Move to folder and build assets:
```
$ cd sead_ecofig_effigy
$ npm install
$ npm run build:assets
```

## Running Tests
Test can be run in a browser (using webpack-dev-server) or from the  the command line (with Node.js). 
You can build tests using the "test-build" script:
```
$ npm run test:build
```
The following command starts the web server and opens a Mocha test page in the default browser with file watch and hot reload:
```
$ npm run test:server
```
The test results are avaliable att http://localhost:8090/testBundle.

### Configuration

## Deployment

## Built With

* [Cesium](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Webpack](https://maven.apache.org/) - Bundler

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


