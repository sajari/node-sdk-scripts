const accountDetails = require('../config/account-details')
const {CollectionsClient, withKeyCredentials, withEndpoint} = require("@sajari/sdk-node")
const collectionsClient = new CollectionsClient(withEndpoint(accountDetails.defaultEndpoint), withKeyCredentials(accountDetails.keyId, accountDetails.keySecret))

module.exports = {
    deleteCollection: async function(id) {
        try {
            const collection = await collectionsClient.deleteCollection(id);
            console.log(collection)
        } catch (e) {
            console.log(e)
        }
    },
    getCollection: async function (id) {
        try {
            const collection = await collectionsClient.getCollection(id);
            console.dir(collection);
            return collection
        } catch (e) {
            console.log(e)
        }
    },
    createCollection: async function (id, name) {
        const collectionDetails = {
            id: id,
            displayName: name,
        }
        await collectionsClient.createCollection(collectionDetails)
            .then(console.log)
            .catch(console.log)
    }
}


