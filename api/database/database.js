import mongoose from 'mongoose';

export default class Datebase {
    constructor(connectionString){
        this.connectionString = connectionString;

        this.buildSchema();
    }
    connect = () => {
        mongoose.connect(this.connectionString || 'mongodb://localhost/test2', {promiseLibrary: global.Promise,});
        return mongoose.connection;
    }

    buildSchema = () => {
        this.Products = mongoose.model('Products', this.productsSchema);
        this.ProductsDetails = mongoose.model('ProductsDetails', this.productsDetailsSchema);
        this.ProductGroups = mongoose.model('ProductGroups', this.productGroups);
        this.ProductCategories = mongoose.model('ProductCategories', this.productCategories);
    }

    productsSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        description: String,
        image: String,
        metaTitle: String,
        metaDescription: String,
        content: String,
        order: Number,
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'ProductCategories'
        },
        active: Boolean,
        group: {
            type: mongoose.Schema.ObjectId,
            ref: 'ProductGroups'
        },
        details: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductsDetails'
        }]
    }, {toJSON: {getters: true}});
    productsDetailsSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        contentType: String,
        value: String,
        title: String,
        description: String,
        text: [
            {
                value: String,
                tag: String
            }
        ]
    });
    productCategories = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        title: String
    });
    productGroups = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'ProductCategories'
        },
    });

    static contentTypes = {
        text: 0,
        image: 1,
        document: 2,
        video: 3
    }
}