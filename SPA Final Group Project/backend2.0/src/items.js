import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Item } from './util.js';

const itemsRouter = Router();

// get all items from the current store
itemsRouter.get('/stores/:store_id/items', async (req, res) => {
    const items = await Item.find({store_id: req.params.store_id});
    res.send(items);
});

// get a specified item from the current store (using item id)
itemsRouter.get('/stores/:store_id/items/:item_id', async (req, res) => {
    const itemId = req.params.item_id;

    // try to get the requested item from the current store
    try {
        const item = await Item.findOne({ _id: itemId, store_id: req.params.store_id });
        console.log(item);
        if (item == null) {
            res.status(404);
            res.json({
                status: 404,
                message: 'Item not found',
            });
            return;
        }
        res.json(item);
    }
    // if failed, log error
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('');
    }
});

// add a new item to the store
itemsRouter.post('/stores/:store_id/items', async (req, res) => {
    const itemBody = req.body;
    itemBody._id = uuidv4();
    itemBody.store_id = req.params.store_id;

    // try to add the requested item to the store
    try {
        const newItem = await new Item(itemBody).save();
        console.log(newItem);
        res.status(201);
        res.json({
            status: 201,
            message: 'Added new item to the store',
        });
    }
    // if failed, log error
    catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            status: 500,
            message: error,
        });
    }
});

export default itemsRouter;