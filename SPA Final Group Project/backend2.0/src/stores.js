import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Store } from './util.js';
import itemsRouter from './items.js';

const storesRouter = Router();
itemsRouter.mergeParams = true;
storesRouter.use("/:store_id/items", itemsRouter);

// gets all stores
storesRouter.get('/stores', async (req, res) => {
    const stores = await Store.find();
    res.send(stores);
});

// gets a specified store based on id
storesRouter.get('/stores/:store_id', async (req, res) => {
    const storeId = req.params.store_id;
    
    // try to get the requested store from the database
    try {
        const store = await Store.findOne({ _id: storeId });
        console.log(store);
        if (store == null) {
            res.status(404);
            res.json({
                status: 404,
                message: 'Store not found',
            });
            return;
        }
        res.json(store);
    }
    // if failed, log error
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('');
    }
});

// create a new store
storesRouter.post('/stores', async (req, res) => {
    const storeBody = req.body;
    storeBody._id = uuidv4();
    
    // try to add the requested store to the database
    try {
        const newStore = await new Store(storeBody).save();
        console.log(newStore);
        res.status(201);
        res.json({
            status: 201,
            message: 'Created new store',
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

export default storesRouter;