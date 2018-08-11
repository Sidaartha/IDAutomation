// Photoshop_CC_2015
// Automate "Name" & "POR" layers from a "CSV file" and save as "JPG file"
// Automate all JPGs to A3 doc each with 8 JPGs and saving them as "JPG file"

// Layer structure Group name : "NAME" & Layer name : "name"
//				   Group name : "POR" & Layer name : "por"

// Working document
var doc = app.activeDocument;

// Getting name layer
var NameLayer = doc.layers.getByName('name');

// Getting por layer
var PORLayer = doc.layers.getByName('por');

// Function to save as "jpg" file in "/img/" directory
function SaveJPEG(file_name) {
	var file = new File(doc.path + '/' + 'imgs' + '/' + file_name + '.jpg');
	var opts = new JPEGSaveOptions();
	opts.quality = 10;
	doc.saveAs(file, opts, true);
}

// Moves to its specific position in an order
function MoveLayerTo(fLayer, num) {
	var fX = 10.5*(num%4);	// X position (top left anchor)
	var fY = 13.5;	// Y position (top left anchor)
	if (num < 4) fY = 0;
	var Position = fLayer.bounds;
	Position[0] = fX - Position[0];
	Position[1] = fY - Position[1];
  	fLayer.translate(-Position[0], -Position[1]);
}

// Reading CSV file by taking the file as user input
var csvFile = File.openDialog("Open CSV File","comma-delimited(*.csv):*.csv;"); 
csvFile.open('r');
var csvString = csvFile.read();
csvFile.close();
// Splitting into rows
csvString = csvString.split('\n');

// Folder to contain IDs
var folder1 = Folder(doc.path + '/' + "imgs");
//Check if it exist, if not create it.
if(!folder1.exists) folder1.create();

// Automation; edit; save;
for( var s = 1; s < csvString.length; s++ ) {	// s=1 to ignone heading
var lineData = csvString[s].split(",");			// split based on comma seperation
NameLayer.textItem.contents = lineData[0];		// first element 'name'
PORLayer.textItem.contents = lineData[1];		// second element 'por'
SaveJPEG(lineData[1] + '-' + lineData[0] + '-' + s);		// file name 'por-name-uniqueID'
}

alert("Amigo!" + '\n' + "Done creating " + (csvString.length-1) + " files.");

// Creating new PSD file
var newdoc = app.documents.add(42.0, 29.7, 300, "IDs", NewDocumentMode.CMYK);

// Use the path to the application and append the samples folder 
var samplesFolder = Folder(doc.path + "/imgs/");
// Get all the jpgs in the folder
var fileListX = samplesFolder.getFiles("*.JPG");
var fileList = fileListX.sort();

// Rounding off to next integer
if (Math.round(fileList.length/8) < fileList.length/8)
	numberRou = Math.round(fileList.length/8) + 1;
else 
	numberRou = Math.round(fileList.length/8);

// Folder to contain A3 sheets
var folder2 = Folder(doc.path + '/' + "A3");
// Check if it exist, if not create it.
if(!folder2.exists) folder2.create();

count = 0;
for (var i = 0; i < numberRou; i++) {
	// Itterating through each file
	nJPG = 8
	if (numberRou-1 == i && fileList.length%8 != 0) nJPG = fileList.length%8
	for (var e = 0; e < nJPG; e++) {
		myFile = fileList[count];
		count += 1;
		var curr_file = app.open(myFile);
		curr_file.selection.selectAll();
		curr_file.selection.copy();
		curr_file.close(SaveOptions.DONOTSAVECHANGES);
		newdoc.paste();
		MoveLayerTo(newdoc.layers[0], e);
	}
	var mfile = new File(doc.path + '/' + 'A3' + '/' + 'Set-' + (i+1) + '.jpg');
	var mopts = new JPEGSaveOptions();
	mopts.quality = 10;
	newdoc.saveAs(mfile, mopts, true);
	for (var j = 0; j < nJPG; j++) newdoc.layers[0].remove();
}

// Closing A3 document
newdoc.close(SaveOptions.DONOTSAVECHANGES);

// Closing application
if (confirm('All Done!' + '\n' +  'Wanna quit PS ?')) {		// User input
    var idquit = charIDToTypeID( "quit" );
	executeAction( idquit, undefined, DialogModes.ALL );
}