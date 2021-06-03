// function transformRecords(records) {
//     let i = 1
//     while (i < records.length - 1) {
//         let record = records[i]
//         let transformedRecord = {
//             App: record.App,
//             Content: record.Content,
//             Helpful: record.Helpful,
//             Posted: record.Posted,
//             Rating: record.Rating,
//             Shop: record.Shop,
//             id: i,
//         }
//         if (record['Developer Reply Date'] != "") {
//             transformedRecord.Developer_Reply = record['Developer Reply']
//             transformedRecord.Developer_Reply_Date = record['Developer Reply Date']
//         }
//         records[i] = transformedRecord
//         i++
//     }
//     return records
// }

module.exports = {
    transformRecords: function (records, schema) {
        for (let i in records) {
            let record = records[i]
            let newRecord = {}
            for (const n in schema) {
                let field = schema[n]
                let fieldValue
                if (field.transform != null) {
                    fieldValue = field.transform(record[field.originalName])
                } else {
                    fieldValue = record[field.originalName]
                }
                newRecord[field.name] = fieldValue
            }
            records[i] = newRecord
        }
        return records;
    }
}

