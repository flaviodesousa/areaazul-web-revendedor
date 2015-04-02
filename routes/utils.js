 exports.ensureAuthenticated = function(req, res, next) {
 	console.log("req"+req);
     if (req.isAuthenticated()) {
         return next();
     }
     console.log(401);
     //res.send(401);
     res.redirect('/login');
 }