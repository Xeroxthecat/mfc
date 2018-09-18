(function () {

  window.onload = function () {

    //var url = 'http://simplemike.com/sandbox/test.json';
    var url = "https://jsonplaceholder.typicode.com/todos/1";

    //display variables
    var picture = "";
    var soundFile = "";
    var wordEnglish = "";
    var wordMien = "";

    //cardside
    var front = true;

    //Colors
    function getColors() {
      fetch(url)
        .then(function (data) {
          return data.json();
        })
        .then(function (myJson) {
          //console.log(JSON.stringify(myJson));

          picture = myJson.title;
          soundFile = myJson.userId;
          wordEnglish = myJson.id;
          wordMien = myJson.completed;

          displayTop(picture);
          displayBottom(wordEnglish);

        })
        .catch(function (error) {
          console.log("An error occurred: ", error.message);
        });
    }

    function displayTop(y) {
      cardTop.innerHTML = JSON.stringify(y);
    }

    function displayBottom(x) {
      cardBottom.innerHTML = JSON.stringify(x);
    }

    function flipCard() {
      if (front) {
        displayTop(wordMien);
        displayBottom(soundFile);
        front = false;
        document.getElementById('flashcard').style.backgroundColor = "silver";
      }
      else {
        displayTop(picture);
        displayBottom(wordEnglish);
        front = true;
        document.getElementById('flashcard').style.backgroundColor = "white";
      }
    }
    
    function nextCard(){
      console.log("on to the next card");
    }

    function answeredCorrect(){
      console.log("i got this right");
    }
    
    function answeredWrong(){
      console.log("i got this wrong");
    }


    //get button category
    function parseParameter() {
      var url_string = window.location.href;
      var url = new URL(url_string);
      var c = url.searchParams.get("type");
      return c;
    }

    //load the category that was clicked
    function loadCategory() {
      var c = parseParameter();
      if (c == 'color') {
        getColors();
      }
    }
    loadCategory();

    document.getElementById("flashcard").onclick = flipCard;
    document.getElementById("right").onclick = answeredCorrect;
    document.getElementById("wrong").onclick = answeredWrong;

  }

})();