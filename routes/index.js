var express = require('express');
var router = express.Router();
let indexController = require('../controller/index'); 


/* GET home page. */

router.get('/',indexController.home);




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});


/* GET about me page. */
router.get('/about', indexController.about);
 

/* GET projects page. */
router.get('/projects', indexController.projects);


/* GET Services page. */
router.get('/services', indexController.services);


/* GET Contact me page. */
router.get('/contact', indexController.contact);


 // get route to display the login page
router.get('/login',indexController.displayLoginPage );

// get route for processing the login page
router.post('/login',indexController.processLoginPage );


// get route to display the register page
router.get('/register',indexController.displayRegisterPage );

// get route for processing the register page
router.post('/register',indexController.processRegisterPage );


 /* Get to perform UserLogout */
 router.get('/logout',indexController.performLogout );

module.exports = router;
