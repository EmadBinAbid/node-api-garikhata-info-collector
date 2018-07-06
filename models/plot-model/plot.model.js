/*
@author: Emad Bin Abid
@date: July 04, 2018
*/

//Dependencies
const mongoose = require('mongoose');

//Defining Schema --> TENTATIVE PLOT SCHEMA
const plotSchema = mongoose.Schema(
    {
        //plotId --> auto-generated

        plotId: 
        {
            type: String,
            required: true
        },
        plotUse: 
        {
            type: String,
            required: true
        },
        frontWidth:
        {
            type: String,
            required: true
        },
        buildingName:
        {
            type: String,
            required: true
        },
        officialPlotNumber:
        {
            type: String,
            required: true
        },
        yearOfBuilt:
        {
            type: Number,
            required: true
        },
        numOfFloors:
        {
            type: Number,
            required: true
        },
        eachFloorUsage:
        {
            type: Array,
            required: true
        },
        plotImages:
        {
            data: Buffer,
            fileInfo: Object
        }
    }
);

const PlotModel = exports.PlotModel = mongoose.model('PlotModel', plotSchema);