const saySomething = (req, res, next) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
};

module.exports.saySomething = saySomething;

const db = require('../Etown-Degree-Planner/db_connection.js');
const Degree = db.degree;
exports.create = (req, res) => {
}

exports.createDegree = (req, res) => {
  let degree = {};

    try{
        // Building Degree object from uploading request's body
        degree.dID = req.body.dID;
        degree.name = req.body.name;
        degree.type = req.body.type;

        // Save to MySQL database
        Degree.create(degree,
                          {attributes: ['dID', 'name', 'type']})
                    .then(result => {
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getDegree = (req, res) => {
  Degree.findByPk(req.params.id,
                       {attributes: ['dID', 'name', 'type']})
       .then(degree => {
         res.status(200).json(degree);
       }).catch(error => {
         // log on console
         console.log(error);

         res.status(500).json({
             message: "Error!",
             error: error
         });
       })
}

exports.degrees = async (req, res) => {
  // find all Degree information from
    try{
        Degree.findAll({attributes: ['dID', 'name', 'type']})
        .then(degrees => {
            res.status(200).json(degrees);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.updateDegree = async (req, res) => {
  try{
       let degreeId = req.params.id;
       let degree = await Degree.findByPk(degreeId);

       if(!degree){
           res.status(404).json({
               message: "Does Not exist a Degree with id = " + degreeId,
               error: "404",
           });
       } else {
           await degree.destroy();
           res.status(200);
       }
   } catch(error) {
       res.status(500).json({
           message: "Error -> Can NOT delete a degree with id = " + req.params.id,
           error: error.message
       });
   }
}

exports.deleteDegree = async (req, res) => {
  try{
       let degree = await Degree.findByPk(req.body.id);

       if(!degree){
           // return a response to client
           res.status(404).json({
               message: "Not Found for updating a degree with id = " + degreeId,
               error: "404"
           });
       } else {
           // update new change to database
           let updatedObject = {
               dID: req.body.dID,
               name: req.body.name,
               type: req.body.type,
           }
           let result = await Degree.update(updatedObject,
                             {
                               returning: true,
                               where: {id: req.body.id},
                               attributes: ['dID', 'name', 'type']
                             }
                           );

           // return the response to client
           if(!result) {
               res.status(500).json({
                   message: "Error -> Can not update a degree with id = " + req.params.id,
                   error: "Can NOT Updated",
               });
           }

           res.status(200).json(result);
       }
   } catch(error){
       res.status(500).json({
           message: "Error -> Can not update a degree with id = " + req.params.id,
           error: error.message
       });
   }
}

/*
// DELETE?
exports.pageination = (req, res) => {
}

// Handles GET request through API
exports.filteringByType = (req, res) => {
  let type = req.query.type;

  Degree.findAll({
    attributes: ['dID', 'name', 'type'],
    where: {type: type}
  })
  .then(results => {
    res.status(200).json({
      message: "Get all Degrees with type = " + type,
      Degree: results,
    });
  })
  . catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error!",
      error: error
    });
  });
}

// DELETE?
exports.pagingfilteringsorting = (req, res) => {
}
*/
