const Type = {
    STRING: "STRING",
    INTEGER: "INTEGER",
    BOOLEAN: "BOOLEAN",
    FLOAT: "FLOAT",
    DOUBLE: "DOUBLE",
    TIMESTAMP: "TIMESTAMP"
}

const Mode = {
    UNIQUE: "UNIQUE",
    REQUIRED: "REQUIRED",
    NULLABLE: "NULLABLE"
}

class Field {
    constructor(name, originalName = null, type = Type.STRING, array = false, mode = Mode.NULLABLE ) {
        this.name = name;
        this.originalName = originalName == null ? name : originalName;
        this.type = type;
        this.mode = mode;
        this.description = "";
        this.array = array;
        this.transform = null;
    }
}

module.exports.Field = Field;
module.exports.Mode = Mode;
module.exports.Type = Type;


