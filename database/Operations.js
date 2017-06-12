module.exports = function () {

    var opers = {
        InsertOne: function (data) {
            data.save(function (error, data, dodanych) {
                console.log("dodano " + data)
            })
        },

        SelectAll: function (Model, callback) {
            var obj = {};
            Model.find({}, function (err, data) {
                if (err) {
                    obj.data = err
                } else {
                    obj.data = data

                }
                console.log(data);
                callback(data);
            })
        },

        DeleteAll: function (Model) {
            Model.remove(function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            })
        },

    }

    return opers;

}
