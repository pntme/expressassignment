var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.get('/helloworld', function(req, res) {
    res.render('helloworld', {
        title: 'Hello, World!'
    });
});
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs) {
        res.send('userlist', {
            "userlist": docs
        });
    });
});
router.get('/newuser', function(req, res) {
    res.render('newuser', {
        title: 'Add New User'
    });
});
router.post('/adduser', function(req, res) {
    var db = req.db;
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var collection = db.get('usercollection');
    collection.insert({
        "username": userName,
        "email": userEmail
    }, function(err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            res.json({
                message: 'Successfully added'
            });
        }
    });
});
router.delete('/deleteuser', function(req, res) {
    var db = req.db;
    var uid = req.body.id;
    var collection = db.get('usercollection');
    console.log(uid)
    collection.remove({
        _id: uid
    }, function(err, doc) {
        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });
    });
});
router.put('/updateuser', function(req, res) {
    var db = req.db;
    var id = req.body.id;
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var collection = db.get('usercollection');
    console.log(req.body)
    collection.update(
   { _id: id },
   {
      username:userName,
      email: userEmail
   },
   { upsert: true 
   },function(err, doc) {
            if (err) {
            console.log(err)
            res.send("There was a problem updating the information to the database.");
        } else {
            res.json({
                message: 'Successfully updated'
            });
        }
   }

)
});


module.exports = router;