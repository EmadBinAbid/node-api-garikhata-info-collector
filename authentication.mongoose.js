/*
@author: Emad Bin Abid
@date: July 04, 2018
*/

//Dependencies
const config = require('./config');
const userModel = require('./models/user-model/user.model');

const UserModel = userModel.UserModel;

//Validating User on /login request.
/*
method: validateUser(expressInstance, jwtInstance, userRouterInstance)
url: domain/login
request object: expects a json object of type { "user": object }
response object: sends a json object of type { "user": object, "token": token }. If error, then sends "Unauthorized"
*/
exports.validateUser = function(expressInstance, jwtInstance)
{
    //Validating User
    expressInstance.post('/login', (req, res) => 
    {
        if(req.body.user.username && req.body.user.password)
        {
            UserModel.findOne(req.body.user, (err, dbObject) => 
            {
                console.log(req.body.user);
                if(err)
                {
                    res.status(401).send('Unauthorized');
                }
                else
                {
                    console.log(dbObject);
                    if(dbObject === null)
                    {
                        res.status(401).send('Unauthorized');
                    }
                    else
                    {
                        const signObject = { "user": dbObject };
                        jwtInstance.sign(signObject, config.jwt_key, (err, token) => 
                        {
                            if(err)
                            {
                                res.status(401).send('Unauthorized');
                            }
                            else
                            {
                                res.json({ "user": dbObject, "token": token });
                            }
                        });
                    }
                }
            });
        }
    });
}

//Verifying the token
exports.verifyToken = function(req, res, next)
{
    const authHeader = req.headers['authorization'];
    //authHeader is a string containing token under the Authorization Header sent by the client.

    if(typeof authHeader !== 'undefined')
    {
        req.token = authHeader;
        next();
    }
    else
    {
        res.status(401).send('Unauthorized');
    }
}