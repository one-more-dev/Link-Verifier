#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import accessFile from './index.js';
import validating from './validation.js';


const pathway = process.argv;	// PROCESS.ARGV is for give commands through Node CLI


async function returnRequest(fileDir){
	const arquivoDiretorio = fileDir[2];
	const valid = fileDir[3] === "valida";
	console.log("Valid is... ",valid);

	try{
		fs.lstatSync(arquivoDiretorio);
	}catch(erro){
		if(erro.code === "ENOENT"){
			console.log(`The following error occured: ${erro}`);	
		}else{
			console.log(`An error occured: ${erro}`);
		}
		return;
	}

	if(fs.lstatSync(arquivoDiretorio).isFile()){
		const arquivo = await accessFile(arquivoDiretorio);
		printInfo(arquivo,valid);
	}else if(fs.lstatSync(arquivoDiretorio).isDirectory()){
		const diretorio = await fs.promises.readdir(arquivoDiretorio);
		diretorio.forEach(async (arquivo) => {
			const arquivoAtual = await accessFile(`${arquivoDiretorio}/${arquivo}`);
			console.log(`${arquivoDiretorio}/${arquivo}`);
			printInfo(arquivoAtual,valid,arquivo);
		});
	}
}


async function printInfo(files,valido,specificFile=""){
	if(valido){
		console.log(chalk.cyan("Validated links list\n"),
			await validating(files));
	}else{
		console.log(chalk.cyan("The user request is here\n"),
		chalk.black.bgWhite(specificFile,"\n"),
		files);
	}
}


returnRequest(pathway);
