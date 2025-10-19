# Microservice Architecture Conversion TODO

## Common Microservice
- [ ] Move Utils/error.js to Common Microservice/common_functions/error.js
- [ ] Move Utils/verifyTocken.js to Common Microservice/common_functions/verifyTocken.js
- [ ] Move Utils/databaseConnection.js to Common Microservice/common_functions/databaseConnection.js
- [ ] Refactor Common Microservice/app.js to export utilities (error middleware, etc.) instead of running a server

## User Microservice
- [ ] Create User Microservice/app.js (Express server on port 3001, import common error handler)
- [ ] Move Controller/user.js to User Microservice/Controller/user.js
- [ ] Move Router/user.js to User Microservice/Router/user.js
- [ ] Move Model/userModel.js to User Microservice/Model/userModel.js
- [ ] Update imports in User Microservice files to use relative paths

## Chat Microservice
- [ ] Update Chat Microservice/app.js to import and use common error handler
- [ ] Move Controller/chat.js to Chat Microservice/Controller/chat.js
- [ ] Move Router/chat.js to Chat Microservice/Router/chat.js
- [ ] Move Model/chatModel.js to Chat Microservice/Model/chatModel.js
- [ ] Update Chat Microservice/api/chat.js if needed (seems empty, might need to recreate router)
- [ ] Update imports in Chat Microservice files to use relative paths and common utils

## Message Microservice
- [ ] Create Message Microservice/app.js (Express server on port 3003, import common error handler)
- [ ] Move Controller/message.js to Message Microservice/Controller/message.js
- [ ] Move Router/message.js to Message Microservice/Router/message.js
- [ ] Move Model/messageModel.js to Message Microservice/Model/messageModel.js
- [ ] Update imports in Message Microservice files to use relative paths

## General
- [ ] Ensure each microservice has its own package.json or shared dependencies
- [ ] Test starting each microservice individually
- [ ] Verify CORS and port configurations
