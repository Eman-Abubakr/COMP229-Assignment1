
//connect to our model
let Business = require ('../models/business');


exports.list = function(req, res, next) {
    Business.find(
        (err, businessList) => {
            console.log(businessList);  //object
                
            if(err){
                return console.error(err);
            }
            else
            {
              console.log(businessList);
              res.render('business/list',{
                  title: 'Business List',
                  BusinessList: businessList//object
                  ,displayName: req.user ? req.user.displayName : ''
                } );    
            }
          })
  }


//update(read before editing)
  module.exports.displayEditPage = function(req, res, next)  {
    let id = req.params.id;
    
    Business.findById(id, (err, itemToEdit) => { //by passing an id either return the error or itemToEdit

            if(err)
            {
                  console(err);
                  res.end(err);
            }
            else
            {
              //show the edit view
              //console.log(itemToEdit);

              res.render('business/add_edit',{
                  title: 'Edit Item',
                  item: itemToEdit  //object
                  //,displayName: req.user ? req.user.displayName : ''
                } );    
            }
          })
  }




  module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

     //console.log(req.body);

    let updatedItem = Business({
        _id: req.body.id,
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email
    });

    console.log(updatedItem);

     Business.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/business/list');
        }
    });
}





//create(read first before adding)
module.exports.displayAddPage = (req, res, next) => {
  let newItem = Business();

  res.render('business/add_edit', {
      title: 'Add a new Contact',
      item: newItem
     // ,displayName: req.user ? req.user.displayName : ''
  })          
}


//Create
module.exports.processAddPage = (req, res, next) => {
  
  let newItem = Business({
      "_id": req.body.id,
      "username": req.body.username,
      "phone": req.body.phone,
      "email": req.body.email
  });

  Business.create(newItem, (err, item) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the business list
          console.log(item);
          res.redirect('/business/list');
      }
  });

}



// Delete
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Business.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/business/list'),
            req.redirect('/business/add_edit');
        }
    });
}