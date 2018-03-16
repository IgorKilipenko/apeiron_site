import {
    catalog as catalogOld,
    catalog_category as catalog_categoryOld
} from './olddata';
import Database from './database';
import mongoose from 'mongoose';
import productsMap from './olddata/products-map';

const catalog = { products: catalogOld.filter(p => p.LanguageCode == 'ru' && productsMap.find(map => map.id == p.ItemID)).map(p => {
    const image = productsMap.find(map => map.id == p.ItemID).image;
    return {...p, image}
}) };
const catalog_category = catalog_categoryOld.filter(
    cat => cat.LanguageCode == 'ru'
);
catalog.categories = catalog_category.filter(cat => cat.ParentID == 0);
catalog.categories.forEach(cat => {
    cat.groups = catalog_category.filter(
        g => g.CategoryID !== cat.CategoryID && g.ParentID === cat.CategoryID
    );
});
catalog.categories.forEach(cat => {
    cat.groups.forEach(group => {
        group.products = catalog.products.filter(
            p => p.CategoryID === group.CategoryID
        );
    });
});

const _clearHtml = text => {
    const reg = /<[^>]*>/gi;
    return text.replace(reg, '');
};

console.log('Start init data');
const db = new Database();
//db.buildSchema();
console.log('Connecting...');

const setDataAsync = async db => {
    try {
        const conn = await db.connect();
        mongoose.connection.dropDatabase();

        catalog.categories.forEach(async cat => {
            const productCategory = new db.ProductCategories({
                _id: new mongoose.Types.ObjectId(),
                title: _clearHtml(cat.Title)
            });
            await productCategory.save();

            cat.groups.forEach(async group => {
                const productGroup = new db.ProductGroups({
                    _id: new mongoose.Types.ObjectId(),
                    title: _clearHtml(group.Title),
                    category: productCategory._id
                });
                await productGroup.save();

                group.products.forEach(async db_product => {
                    const productDetails = new db.ProductsDetails({
                        _id: new mongoose.Types.ObjectId(),
                        videos: [],
                        documents: []
                    });
                    await productDetails.save();

                    const product = new db.Products({
                        _id: new mongoose.Types.ObjectId(),
                        title: _clearHtml(db_product.Title),
                        image: db_product.image,
                        description: _clearHtml(db_product.Description),
                        metaTitle: _clearHtml(db_product.MetaTitle),
                        metaDescription: _clearHtml(db_product.MetaDescription),
                        content: _clearHtml(db_product.Content),
                        order: parseInt(db_product.SortOrder, 10),
                        active: parseInt(db_product.Active, 10),
                        category: productCategory._id,
                        group: productGroup._id,
                        details: productDetails._id
                    });
                    await product.save();
                    console.log(`save success product id_${product._id}`);
                });
                
            });
            
        });
    } catch (err) {
        console.log({ error: err });
    } finally {
        console.log('finally');
    }
};

setDataAsync(db);