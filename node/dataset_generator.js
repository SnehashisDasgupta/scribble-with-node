const draw = require('../common/draw.js');
const constants = require('../common/constants.js');
const utils = require('../common/utils.js');

const {createCanvas} = require('canvas');
const canvas = createCanvas(400,400);
const ctx = canvas.getContext('2d');

// imports the Node.js built-in 'fs' (File System) module, which provides functions for interacting with the file system
const fs = require('fs');

//reads the contents of 'RAW_DIR' directory
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
//it iterates through each file name in the 'fileNames' array (which was obtained from reading the directory contents).
fileNames.forEach(fn => {
    //reads the content of each file using 'fs.readFileSync()' method
    const content = fs.readFileSync(
        constants.RAW_DIR + "/" + fn
    );
    //it parses the JSON content of the file and extracts the 'session', 'student', and 'drawings' properties.
    const {session, student, drawings} = JSON.parse(content);
    for (label in drawings){
        //it creates a sample object with the extracted data and pushes it into the 'samples' array 
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session         
        });

        const paths = drawings[label];
        fs.writeFileSync(
            constants.JSON_DIR + "/" + id + ".json",
            JSON.stringify(paths)
        );

        //Generating an image file from the drawing paths
        generateImageFile(
            constants.IMG_DIR + "/" + id + ".png",
            paths
        );

        //give the progess report
        utils.printProgress(id, fileNames.length*8);
        id++;
    }
})

//writes the 'samples' array to a new JSON file specified by 'constants.SAMPLES'
fs.writeFileSync(constants.SAMPLES,
    JSON.stringify(samples)
);

function generateImageFile(outFIle, paths){
    ctx.clearRect(0,0,
        canvas.width, canvas.height
    );
    draw.paths(ctx, paths);

    //converts the canvas to a PNG image buffer
    const buffer = canvas.toBuffer("image/png");
    //it writes the PNG image buffer to a file specified by the 'outFile' parameter.
    fs.writeFileSync(outFIle, buffer);
}