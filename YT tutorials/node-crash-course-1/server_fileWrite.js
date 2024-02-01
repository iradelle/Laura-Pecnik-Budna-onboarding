const {appendFile} = require("fs");

const newContent = '\nThis is new text.'

// writeFile('text.txt', newContent, {flag: 'a'}, (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log("Content written!")
// }); // replaca prejšn content - default behaviour -> popravimo da damo flag
// // {flag: 'a'} -> a je append

// try {
//     writeFileSync("text.txt", newContent)
//     console.log('Content Written!')
// } catch (err) {
//     console.error(err);
// } // spet overwritta -> spremenimo na appendFile!

appendFile('text.txt', newContent, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Content Written!');
});