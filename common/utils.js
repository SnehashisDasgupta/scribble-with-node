const utils = {};

utils.formatPercent= (n) =>{
    return (n*100).toFixed(2) + "%";
}

utils.printProgress= (count, max) =>{
    process.stdout.clearLine();// to clear the current line
    process.stdout.cursorTo(0);//to move the cursor to the beginning of the line
    const percent = utils.formatPercent( count/max );
    // COUNT/MAX (percent)
    process.stdout.write(count + "/" + max + " (" + percent + ")");
}

// checks if the code is running in a Node.js
if (typeof module !== 'undefined'){
    module.exports = utils;
}