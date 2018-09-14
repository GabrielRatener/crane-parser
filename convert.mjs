
import fs from "fs"
import path from "path"

const {readdirSync, lstatSync, rename} = fs;
const {dirname} = path;

const isDir = (pathName) => lstatSync(pathName).isDirectory();

// get the path to every file in every directory
const dig = function*(pathName) {
	for (const fileName of readdirSync(pathName)) {
		const filePath = `${pathName}/${fileName}`;

		if (isDir(filePath)) {
			yield* dig(filePath);
		} else {
			yield filePath;
		}
	}
}

for (const fileName of dig(`${process.cwd()}/src`)) {
	if (fileName.endsWith('.js')) {
		const newName = `${fileName.slice(0, -3)}.mjs`;
		rename(fileName, newName, () => console.log(fileName, '->', newName));
	}
}