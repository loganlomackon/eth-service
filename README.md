Enviroment 

//Create project
npm init -y 
npm install typescript --save
npm install ts-node --save-dev
npm install --save @types/node 
(tsc --help)
tsc --init

npm install nodemon 
package.json
"scripts": {
    "start:build": "tsc -w",
    "start:run": "nodemon build/index.js",
    "start": "concurrently npm:start:*"
  },
//Run: ts-node index.ts

//solidity
npm install --save solc ganache-cli web3
npm install --save @truffle/hdwallet-provider

//ganache-cli is only compatible with node12
nvm install 12
nvm use --delete-prefix v12.18.2

//test
npm install --save mocha
npm install --save @types/mocha
npm install assert --save-dev
npm install @types/assert --save-dev

"test": "mocha --require ts-node/register src/test/*.ts"

npm test

//API
npm install express body-parser cookie-session
npm install @types/express @types/cookie-session @types/body-parser
npm i reflect-metadata --save
tsconfig.json -> 
"experimentalDecorators": true
"emitDecoratorMetadata": true 

