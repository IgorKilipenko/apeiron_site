import mongoose from 'mongoose';
import {catalog, catalog_category} from './olddata';

class Datebase {
    connect = () => {
        return mongoose.connect('mongodb://localhost/mongoose_basics');
    }

    productsSchema = mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        title: String,
        description: String,
        imageUrl: String,
        details: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductsDetails'
        }
    });
}