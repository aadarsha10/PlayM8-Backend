const jwt = require('jsonwebtoken')
const user = require('../models/admin_details_model')

module.exports.checkUser = function (req, res, next) {
    try {

        const token = req.headers.authorization.split(" ")[1];
        const verifiedData = jwt.verify(token, 'secretkey');
        console.log(verifiedData.userId)
        user.findOne({ _id: verifiedData.userId })
            .then(function (userData) {
                req.userData = userData
                next();
            })
            .catch(function (e) {
                res.status(401).json({ error: e });
            })

    }
    catch (er) {
        res.status(401).json({ error: er })

    }

}

//steps of authentication to follow
//1. token fetch from client(ticket)
//2. need to verify if the token is valid or not    
//3. false: return with error message.
//4. true: get the userid which was stored in the token 
//5. fetch all the user infornation from the database 

//guard2 - it will check if the user is admin or not 
module.exports.verifyAdmin = function (req, res, next) {
    if (req.userData) {
        return res.status(401).json({ message: "Unauthorized!" })
    }
    else if (req.userData.userType !== 'admin') {
        return res.status(401).json({ message: "Authorized!" })
    }
}


// // for pet data authentication 
// module.exports.checkPet=function(req,res,next){
//     try{

//         const token=req.headers.authorization.split(" ")[1];
//         const verifiedData=jwt.verify(token,'secretkey');
//         console.log(verifiedData.petId)
//         pet.findOne({_id:verifiedData.petId})
//         .then(function(petData){
//             res.send(petData);
//             next();
//         })
//         .catch(function(e){
//             res.status(401).json({error: e});
//         })


//     }
//     catch(er){
//         res.status(401).json({error:er})

//     }

// }
