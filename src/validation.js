import chalk from 'chalk';


function extractLinks(linkList){
	return linkList.map(link => Object.values(link).join());
}


async function checkStatus(urls){
	const allStatus = await Promise.all(
		urls.map(async (url) => {
			try{
				const resposta = await fetch(url,{method:'HEAD'});
				return `${resposta.status} - ${resposta.statusText}`;
			}catch(e){
				return treatMyErrors(e);
			}
		})
	)
	return allStatus;
}


function treatMyErrors(erro){
	if(erro.cause.code === 'ENOTFOUND'){
		return `The link was not found, probably doesn't exist`;
	}else{
		return `Error getting this link - ${erro}`;
	}
}


export default async function validating(links){
	const extractedLinks = extractLinks(links);
	const status = await checkStatus(extractedLinks);
	return links.map((obj,index)=> ( {...obj,'status':status[index]} ));
}