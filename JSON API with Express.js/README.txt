The goal of this project was to learn how to use an express router to create a working api that records a users todo list. The "database" used for the project was a simple "storage" folder, and each "todo" object in the database was in a separate
.json file that contained a description (string), a completed variable (boolean), and an id (uuidv4) . We tested the router's capabilities using the Postman app. The following is a list of the routes created for this project:
  - GET /todo - response lists all todos in the storage folder
  - GET /todo/:todoId - response displays the todo corresponding to "todoId"
  - POST /todo - adds a new todo to the database
  - PUT /todo/:todoId - updates the information the todo in the database with the corresponding "todoId"
  - DELETE /todo/:todoId - deletes the todo with the corresponding "todoId"
