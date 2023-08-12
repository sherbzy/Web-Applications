import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';

const todoRouter = Router();


// GET /todo - response lists all todos in storage folder
todoRouter.get('/', async (req, res) => {
    console.log("getting all todos");
    const directoryContents = await fs.readdir('storage/');
    const allTodos = {
        todos: [],
        count: directoryContents.length
    }

    for (const entry of directoryContents) {
        const contents = await fs.readFile(`storage/${entry}`);
        allTodos.todos.push(JSON.parse(contents));
    }

    res.send(allTodos);
});


// GET /todo/:todoId
todoRouter.get("/:todoId", async (req, res) => {
    console.log("getting todo by id");
    const todoId = req.params.todoId;
    try {
        const todoFound = await fs.readFile(`storage/${todoId}.json`);
        res.json(JSON.parse(todoFound));
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('');
    }
});


// POST /todo
todoRouter.post("/new", async (req, res) => {
    console.log("posting new todo");
    const requestBody = req.body;
    requestBody.id = uuidv4();
    await fs.writeFile(`storage/${requestBody.id}.json`, JSON.stringify(requestBody));
    res.status(201);
    res.send('');
});

// PUT /todo/:todoId
todoRouter.put("/:todoId", async (req, res) => {
    console.log("updating a todo by id");
    const todoId = req.params.todoId;
    const requestBody = req.body;
    requestBody.id = todoId;
    try {
        await fs.writeFile(`storage/${todoId}.json`, JSON.stringify(requestBody));
        res.status(201);
        res.send('');
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('');
    }
})


// DELETE /todo/:todoId
todoRouter.delete("/:todoId", async (req, res) => {
    console.log("deleting a todo by id");
    const todoId = req.params.todoId;
    try {
        await fs.unlink(`storage/${todoId}.json`);
        res.status(201);
        res.send('');
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('');
    }
})

export default todoRouter;