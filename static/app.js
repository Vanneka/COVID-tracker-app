/*
I want to fetch the data
output the data to the page {In truth this step is actually to output the data to the map I will draw with canvas}
*/ 

// Get all parts of the page I need: canvas and the section to output the country data

// window.onload()

fetch("https://covid-19-data.p.rapidapi.com/totals", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "ea28da3752mshc998286dae454b6p15285ajsnf53177b24f9f",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});