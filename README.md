Enviroment 

//Create project <br/>
npm init -y <br/>
npm install typescript --save <br/>
npm install ts-node --save-dev <br/>
npm install --save @types/node <br/>
(tsc --help)<br/>
tsc --init <br/>

npm install nodemon  <br/>
package.json <br/>
```
"scripts": { 
    "start:build": "tsc -w", 
    "start:run": "nodemon build/index.js",
    "start": "concurrently npm:start:*"
  },
```
//Run: ts-node index.ts

//solidity
npm install --save solc ganache-cli web3 <br/>
npm install --save @truffle/hdwallet-provider <br/>

//ganache-cli is only compatible with node12
nvm install 12 <br/>
nvm use --delete-prefix v12.18.2 <br/>

//test
npm install --save mocha <br/>
npm install --save @types/mocha <br/>
npm install assert --save-dev <br/>
npm install @types/assert --save-dev <br/>

"test": "mocha --require ts-node/register src/test/*.ts" <br/>

npm test <br/>

//API 
npm install express body-parser cookie-session <br/>
npm install @types/express @types/cookie-session @types/body-parser <br/>
npm i reflect-metadata --save <br/>
tsconfig.json -> <br/>
```
"experimentalDecorators": true
"emitDecoratorMetadata": true 
```
