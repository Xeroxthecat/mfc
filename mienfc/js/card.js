(function () {

  window.onload = function () {

    //var url = 'http://simplemike.com/sandbox/test.json';
    var url = "http://www.json-generator.com/api/json/get/cqgtPFKIRK?indent=2";
    var front = true;
    var arrayIndex = 0;
    var myObj = '';
    var category = '';

    //Colors
    function getColors() {
      fetch(url)
        .then(function (data) {
       
          return data.json();
        })
        .then(function (myJson) {
          console.log(JSON.stringify(myJson));
          //console.log(myJson[0].animals[arrayIndex].englishWord);

          //display the card for the first time
          displayPic(myJson, arrayIndex);
          displayEngWord(myJson, arrayIndex);

          myObj = myJson;
          return myJson;
        })
        .catch(function (error) {
          console.log("An error occurred: ", error.message);
        });
    }

    function displayPic(obj, index) {
      cardTop.innerHTML = JSON.stringify(obj[0].colors[index].image);
    }

    function displayEngWord(obj, index) {
      cardBottom.innerHTML = JSON.stringify(obj[0].colors[index].englishWord);
    }

    function displayMienWord(obj, index) {
      cardTop.innerHTML = JSON.stringify(obj[0].colors[index].mienWord);
    }

    function displaySound(obj, index) {
      cardBottom.innerHTML = JSON.stringify(obj[0].colors[index].soundFile);
    }

    function flipCard() {

      //check if within array, if not, loop back to front
      if (arrayIndex >= (myObj[0].colors.length)) {
        arrayIndex = 0;
      }

      if (front) {
        displayMienWord(myObj, arrayIndex);
        displaySound(myObj, arrayIndex);
        front = false;
        document.getElementById('flashcard').style.backgroundColor = "silver";

      }
      else {
        displayPic(myObj, arrayIndex);
        displayEngWord(myObj, arrayIndex);
        front = true;
        document.getElementById('flashcard').style.backgroundColor = "white";
      }

    }

    function nextCard() {
      console.log("on to the next card");
      arrayIndex++;
      console.log('array index is: ' + arrayIndex)
    }

    function answeredCorrect() {
      console.log("i got this right");
      nextCard();
    }

    function answeredWrong() {
      console.log("i got this wrong");
      nextCard();
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