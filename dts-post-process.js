const path = require("path");
const fs = require("fs");

const fileToProcess = process.argv[2];

const pt = path.join(__dirname, fileToProcess)

const dtsData = fs.readFileSync(pt, { encoding: "utf-8" });

const singleLineAtTypeDefRegex = /\/\*\* @typedef \{.+? \*\/\n?/gu;
const singleLineAtTypeRegex = /\/\*\* @type \{.+? \*\/\n?/gu;
const atParamRegex = /(@param )\{.+?\} ([\w\[])/gu;
const atReturnsRegex = /(@returns )\{.+?\} ([\w\[])/gu;

const cleanupOptionalParamRegex = /(@param )\[(\w+)\]/gu;
const cleanupAtReturnsNoComment = / \* @returns \{.+?\}\n/gu;

const newData = dtsData
	.replace(singleLineAtTypeDefRegex, "")
	.replace(singleLineAtTypeRegex, "")
	.replace(atParamRegex, "$1$2")
	.replace(atReturnsRegex, "$1$2")
	.replace(cleanupOptionalParamRegex, "$1$2")
	.replace(cleanupAtReturnsNoComment, "");

fs.writeFileSync(pt, newData, { encoding: "utf-8" });
