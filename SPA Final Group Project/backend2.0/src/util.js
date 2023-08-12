import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export const Store = mongoose.model('stores', {
    _id: mongoose.SchemaTypes.String,
    name: mongoose.SchemaTypes.String
});

export const Item = mongoose.model('items', {
    _id: mongoose.SchemaTypes.String,
    name: mongoose.SchemaTypes.String,
    quantity: mongoose.SchemaTypes.Number,
    price: mongoose.SchemaTypes.Number,
    store_id: mongoose.SchemaTypes.String
});