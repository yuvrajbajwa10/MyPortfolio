const indexFile = "../index.html";
const PagesDir = "../Pages/";
const homePage = "homepage/";

import { PageMaker } from "./PageMaker.js";

const hpPath = (f) => PagesDir + homePage + f + ".html";
const indexPage = [
    {
        type: "template", contentPath: hpPath("index"), insertElement: '${MAIN}123'
    },
    { type: "html", contentPath: hpPath("header") },
    { type: "html", contentPath: hpPath("quote") },
    { type: "html", contentPath: hpPath("PM") },
    { type: "html", contentPath: hpPath("aboutMe") },
    { type: "html", contentPath: hpPath("light") },
    { type: "html", contentPath: hpPath("blockquote") },
    { type: "html", contentPath: hpPath("education") },
    { type: "html", contentPath: hpPath("contactMe") },
    { type: "html", contentPath: hpPath("aboutPage") },
];

PageMaker(indexPage, indexFile);
