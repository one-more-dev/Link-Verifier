import chalk from 'chalk';
import fs from 'fs';



export default async function accessFile(path){
	const encoding = "utf-8";
	try{
		let myRequestedFile = await fs.promises.readFile(path,encoding);
		return extractFile(myRequestedFile);
	}catch(e){
		treatMyErrors(e);
	}
}


function extractFile(file){
	const regex = /\[([^\[\]]*?)\][\s]?\((https?:\/\/[^\s0-9.,#].[^\s]*?)\)/gm;
	const extraction = [...file.matchAll(regex)];
	const extracted = extraction.map(valor => ({[valor[1]]:valor[2]}));
	return extracted.length !== 0 ? extracted : "No content attend your request";
}


function treatMyErrors(erro){
	console.log(`The error itself: ${chalk.red(erro)}\n`+
		`The error code: ${chalk.red(erro.code)}\n`+
		chalk.red(`An error on accessing the file occured.`));
	throw new Error(erro);
}