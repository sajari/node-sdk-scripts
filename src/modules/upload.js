const {RecordsClient, withKeyCredentials, withEndpoint} = require("@sajari/sdk-node")
const accountDetails = require('../config/account-details')
const jsonfile = require("jsonfile");
const recordsClient = new RecordsClient(accountDetails.collectionId, withEndpoint(accountDetails.defaultEndpoint), withKeyCredentials(accountDetails.keyId, accountDetails.keySecret))

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = {
    indexRecords: async function (records) {
        let i = 0;
        const recordBatch = [];
        while (i < records.length - 1) {
            recordBatch.push(records[i])
            i++

            if (recordBatch.length === 200) {
                // Add a short delay so we don't hammer the API
                console.log("waiting to upload new batch...");
                await sleep(1000);

                recordsClient
                    .batchUpsertRecords({
                        "records": recordBatch,
                    })
                    .then(response =>
                        console.dir(response.errors))
                    .catch(error => console.dir(error))
                recordBatch.length = 0
            }
        }
    },
    readJSONFile: function (file) {
        return new Promise ((resolve, reject) => {
            jsonfile.readFile(file, function (err, rec) {
                if (err) {
                    reject(err)
                    return
                }
                resolve(rec)
            })
        })
    }
}
