module.exports = function (mongoose) {

    var Schema = mongoose.Schema;

    var rekordSchema = new Schema({
        nick: {
            type: String,
            required: true
        },
        czas: {
            type: String,
            required: true
        },
        data: {
            type: String,
            required: true
        }
    });

    var models = {
        Rekord: mongoose.model("Rekord", rekordSchema),
    }

    return models;

}
