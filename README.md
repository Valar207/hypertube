# HyperTube project
Popcorntime like app
![alt text](client/public/img/git_img/homepage.PNG)
![alt text](client/public/img/git_img/listMovies.PNG)
![alt text](client/public/img/git_img/movie.PNG)
## Dependencies
To start this website you need to have installed `nodejs`
### Launch app
go to client root and run
```shell
npm install
npm start
```
go to server root and run
```shell
npm install
npm start
```
## Requirements
You will need a .env file in server directory
```
PORT=5000
SITEURL=...
NODEMAILER_USER=...
NODEMAILER_PASSWORD=...
JWT_SECRET=...
DEFAULT_USER_IMAGE=https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png
DB_URL=mongodb+srv://<username>:<password>@cluster0.sj8fw.mongodb.net/hypertube?retryWrites=true&w=majority
OAUTH_GOOGLE_CLIENT_ID=...
OAUTH_GOOGLE_CLIENT_PASSWORD=...
OAUTH_42_CLIENT_ID=...
OAUTH_42_CLIENT_PASSWORD=...
COOKIE_KEY=...
```
