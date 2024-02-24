const Stores = require('../models/stores');

//obtener la tienda por id
exports.getStoreById = async (req, res) => {
    try {
        const storeId = req.params.id;
        const storeInfo = await Stores.findOne({ id: storeId });

        if (!storeInfo) {
            return res.status(404).send('Store not found'); 
        }
        
        res.json(storeInfo);
        console.log("STORE INFO", storeInfo);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
