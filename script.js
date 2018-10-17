var includeLogo = true;
var inverseColors = false;
var useWordmark = false;
var useSports = false;
var includePennPhoto = false;
var includeOtherPhoto = false;
var centerElements = true;
var teamOneName = "PENN";
var teamTwoName = "Team Two";
var teamOneScore = 0;
var teamTwoScore = 0;
var teamOneColor = '#ffffff';
var teamTwoColor = '#ffffff';

// colors by publication
const primary = '#aa1e22';
const logo = 'logos/dp.svg';
const inverse = 'logos/inverse-dp.svg';
const pennPic = 'ivies/penn.png';

var renderContent = function() {
  var canvas = document.getElementById("canvas");
  canvas.width = 1000;
  canvas.height = 500;

  // QUOTE TEXT + BG + IMG
  var gameContext = canvas.getContext("2d");
  gameContext.fillStyle = primary;
  gameContext.fillRect(0, 0, canvas.width, canvas.height);
  if (inverseColors) {
    gameContext.fillStyle = "#ffffff";
    gameContext.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
  }

  gameContext.font = "200 38px Oswald";
  if (inverseColors) {
    gameContext.fillStyle = primary;
  } else {
    gameContext.fillStyle = "#ffffff";
  }

  gameContext.textAlign = "center";

  /* * * * * * * * * * * * * * * * * * * * *
  * RENDER CANVAS WITH SECOND PHOTO
  * * * * * * * * * * * * * * *  * * * * * */
  if (includeOtherPhoto) {
    // drawLine(gameContext, canvas.width, canvas.height);
    var combinedNames = teamOneName.toUpperCase() + " VS. " + teamTwoName.toUpperCase();
    gameContext.fillText(combinedNames, canvas.width / 2, canvas.height / 3.1);

    // load logo
    if (includeLogo) {
      var image = new Image();
      image.onload = function() {
        var aspect = image.width / image.height;
        if (useWordmark) {
          var width = 40 * aspect;
          gameContext.drawImage(image, (canvas.width - width) / 2, 40, width, 40);
        } else {
          var width = 50 * aspect;
          gameContext.drawImage(image, (canvas.width - width) / 2, 40, width, 50);
        }
      }
    }

    var sizeOfPic = 150;
    // load photo
    var pennPhoto = new Image();
    pennPhoto.onload = function() {
      gameContext.drawImage(pennPhoto, canvas.width / 4 - (sizeOfPic / 2),
        canvas.height / 2 - (sizeOfPic / 2) + 25, sizeOfPic, sizeOfPic);
    }
    pennPhoto.src = pennPic;

  /* * * * * * * * * * * * * * * * * * * * *
  * RENDER CANVAS WITHOUT PHOTO
  * * * * * * * * * * * * * * *  * * * * * */
  } else {
    // gameContext.fillStyle = teamOneColor;
    var combinedNames = teamOneName.toUpperCase() + " VS. " + teamTwoName.toUpperCase();
    gameContext.fillText(combinedNames, canvas.width / 2, canvas.height / 3.1);

    gameContext.font = '200 50px Oswald';
    gameContext.fillText(teamOneScore, centerElements ? 250 : 50,
      canvas.height - 50);

    gameContext.fillText(teamTwoScore, centerElements ? 750 : 50,
      canvas.height - 50);

    var sizeOfPic = 150;
    // load photo
    var pennPhoto = new Image();
    pennPhoto.onload = function() {
      gameContext.drawImage(pennPhoto, canvas.width / 4 - (sizeOfPic / 2),
        canvas.height / 2 - (sizeOfPic / 2) + 25, sizeOfPic, sizeOfPic);
    }
    pennPhoto.src = pennPic;

    // load logo
    if (includeLogo) {
      var image = new Image();
      image.onload = function() {
        var aspect = image.width / image.height;
        var width = 50 * aspect;
        gameContext.drawImage(image, (canvas.width - width) / 2, 50,
          width, 50);
      }
    }
  }

  // add logo
  if (useSports) {
    if (inverseColors) {
      image.src = "logos/inverse-sports.svg";
    } else {
      image.src = "logos/sports.svg";
    }
  } else if (useWordmark) {
    if (inverseColors) {
      image.src = "logos/inverse-dp-wordmark.svg";
    } else {
      image.src = "logos/dp-wordmark.svg";
    }
  } else {
    if (inverseColors) {
      image.src = inverse;
    } else {
      image.src = logo;
    }
  }
}

window.setTimeout(function() {
  renderContent();
}, 700);

document.getElementById('teamOneName').oninput = function() {
  teamOneName = this.value;
  renderContent();
}

document.getElementById('teamTwoName').oninput = function() {
  teamTwoName = this.value;
  renderContent();
}

document.getElementById('teamOneScore').oninput = function() {
  teamOneScore = this.value;
  renderContent();
}

document.getElementById('teamTwoScore').oninput = function() {
  teamTwoScore = this.value;
  renderContent();
}

document.getElementById('teamOneColor').oninput = function() {
  if (/^[0-9a-f]{3,6}$/.test(this.value)) {
    teamOneColor = '#' + this.value;
  }
  renderContent();
}

document.getElementById('teamTwoColor').oninput = function() {
  if (/^[0-9a-f]{3,6}$/.test(this.value)) {
    teamTwoColor = '#' + this.value;
  }
  renderContent();
}

document.getElementById('saveButton').addEventListener('click', function() {
  var dataURL = canvas.toDataURL("image/png");
  var data = atob(dataURL.substring("data:image/png;base64,".length)),
    asArray = new Uint8Array(data.length);
  for (var i = 0, len = data.length; i < len; ++i) {
    asArray[i] = data.charCodeAt(i);
  }
  var blob = new Blob([asArray.buffer], {
    type: "image/png"
  });
  var filename = teamOneName + teamTwoName + "GameCard.png";
  saveAs(blob, filename);
});

// EVENT HANDLERS

// Toggle Inverse Colors
var toggleColorsCheckbox = document.getElementById('inverseColors');
toggleColorsCheckbox.addEventListener('click', function() {
  inverseColors = !inverseColors;
  renderContent();
});

// Toggle Wordmark
var useWordmarkCheckbox = document.getElementById('useWordmark');
useWordmarkCheckbox.addEventListener('click', function() {
  useWordmark = !useWordmark;
  renderContent();
});

// Toggle Sports Logo
var useSportsCheckbox = document.getElementById('useSports');
useSportsCheckbox.addEventListener('click', function() {
  useSports = !useSports;
  renderContent();
});

// Include Photo
var togglePictureCheckbox = document.getElementById('togglePennPicture');
togglePictureCheckbox.addEventListener('click', function() {
  includePennPhoto = !includePennPhoto;
  renderContent();
});

// Include Other Team Photo
var togglePictureCheckbox = document.getElementById('toggleOtherTeamPicture');
togglePictureCheckbox.addEventListener('click', function() {
  includeOtherPhoto = !includeOtherPhoto;
  renderContent();
});

// Include logo
var toggleLogoCheckbox = document.getElementById('toggleLogo');
toggleLogoCheckbox.addEventListener('click', function() {
  includeLogo = !includeLogo;
  renderContent();
});
