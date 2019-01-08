const path = require('path');

const articleFolder = './public/articles/';
const fs = require('fs');
const outputJSONfile = './src/articles.json';

/*module.exports = function(config) {
console.log("TEST")

}*/


(function(){
	var reporter = {};
	module.exports = reporter.createReport = function(reportType){
		//your logic to create a report
		fs.readdir(articleFolder, (err, files) => {
			var filesProcessed = 0;
			files.forEach(file => {
				console.log(file);

				var lineReader = require('readline').createInterface({
					input: require('fs').createReadStream(articleFolder+file),
				});

				var lineCounter = 0;
				var wantedLines = [];
				lineReader.on('line', function (line) {
					lineCounter++;

					if (lineCounter !== 1 && lineCounter !== 7){
						wantedLines.push(line);
					}

					if(lineCounter===7){
						lineReader.close();
					}
				});

				lineReader.on('close', function() {
					//console.log(convertLines2JSON(wantedLines))
					convertLines2JSON(wantedLines);

					filesProcessed++;
					//process.exit(0);
					if(filesProcessed === files.length) {
						writeJSON();
					}
				});
			});
		})
	}

	if (!module.parent) {
		reporter.createReport(process.argv[2]);
	}
})();

let tempArray = [];
function convertLines2JSON(lines){
	//console.log(lines);
	let outArray = {};
	lines.forEach(line => {
		//console.log(line);
		let lineTemp = line.split(":");

		outArray[lineTemp[0]] = lineTemp[1]
	});
	tempArray.push(outArray);
	//console.log()
}

function writeJSON(){
	console.log(tempArray)
	fs.writeFile(outputJSONfile, JSON.stringify(tempArray), function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});
}