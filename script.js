// colors by publication
const primary = '#aa1e22';
const logo = 'logos/dp.svg';
const inverse = 'logos/inverse-dp.svg';
// penns colors
const pennBlue = '#00337F';
const pennRed = '#A32638';
// ivy data in alphabetical order (no penn)
const ivies = {
  brown: {
    name: 'Brown',
    color: '#654321'
  },
  columbia: {
    name: 'Columbia',
    color: '#9BCBEB'
  },
  cornell: {
    name: 'Cornell',
    color: '#B31B1B'
  },
  dartmouth: {
    name: 'Dartmouth',
    color: '#00693E'
  },
  harvard: {
    name: 'Harvard',
    color: '#C90016'
  },
  princeton: {
    name: 'Princeton',
    color: '#FF8F00'
  },
  yale: {
    name: 'Yale',
    color: '#0F4D92'
  }
}

var includeLogo = true;
var inverseColors = false;
var useWordmark = false;
var useSports = false;
var includePhoto = false;
var photoURL = "";
var centerElements = true;
var teamOneName = "Penn";
var teamTwoName = "Other Team";
var teamOneScore = 0;
var teamTwoScore = 0;
var pennColor = pennBlue;
var teamTwoColor = "#FFFFFF"
var  otherTeam = true;



var drawLine = function(gameContext, width, height) {
  gameContext.beginPath();
  gameContext.moveTo(width / 2 + 10, 125);
  gameContext.lineTo(width / 2 + 10, height - 50);
  gameContext.strokeStyle = '#ffffff';
  gameContext.stroke();
}

var wrapText = function(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
  return y;
}

var renderContent = function() {
  document.getElementById('teamTwoName').disabled = !otherTeam;
  document.getElementById('teamTwoColor').disabled = !otherTeam;
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
  * RENDER CANVAS WITH PHOTO
  * * * * * * * * * * * * * * *  * * * * * */
  if (includePhoto && photoURL != "") {
    drawLine(gameContext, canvas.width, canvas.height);
    var teamOne = wrapText(gameContext, teamOneName.toUpperCase(), canvas.width / 4,
      canvas.height / 2 - 150, 460, 48);
    var teamTwo = wrapText(gameContext, teamTwoName.toUpperCase(), (3 * canvas.width) / 4,
      canvas.height / 2 - 150, 460, 48);
    // load logo
    if (includeLogo) {
      var image = new Image();
      image.onload = function() {
        var aspect = image.width / image.height;
        if (useWordmark) {
          var width = 40 * aspect;
          gameContext.drawImage(image, canvas.width - width - 40, 40, width, 40);
        } else {
          var width = 50 * aspect;
          gameContext.drawImage(image, canvas.width - width - 40, 40, width, 50);
        }
      }
    }

    var sizeOfPic = 200;
    // load photo
    var photo = new Image();
    photo.onload = function() {
      gameContext.drawImage(photo, canvas.width / 4 - (sizeOfPic / 2),
        canvas.height / 2 - (sizeOfPic / 2), sizeOfPic, sizeOfPic);
      gameContext.drawImage(photo, (3 * canvas.width) / 4 - (sizeOfPic / 2),
        canvas.height / 2 - (sizeOfPic / 2), sizeOfPic, sizeOfPic);
    }
    photo.src = photoURL;

  /* * * * * * * * * * * * * * * * * * * * *
  * RENDER CANVAS WITHOUT PHOTO
  * * * * * * * * * * * * * * *  * * * * * */
  } else {
    drawLine(gameContext, canvas.width, canvas.height);
    var quoteBottomSpacing = -20 + (includeLogo ? 50 : 120)
     + (!includeLogo ? 40 : 0);

    gameContext.fillStyle = pennColor;
    wrapText(gameContext, teamOneName.toUpperCase(), centerElements ? 250 : 50,
      canvas.height / 2 - quoteBottomSpacing, 800, 48);

    gameContext.fillStyle = teamTwoColor;
    wrapText(gameContext, teamTwoName.toUpperCase(), centerElements ? 750 : 50,
      canvas.height / 2 - quoteBottomSpacing, 800, 48);

    gameContext.fillStyle = pennColor;
    gameContext.font = '200 144px Oswald';
    gameContext.fillText(teamOneScore, centerElements ? 250 : 50,
      canvas.height / 1.3);

    gameContext.fillStyle = teamTwoColor;
    gameContext.fillText(teamTwoScore, centerElements ? 750 : 50,
      canvas.height / 1.3);

    // load logo
    if (includeLogo) {
      var image = new Image();
      image.onload = function() {
        var aspect = image.width / image.height;
        var width = 50 * aspect;
        gameContext.drawImage(image, (centerElements ? (canvas.width - width) / 2 + 10 : canvas.width - width - 50), 50,
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

document.getElementById("pennColorSelect").addEventListener("change", function() {
  pennColor = this.value === 'pennBlue' ? pennBlue : pennRed;
  renderContent();
});

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

// Choose other team
document.getElementById("teamSelect").addEventListener("change", function() {
  document.getElementById("teamTwoName").value = teamTwoName = ivies[this.value].name;
  document.getElementById("teamTwoColor").value = teamTwoColor = ivies[this.value].color;
  otherTeam = this.value === 'other';
  renderContent();
});

document.getElementById("teamOneName").value = "Penn";

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
  includePhoto = !includePhoto;
  renderContent();
});

// Upload Picture
var uploadPicture = document.getElementById('uploadPicture');
var fileInput = document.getElementById('fileInput');
uploadPicture.addEventListener('click', function() {
  fileInput.click();
});
fileInput.addEventListener('change', function() {
  if (this.files && this.files[0]) {
    photoURL = URL.createObjectURL(this.files[0]);
  }
  renderContent();
});

// Include logo
var toggleLogoCheckbox = document.getElementById('toggleLogo');
toggleLogoCheckbox.addEventListener('click', function() {
  includeLogo = !includeLogo;
  renderContent();
});
