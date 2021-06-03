const AccountDetails = require('./config/account-details')
const Schema = require('./modules/schema')
const Collection = require('./modules/collection')
const Upload = require('./modules/upload')
const Transformer = require('./modules/transform')


Upload.readJSONFile(AccountDetails.filename)
    .then(rec => transformData(rec))
    .catch(err => console.error(err))


function transformData(records) {
    // Setup schema
    let schema = []
    schema.push(new Schema.Field("id"))
    schema.push(new Schema.Field("name", "title"))
    new Schema.Field("price", "price", Type.DOUBLE, false, Mode.NULLABLE)

    let priceField = new Schema.Field("price", "price", Schema.Type.DOUBLE)
    priceField.transform = (value) => {
        return value.replace("$", "")
    }
    schema.push(priceField)

    let newRecords = Transformer.transformRecords(records, schema)
    console.log(newRecords)


}

