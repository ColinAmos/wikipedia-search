$(document).ready()
{
  
  // Submit search input
  $("#search-button").on("click", function()
  {
    runSearch();
  });
  
  $("#search-input").on("keyup", function(val)
  {
    if (val.key == "Enter")
    {
      runSearch();
    }
  });
  
  // Run search
  function runSearch()
  {
    var input = document.getElementById("search-input").value;
    var targetURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + input + "&callback=?";
    
    // Remove previous results
    $("#results-container").empty();
    
    // Get search results
    $.getJSON(targetURL, function(json)
    {
      
      // Generate elements
      for(var i = 0; i < json.query.search.length; i++)
        {
          // Get result componenets
          var title = json.query.search[i].title;
          var snippet = json.query.search[i].snippet + "...";
          var link = "https://en.wikipedia.org/wiki/" + title;
          // Create new HTML element
          var newAnchor = document.createElement("A");
          newAnchor.href = link;
          newAnchor.target = "_blank";

          var newResultTitle = document.createElement("P");
          newResultTitle.id = "result-title";
          newResultTitle.innerHTML = title;
          var newResultSnippet = document.createElement("P");
          newResultSnippet.id = "result-snippet";
          newResultSnippet.innerHTML = snippet;

          var newButton = document.createElement("DIV");
          newButton.id = "result-button";
          newButton.appendChild(newResultTitle);
          newButton.appendChild(newResultSnippet);
          newAnchor.appendChild(newButton);
          $("#results-container").append(newAnchor);
          resultString = "";
        }
    });
  }
}