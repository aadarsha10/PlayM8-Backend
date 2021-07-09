const jwt = require('jsonwebtoken')
const playerSignup_model = require('../Model/playerSignup_model')

module.exports.verifyUser = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'secretKey');
        playerSignup_model.findOne({_id : data.playerId})
        .then(function(result){
            req.userData = result;
            next();
        })
        .catch(function(e){
            res.status(401).json({message:"Auth failed."});
        })
    }
    catch(er){
        res.status(401).json({error : er})
    }
}

module.exports.verifyPlayer = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'secretKey');
        playerSignup_model.findOne({_id : data.playerId})
        .then(function(result){
            req.userData = result;
            next();
        })
        .catch(function(e){
            res.status(401).json({message : "Auth failed"})
        })
    }
    catch(er){
        res.status(401).json({error : er})
    }
}
