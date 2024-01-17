const {rename} = require("fs");

const {unlink} = require("fs");

rename("rename.txt", "renamed.txt", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File renamed.");
});

unlink("renamed.txt", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File deleted.");
});