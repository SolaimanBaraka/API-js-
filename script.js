
const url = 'https://league-of-legends-champions.p.rapidapi.com/champions/en-us?page=1&size=10&name=aatrox&role=fighter';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'f08aae17c1msh48c6d5dea41eae4p1dc292jsn53f53c323380',
		'x-rapidapi-host': 'league-of-legends-champions.p.rapidapi.com'
	}
};

let response;
let result;

async function testApi() {
	console.log("Hello")
	response = await fetch(url, options).then(x => {
		console.log("Hello2")
		let body = document.getElementById("main").innerHTML = x.formData;
		console.log(response);

	});
}

window.onload = testApi()

function updatePage() {
	let body = document.getElementById("main").innerHTML = response;
}
