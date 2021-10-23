    var express = require('express');
    var router = express.Router();
    let mongoose = require('mongoose');
    let businessController = require('../controller/business');
    let passport = require('passport');
    let User = require ('../models/user');
    
// helper function for guard purpose
function requireAuth(req, res, next)
{
    //check if the user logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// Methods
/* GET business listing. */     /*Read*/
router.get('/list',requireAuth,businessController.list );


/* Update. */
// get route to display the edit page
router.get('/edit/:id', businessController.displayEditPage );// get method is to read

// get route for processing the edit page
router.post('/edit/:id', businessController.processEditPage );


 /* Create */
 // get route to display the add page
router.get('/add', businessController.displayAddPage );

// get route for processsing the add page
router.post('/add', businessController.processAddPage );


 /* Delete. */
router.get('/delete/:id',requireAuth, businessController.performDelete );


module.exports = router;