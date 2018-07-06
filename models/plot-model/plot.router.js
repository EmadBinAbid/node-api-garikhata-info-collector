/*
@author: Emad Bin Abid
@date: July 04, 2018
*/

//Establishing the routes for plot model

//Dependencies
const fs = require('fs');
const config = require('../../config');
const plotModel = require('./plot.model');

const PlotModel = plotModel.PlotModel;

/*
method: addPlot(expressInstance, jwtInstance, verifyToken)
url: domain/plot
request object: expects a json object of type { object }
response type: sends a json object of type { "plot": object }. Else sends "Unauthorized"
*/
addPlot = function(expressInstance, jwtInstance, verifyToken, multerInstance)
{
    expressInstance.post('/plot', verifyToken, /*multerInstance.single('plotImage'),*/ (req, res) => {
        jwtInstance.verify(req.token, config.jwt_key, (err, userData) => {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {
                PlotModel.findOne({ plotId: req.body.plotId }, (err, dbObject) => {
                    if(err)
                    {
                        console.log(dbObject);
                        res.status(400).send("Bad request");
                    }
                    else
                    {
                        if(dbObject === null)
                        {
                            var newPlot = new PlotModel(req.body);

                            if(req.file)
                            {
                                newPlot.ploImage.data = fs.readFileSync(req.file.path);
                                newPlot.plotImage.fileInfo = req.file;
                            }
                            
                            console.log(req.body);

                            newPlot.save( (err, dbObject) => {
                                if(err)
                                {
                                    console.log(err);
                                    res.status(400).send("Bad request");
                                }
                                else
                                {
                                    res.json({ "plot": dbObject });
                                }
                            });
                        }
                        else
                        {
                            res.status(400).send("Bad request");
                        }
                    }
                } );
            }
        });
    });
}

/*
method: updatePlot(expressInstance, jwtInstance, verifyToken)
url: domain/plot?plotId
request object: expects a json object of type { "plot": object }
response type: sends a json object of type { "plot": object }. Else sends "Unauthorized"
*/
updatePlot = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.put('/plot', verifyToken, (req, res) => {
        jwtInstance.verify(req.token, config.jwt_key, (err, userData) => {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {
                const query = { plotId: req.query.plotId };
                const options = { new: true };

                PlotModel.findOneAndUpdate(query, req.body.plot, options, (err, dbObject) => {
                    if (err) 
                    {
                        res.status(400).send("Bad request");
                    }
                    else 
                    {
                        res.json({ "plot": dbObject });
                    }
                });
            }
        });
    });
}

/*
method: deletePlot(expressInstance, jwtInstance, verifyToken)
url: domain/event?plotId
request object: expects a json object of type { "plot": object }
response type: sends a json object of type { "plot": object }. Else sends "Unauthorized"
*/
deletePlot = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.delete('/plot', verifyToken, (req, res) => {
        jwtInstance.verify(req.token, config.jwt_key, (err, userData) => {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {
                const query = { plotId: req.query.plotId };
                PlotModel.remove(query, (err, dbObject) => {
                    if(err)
                    {
                        res.status(400).send("Bad request");
                    }
                    else
                    {
                        res.json({ "plot": dbObject });
                    }
                });
            }
        });
    });
}

/*
method: getPlotById(expressInstance)
url: domain/event?plotId
response type: sends a json object of type { "plot": object }. Else sends "Bad request"
*/
getPlotById = function(expressInstance)
{
    expressInstance.get('/plot', (req, res) => {
        PlotModel.findOne({ plotId: req.query.plotId }, (err, dbObject) => {
            if(err)
            {
                res.status(400).send("Bad request");
            }
            else
            {
                res.json({ "plot": dbObject });
            }
        });
    });
}

/*
method: getAllPlots(expressInstance)
url: domain/plot/all-plots
response type: sends a array of json objects of type { "plot": object }[]. Else sends "Unauthorized"
*/
getAllPlots = function(expressInstance)
{
    expressInstance.get('/plot/all-plots', (req, res) => {
        PlotModel.find({ }, (err, dbObject) => {
            if(err)
            {
                res.status(400).send("Bad request");
            }
            else
            {
                res.json({ "plot": dbObject });
            }
        });
    });
}

//CRUD operations at one place
exports.createRoutes = function(expressInstance, jwtInstance, verifyToken, multerInstance)
{
    addPlot(expressInstance, jwtInstance, verifyToken, multerInstance);
    updatePlot(expressInstance, jwtInstance, verifyToken);
    deletePlot(expressInstance, jwtInstance, verifyToken);
    getPlotById(expressInstance);
    getAllPlots(expressInstance);
}