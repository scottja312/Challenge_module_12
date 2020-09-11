// Create dropdown menu of ID numbers dynamically.
function init() {
    var selector = d3.select("#selDataset");
  
d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
    selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}
  
init();

// Adds "optionChanged function" to sync with obj created in index.html for a drop-down menu.
function optionChanged(newSample) {
    console.log(newSample);
}

// Print information to the Demographic Info panel when ID # is selected.

// Step 1. Declare buildMetaData and buildCharts variables
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}
// Step 2. Declare buildMetadata() function.
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      //PANEL.append("h6").text(result.location);
      // Skill Drill: modify buildMetadata() function to populate the 
     // Demographic Info panel with the rest of the demographic data.
      Object.entries(result).forEach(([key, value]) => {PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
});
}

////////////////////////
// Challenge //

// Declare buildCharts(sample) function to pull d3.json and samples data file.
function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");

// Create a bar chart of the top ten bacterial species in a volunteer's navel.

