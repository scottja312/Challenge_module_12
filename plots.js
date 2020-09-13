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
  });
}

// Step 1. Declare buildMetaData and buildCharts variables
// (These change as the sample number updates)
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

// Print information to the Demographic Info panel when ID # is selected.
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
      Object.entries(result).forEach(([key, value]) => 
      {PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
})}
init();
////////////////////////
// Challenge //

// Declare buildCharts(sample) function to pull d3.json and samples data file.
function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

// Declare variables for bar chart.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

// Setup y-axis label from otu_ids 
    var yaxis = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

// Create a Bar Chart with the sample arrays.
    var trace = {
        x: sample_values.slice(0, 10).reverse(),
        y: yaxis,
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
};
    var chart_data = [trace];
    var chart_layout = {
        title: "Top 10 OTUs",
        margin: { t:50, l: 150 }
};
    Plotly.newPlot("bar", chart_data, chart_layout);

// Create Bubble Chart to display each sample.
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
        color: otu_ids,
        colorscale: 'balance',
        size: sample_values,
    }
  };
    var bubble_data = [trace1];
  
    var bubble_layout = {
        title: 'OTU ID',
        hovermode: "closest",
        showlegend: false,
        margin: { t: 0},
  };
  
  Plotly.newPlot("bubble", bubble_data, bubble_layout);
});
}