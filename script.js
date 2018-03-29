var name = "Amy Gutmann";
var opposingTeamScore = 0;
var pennScore = 0;
var opposingTeam = "Insert Team";
var title = "Penn President";
var showAttribution = false;
var includeLogo = true;
var inverseColors = false;
var useWordmark = false;
var useSports = true;
var includePhoto = false;
var photoURL = "";
var centerElements = true;

// colors by publication
const primary = ['#aa1e22', '#44bfbf', '#446cb3'];
const logo = ['logos/dp.svg', 'logos/street.svg', 'logos/utb.svg'];
const inverse = ['logos/inverse-dp.svg', 'logos/inverse-street.svg', 'logos/utb.svg'];

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
  var canvas = document.getElementById("canvas");
  canvas.width = 1000;
  canvas.height = 500;

  var pub = document.getElementById("publicationSelect").selectedIndex;

  // QUOTE TEXT + BG + IMG
  var quoteCtx = canvas.getContext("2d");
  quoteCtx.fillStyle = primary[pub];
  quoteCtx.fillRect(0, 0, canvas.width, canvas.height);
  if (inverseColors) {
    quoteCtx.fillStyle = "#ffffff";
    quoteCtx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
  }

  quoteCtx.font = "200 38px lora";
  if (inverseColors) {
    quoteCtx.fillStyle = primary[pub];
  } else {
    quoteCtx.fillStyle = "#ffffff";
  }

  /* * * * * * * * * * * * * * * * * * * * *
  * RENDER CANVAS WITH PHOTO
  * * * * * * * * * * * * * * *  * * * * * */
  if (includePhoto && photoURL != "") {
    var attribY = wrapText(quoteCtx, "\“Filler\”", 520,
      canvas.height / 2 - (showAttribution ? 100 : 70), 460, 48);

    // load logo
    if (includeLogo) {
      var image = new Image();
      image.onload = function() {
        var aspect = image.width / image.height;
        if (useWordmark) {
          var width = 40 * aspect;
          quoteCtx.drawImage(image, canvas.width - width - 40, 40, width, 40);
        } else {
          var width = 50 * aspect;
          quoteCtx.drawImage(image, canvas.width - width - 40, 40, width, 50);
        }
      }
    }

    // load photo
    var photo = new Image();
    photo.onload = function() {
      quoteCtx.drawImage(photo, 30, 30, 440, 440);
    }
    photo.src = photoURL;

    if (showAttribution) {
      quoteCtx.textAlign = "left"; // makes below calculations work\
      var nameCtx = canvas.getContext("2d");
      var titleCtx = canvas.getContext("2d");

      // NAME TEXT
      nameCtx.font = "38px neuzeit-grotesk";
      if (inverseColors) {
        nameCtx.fillStyle = primary[pub];
      } else {
        nameCtx.fillStyle = "#ffffff";
      }
      nameCtx.fillText(name, 520, attribY + 100 < (canvas.height - 70) ? attribY + 100 : canvas.height - 70);

      // TITLE TEXT
      titleCtx.font = "100 30px neuzeit-grotesk";
      titleCtx.fillText(title, 520, attribY + 140 < (canvas.height - 30) ? attribY + 140 : canvas.height - 30);
  	}


  /* * * * * * * * * * * * * * * * * * * * *
  * RENDER CANVAS WITHOUT PHOTO
  * * * * * * * * * * * * * * *  * * * * * */
  } else {
    var quoteBottomSpacing = (showAttribution ? 0 : -20) + (includeLogo ? 50 : 120)
     + (!showAttribution && !includeLogo ? 40 : 0);
    wrapText(quoteCtx, "\“Filler\”", 50,
      canvas.height / 2 - quoteBottomSpacing, 800, 48);

    // load logo
    if (includeLogo) {
      var image = new Image();
      image.onload = function() {
        var aspect = image.width / image.height;
        var width = 50 * aspect;
        var centerWidth = canvas.width / 2;
        quoteCtx.drawImage(image, centerWidth - (width / 2), 50,
          width, 50);
      }
    }

    if (showAttribution) {
      quoteCtx.textAlign = "left"; // makes below calculations work
      var nameCtx = canvas.getContext("2d");
      var titleCtx = canvas.getContext("2d");
      var nameLength = nameCtx.measureText(name + " |").width;
      var titleLength = titleCtx.measureText(title).width;

      var nameCtxX = 50;
      var titleCtxX = nameLength + nameCtxX + 30;

      // NAME TEXT
      nameCtx.font = "38px neuzeit-grotesk";
      if (inverseColors) {
        nameCtx.fillStyle = primary[pub];
      } else {
        nameCtx.fillStyle = "#ffffff";
      }
      nameCtx.fillText(name + " |", nameCtxX, canvas.height - (includeLogo ? 70 : 120)
        + (!includeLogo && showAttribution ? 50 : 0));

      // TITLE TEXT
      titleCtx.font = "100 38px neuzeit-grotesk";
      titleCtx.fillText(title, titleCtxX, canvas.height - (includeLogo ? 70 : 120)
        + (!includeLogo && showAttribution ? 50 : 0));
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
      image.src = inverse[pub];
    } else {
      image.src = logo[pub];
    }
  }
}

window.setTimeout(function() {
  renderContent();
}, 700);

document.getElementById('pennScore').oninput = function() {
  pennScore = this.value;
  renderContent();
}

document.getElementById('opposingTeamScore').oninput = function() {
  opposingTeamScore = this.value;
  renderContent();
}

document.getElementById('opposingTeam').oninput = function() {
  opposingTeam = this.value;
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
  saveAs(blob, "quote.png");
});

// EVENT HANDLERS

// Toggle Attribution
// var toggleAttrCheckbox = document.getElementById('toggleAttribution');
// toggleAttrCheckbox.addEventListener('click', function() {
// 	showAttribution = !showAttribution;
// 	renderContent();
// });

// // Toggle Center Elements
// var toggleCenterCheckbox = document.getElementById('centerElements');
// toggleCenterCheckbox.addEventListener('click', function() {
// 	centerElements = !centerElements;
// 	renderContent();
// });

// Toggle Inverse Colors
var toggleColorsCheckbox = document.getElementById('inverseColors');
toggleColorsCheckbox.addEventListener('click', function() {
	inverseColors = !inverseColors;
	renderContent();
});

// Change Selected Publication
var publicationSelect = document.getElementById('publicationSelect');
publicationSelect.addEventListener('change', function() {
  // wordmark and sports are only available for DP
  if (document.getElementById('publicationSelect').selectedIndex != 0) {
    document.getElementById('useWordmark').disabled = true;
    document.getElementById('useWordmark').checked = false;
    useWordmark = false;
    document.getElementById('useSports').disabled = true;
    document.getElementById('useSports').checked = false;
    useSports = false;
  } else {
    document.getElementById('useWordmark').disabled = false;
    document.getElementById('useSports').disabled = false;
  }
	renderContent();
});

// Toggle Wordmark
var useWordmarkCheckbox = document.getElementById('useWordmark');
useWordmarkCheckbox.addEventListener('click', function() {
  useWordmark = !useWordmark;
	renderContent();
});

// Toggle Wordmark
var useSportsCheckbox = document.getElementById('useSports');
useSportsCheckbox.addEventListener('click', function() {
  useSports = !useSports;
	renderContent();
});

// Include Photo
var togglePictureCheckbox = document.getElementById('togglePicture');
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
// var toggleLogoCheckbox = document.getElementById('toggleLogo');
// toggleLogoCheckbox.addEventListener('click', function() {
//   includeLogo = !includeLogo;
//   renderContent();
// });
