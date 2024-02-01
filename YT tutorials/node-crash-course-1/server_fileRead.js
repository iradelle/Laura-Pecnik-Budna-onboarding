const fs = require('fs')
const {readFile, readFileSync} = require("fs")

fs.readFile("text.txt", "utf8", (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log(data);
});

// faster
try {
    const data = readFileSync("text.txt", "utf8");
    console.log(data);
} catch(err) {
    console.error(err);
}


console.log('Log from outside.')