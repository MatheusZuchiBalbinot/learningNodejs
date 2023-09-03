const MongoClient = require('mongodb').MongoClient

const url = "mongodb+srv://Mathe:Ext7oRH0dy2QOfn1@cluster0.njthxcg.mongodb.net/"

const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,

    };
    const client = new MongoClient(url)

    try {
        await client.connect()
        const db = client.db()
        const result = db.collection('products').insertOne(newProduct);
    } catch (err) {
        return res.json({message: 'Cloud not store data.'})
    };
    client.close()

    res.json(newProduct)
};

const getProducts = async (req, res, next) => {

};

exports.getProducts = getProducts
exports. createProduct = createProduct