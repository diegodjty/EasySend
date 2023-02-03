# EasySend

## Description

EasySend allows you to share files with end-to-end encryption, files are deleted after being downloaded. So you can keep what you share private and make sure your stuff doesn't stay online forever

## Getting Started

### Clone repo
```
git clone https://github.com/diegodjty/EasySend.git
```

### Client

```
cd client
npm i
```
* Change env variables in next.config.js file
```
backendURL: 'YOUR BACKEND URL HERE',
frontendURL: 'YOUR FRONTEDN URL HERE'
```
* Start the client
```
npm run dev
```

* Open a new terminal to run server
### Server

```
cd server
npm i
```
* Change name of ".env.template" to ".env"
* Set env variables
```
DB_URL='MONGO DB URI HERE'
SECRET='THIS CAN BE ANY WORD'
CLIENT=_URL='CLIENT URL HERE'
```
* Start the server
```
npm run dev
```
## Authors
Diego Taveras(https://www.linkedin.com/in/diegotaveras/)
