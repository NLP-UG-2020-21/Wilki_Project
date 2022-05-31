//Guzik do scroll up
//Get the button:
const mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
//Koniec guzika do scroll up

//collapsibles//
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
   coll[i].addEventListener("click", function() {
     this.classList.toggle("active");
     var content = this.nextElementSibling;
     if (content.style.maxHeight){
       content.style.maxHeight = null;
    } else {
       content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

//API//
const perspective_api_call = async() => {
  console.log("HERE")
  const text_to_check = document.getElementById("textBox").value;
  const results_list = document.getElementById("results");
  results_list.innerHTML = "";
  const test = await axios({
    url: "https://simple-perspective-client.herokuapp.com/persp",
    method: 'POST',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {text: text_to_check}
  });
  console.log(test.data);

  results_list.append("Results: ");
  
  let toxicity_result = document.createElement("li");
  let sexually_explicit_result = document.createElement("li");
  let threat_result = document.createElement("li");

  toxicity_result.textContent = `TOXICITY: ${test?.data?.attributeScores?.TOXICITY?.summaryScore?.value || `unknown`}`;
  sexually_explicit_result.textContent = `SEXUAL HARRASEMENT: ${test?.data?.attributeScores?.SEXUALLY_EXPLICIT?.summaryScore?.value || `unknown`}`;
  threat_result.textContent = `THREAT: ${test?.data?.attributeScores?.THREAT?.summaryScore?.value || `unknown`}`;
 
  results_list.appendChild(toxicity_result);
  results_list.appendChild(sexually_explicit_result);
  results_list.appendChild(threat_result);
}

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  perspective_api_call();
})