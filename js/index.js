var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 1000); // Change image every 2 seconds
}

document
  .getElementById("contentModerationForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const textInput = document.getElementById("textInput").value;

    const subscriptionKey = "4f8d9fa4-760c-4a1b-a997-832756d60426";
    const endpoint =
      "https://brrgrrbo.cognitiveservices.azure.com/contentmoderator/moderate/v1.0/ProcessText/Screen";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "Ocp-Apim-Subscription-Key": subscriptionKey,
        },
        body: textInput,
      });

      const data = await response.json();
      displayResults(data);
    } catch (error) {
      console.error("Error:", error);
    }
  });

function displayResults(data) {
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  if (data && data.Terms) {
    const termsList = data.Terms.map((term) => `<li>${term.Term}</li>`).join(
      ""
    );
    resultContainer.innerHTML = `<p>Detected terms:</p><ul>${termsList}</ul>`;
    alert("Please Edit Your Response!!!");
  } else {
    resultContainer.innerHTML = "<p>No inappropriate content detected</p>";
 alert("Thank you For Subscription");
   
  }
}
