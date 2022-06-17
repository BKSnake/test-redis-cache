# test-redis-cache

## Install

### Run redis

Please install docker than run command

`docker run --name redis-server -d -p 6379:6379 redis`


### Run server


1. run `npm install`
2. execute `npm run dev`|
3. check `http://localhost:3000`


## Routes

`get /` - welcome route

`get /user` - get users in cache
`get /user/:id` - get user from cache and create fake if not exists
`post /user` - set user data
`put /user/:id` - update user by id 
`delete /user/:id` - delete user from cache

`delete /cache` - cleanup cache
