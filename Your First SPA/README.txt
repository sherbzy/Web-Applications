This project occurred right after the "JSON API with Express.js" project and basically added a frontend component to the express backend in order for students to create their first single-page application. The react frontend fetched data from
the express backend and displayed the data on a series of user-friendly pages (but please note that they're not very creative or colorful). As seen in /frontend/src/index.js, the following paths were created:
  - /todo - shows a list of all todo objects
  - /todo/:todoId - shows a detailed view of this specific todo object
  - /todo/new - presents a form that can be used to create a new todo object

