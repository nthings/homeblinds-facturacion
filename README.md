# Rp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

## Ejecutar proyecto en una sola terminal

```shell
export PATH=$PATH:/mongodb-win32-x86_64-enterprise-windows-64-3.4.9/bin/
export PATH=$PATH:/node-v8.5.0-win-x64/
export PATH=$PATH:node_modules/typescript/bin
export PATH=$PATH:node_modules/@angular/cli/bin
export MONGODB_URI=mongodb://localhost:27017/users

npm run dev

```
## Ejecutar Mongo

En una terminal ejecutar:

```shell
export PATH=$PATH:/mongodb-win32-x86_64-enterprise-windows-64-3.4.9/bin/
mongod
```

## Ejecutar Transpilador de TypeScrypt para Node.JS
Actualiza el codigo a la carpeta dist/server.
En una terminal ejecutar:

```shell
export PATH=$PATH:/node-v8.5.0-win-x64/
export PATH=$PATH:node_modules/typescript/bin

tsc -w -p server
```

## Ejecutar Server Node.Js
Nodemon sirve para recargar el server cuando detecte cambios.
En una terminal ejecutar:

```shell
export PATH=$PATH:/node-v8.5.0-win-x64/
export MONGODB_URI=mongodb://localhost:27017/users

npm config set proxy "http://10.121.11.33:8080/"
npm i -g nodemon
nodemon dist/server/server
```

## Ejecutar Angular 4
En una terminal ejecutar:

```shell
export PATH=$PATH:/node-v8.5.0-win-x64/
export PATH=$PATH:node_modules/@angular/cli/bin

ng build --watch
```
