const Error = require("../models/ApiError");
const User = require("../models/user");
const auth = require("../auth/authentication");

module.exports = {

    validateToken(req, res, next) {
        console.log("validatie token");
        let token = req.header("x-access-token") || '';
        auth.decodeToken(token, (err, payload) => {
            if (err) {
                const error = new Error(401, err.message || err);
                next(error);
            } else {
                console.log("geauthenticeerd payload = ");
                req.user = payload.sub;
                console.log(req.user);
                next();
            }
        });
    },

    loginUser(req,res,next){
        const userPropsEmail = req.body.email;
        const userPropsPassword = req.body.password

        if (!userPropsEmail || !userPropsPassword) {
            res.status(412).json(new ApiResponse(412, 'Missing login parameters')).end()
            return
        }

        User.findOne({ email: userPropsEmail })

            .then(result => {
                if (result.password == userPropsPassword) {
                    
                    let _id = result.id;
                    let email = result.email;
                    let firstname = result.firstname;
                    let lastname = result.lastname;
                    let token = auth.encodeToken(result._id);
                    

                    res.status(200).json({
                        _id,
                        email,
                        firstname,
                        lastname,
                        token,
                    }
                        ).end();
                } else {
                    res.status(401).json({ message: 'Password or email is incorrect' }).end();
                }
            })
            .catch(err => {
                res.status(500).json({message: "There is no account registered under these credentials"}).end();
            })
        },

    registerUser(req, res, next) {
        const userProps = req.body;

        User.create(userProps)
            .then(user => {
                var token = auth.encodeToken(user.email)
                res.status(201).json({
                    "message": "User has been succesfully created.",
                    "code": 201,
                    "token": token,
                    "user": user
                })
            })
            .catch((err) => {
                res.status(500).json({ message: 'There is a account already with this email' }).end();
            })
    },

    getAllUsers(req, res, next) {
        const userId = req.params.id

        User.findById(userId)
            .then((user) => {
                if (user !== null) {
                    let _id = user.id;
                    let email = user.email;
                    let firstname = user.firstname;
                    let lastname = user.lastname;
                    res.status(200).json({
                        _id,
                        email,
                        firstname,
                        lastname,
                        
                    })
                } else {
                    next(new Error('user not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('user not found, wrong identifier', 422))
            })
        }

}