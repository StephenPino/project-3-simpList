var List = require("../models/List");
var User = require("../models/User");
module.exports = {

    find: function (req, res) {

        List.findOne(
            { _id: req.params.id }).then(function (foundList) {
                res.json(foundList);
            }).catch(function (err) {
                res.send("There was an error finding that list")
            })

    },

    findByUser: function (req, res) {
        list.find(
            { owner: req.params.userId }).then(function (userLists) {
                res.json(userLists)
            }).catch(function (err) {
                res.send("There was an error finding lists associated with that user")
            })
    },

    create: function (req, res) {
        var newList = new List(req.body);

        newList.save().then(function (createdList) {
           
                res.send("The list has been created")
            /* User.findOneAndUpdate(
                 { _id: req.body.userId },
                 { $set: { user_lists: createdList._id } }).then(function (updatedUser) {
                     res.send("The list has been created")
                 }).catch(function (err) {
                     console.log(err);
                     res.send("There was an error creating the list!")
                 })
         }).catch(function (err) {
             console.log(err);
             res.send("There was an error creating the list!")
         })*/
        }).catch(function (err) {
             console.log(err);
             res.send("There was an error creating the list!")
         })
    },

    share: function (req, res) {
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { shared_lists: req.body.listId } }).then(function (updatedShared) {
                res.send("The list has been shared");
            }).catch(function (err) {
                res.send("There was an error sharing the list")
            })
    },

    update: function (req, res) {
        List.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }).then(function (updatedList) {
                res.send("The list has been updated!")
            }).catch(function (err) {
                res.send("There was an error updating the list")
            })
    },

    destroy: function (req, res) {

        Remove.remove({ _id: req.params.id })
            .then(function (deletedList) {
                res.send("The list has been deleted!")
            }).catch(function (err) {
                console.log(err);
                res.send("There was an error deleted the list.")
            });
    }

}