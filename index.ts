const fs = require('fs');

let densidadPoblacion = "Country,Density\n";
let populationDensity = [];

const data = fs.readFileSync('./countries.txt', 'utf8');
const arrayData = data.split("\n");


arrayData.map((d, i) => {
  let countryArea = [];
  if (i !== 0 && d !== '') {
    countryArea = [d.substring(0, d.search(/[0-9]/)-1), d.substring(d.search(/[0-9]/)).split(" ")]

    if (countryArea[1].length === 2) {
      countryArea[1] = parseInt(countryArea[1][0].split(",").join("")) / parseInt(countryArea[1][1].split(",").join(""));
    } else {
      countryArea[1] = 0;
    }

    populationDensity.push(countryArea)
  }
});

populationDensity = populationDensity.sort(function(a, b){return b[1]-a[1]});
populationDensity.map(d => {densidadPoblacion += d[0] + "," + d[1] + "\n"});


fs.writeFile('paises.csv', densidadPoblacion, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
