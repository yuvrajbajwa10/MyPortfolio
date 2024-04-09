
import fs from 'fs';

const PageMaker = (pageData, outputPath) => {
    let document;
    let insertTarget;
    pageData.forEach(async (element, i) => {
        let content = fs.readFileSync(element.contentPath, 'utf8');
        if (element.type === 'template') {
            document = content;
            insertTarget = element.insertElement
        }
        if (element.type === 'html') {
            document = document.replace(insertTarget, content + insertTarget);
        }
    });
    document = document.replace(insertTarget, "");
    fs.writeFileSync(outputPath, document);
}

export { PageMaker };
