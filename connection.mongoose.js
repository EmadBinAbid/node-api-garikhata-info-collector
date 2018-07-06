/*
@author: Emad Bin Abid
@date: July 04, 2018
*/

//Creating database connection

// const dbName = "GariKhataInfoCollectorApp";
// const port = "27017";

const dbName = "@ds229771.mlab.com:29771/gic-garikhatainfocollector";
const port = "unknown";

exports.connect = function(mongooseInstance)
{
    mongooseInstance.connect(`mongodb://emad:emad123@ds229771.mlab.com:29771/gic-garikhatainfocollector`, (err) => {
        if(err)
        {
            console.log(`[-]: Error in MongoDB connection: ${dbName}, PORT: ${port}`);
        }
        else
        {
            console.log(`[+]: Connected to MongoDB: ${dbName}, PORT: ${port}`);
        }
    });
}