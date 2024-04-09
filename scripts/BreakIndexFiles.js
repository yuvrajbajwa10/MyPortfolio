const PagesrPath = "../Pages/homepage/";


const indexFile = "../index.html";


// read the index.html file for each element in the elemeent with tag "main" generate a new file if a section with the class as the filename else the tag is good

const fs = require('fs');
const { JSDOM } = require('jsdom');


function fileMake() {
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let document = new JSDOM(data).window.document;
        let main = document.querySelector("main");
        let pageData = [];
        let elements = main.children;
        console.log("elements: " + elements);
        for (let element of elements) {
            let type = element.tagName.toLowerCase();
            console.log("type: " + type);
            // if type = section write the element to a file with the class name as the filename
            if (type === "section") {
                let filename = element.className + ".html";
                let content = element.outerHTML;
                pageData.push({ type: 'html', content: content });
                fs.writeFileSync(PagesrPath + filename, content);
                console.log("writing file: " + filename);
            } else {
                // create a file with the type as the filename and write the element to the file
                let filename = type + ".html";
                let content = element.outerHTML;
                fs.writeFileSync(PagesrPath + filename, content);
                console.log("writing file: " + filename);
            }
        }
        console.log("Done writing files");
    });
}
fileMake();