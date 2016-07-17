  var follower = document.querySelector('#follower');
  var lineCol = "#808080";
  var lineWid = 50;
  var lineOpacity = 1;
  var lineSoft = 20;

  var layerCounter = 2;
  var layerZ = -99;


  var updateFollower = function () {
      follower.style.backgroundColor = lineCol;
      follower.style.width = lineWid + "px";
      follower.style.height = lineWid + "px";

  };

  var setEraserSettings = function () {
      if (document.getElementById("eraserRadio").checked) {
          follower.style.backgroundColor = "white";
          console.log("eraser");
      };

  };

  $('#colorpicker2').farbtastic({
      callback: function (color) {
          lineCol = color;
          var colorBox = document.getElementById("currentColorBox");
          colorBox.style.backgroundColor = color;
          updateFollower();
      }
      , width: 150
  });

  // Author:  Jacek Becela
  // Source:  http://gist.github.com/399624
  // License: MIT
  jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {
      return this.each(function () {
          var clicks = 0
              , self = this;
          jQuery(this).click(function (event) {
              clicks++;
              if (clicks == 1) {
                  setTimeout(function () {
                      if (clicks == 1) {
                          single_click_callback.call(self, event);
                      } else {
                          double_click_callback.call(self, event);
                      }
                      clicks = 0;
                  }, timeout || 300);
              }
          });
      });
  }

  //tried to make a for loop to make this section faster, but it never worked???
  $('#colorMem1').single_double_click(function () {
      var colorBox = document.getElementById("colorMem1");
      lineCol = colorBox.style.backgroundColor;
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol;
  }, function () {
      var colorBox = document.getElementById("colorMem1");
      colorBox.style.backgroundColor = lineCol;
  });

  $('#colorMem2').single_double_click(function () {
      var colorBox = document.getElementById("colorMem2");
      lineCol = colorBox.style.backgroundColor;
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol;
  }, function () {
      var colorBox = document.getElementById("colorMem2");
      colorBox.style.backgroundColor = lineCol;
  });
  $('#colorMem3').single_double_click(function () {
      var colorBox = document.getElementById("colorMem3");
      lineCol = colorBox.style.backgroundColor;
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol;
  }, function () {
      var colorBox = document.getElementById("colorMem3");
      colorBox.style.backgroundColor = lineCol;
  });
  $('#colorMem4').single_double_click(function () {
      var colorBox = document.getElementById("colorMem4");
      lineCol = colorBox.style.backgroundColor;
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol;
  }, function () {
      var colorBox = document.getElementById("colorMem4");
      colorBox.style.backgroundColor = lineCol;
  });

  $('#colorMem5').single_double_click(function () {
      var colorBox = document.getElementById("colorMem5");
      lineCol = colorBox.style.backgroundColor;
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol;
  }, function () {
      var colorBox = document.getElementById("colorMem5");
      colorBox.style.backgroundColor = lineCol;
  });

  var widSlider = document.getElementById("lineWid");
  var opacitySlider = document.getElementById("lineOpacity");
  var softnessSlider = document.getElementById("lineSoftness");


  opacitySlider.value = 100;
  softnessSlider.value = 20;

  widSlider.addEventListener("change", function () {
      lineWid = widSlider.value;
      var widthPercent = document.querySelector("#widthPercent");
      widthPercent.innerText = widSlider.value + "%";
      updateFollower();
  })

  opacitySlider.addEventListener("change", function () {
      var opacityPercent = document.querySelector("#opacityPercent");
      opacityPercent.innerText = opacitySlider.value + "%";

      lineOpacity = opacitySlider.value / 100.0;
      updateFollower();
  })


  softnessSlider.addEventListener("change", function () {
      var softnessPercent = document.querySelector("#softnessPercent");

      softnessPercent.innerText = softnessSlider.value + "%";

      lineSoft = softnessSlider.value;
      updateFollower();
  });



  // instead of canvas, the eventlistner is added to a "cover" on top of the canvas. 
  var canvas = document.querySelector('#canvas1'); // Grab a JS hook into our canvas element

  var cover = document.querySelector('#canvasCover');
  var ctx = canvas.getContext('2d');

  //        ctx.globalCompositeOperation = 'xor';

  cover.addEventListener("mouseenter", function () {
      follower.classList.add("on");
      updateFollower;
      setEraserSettings();

  });

  cover.addEventListener("mouseleave", function () {
      follower.classList.remove("on");
  });


  var line = function (x1, y1, x2, y2, lineTemp) {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.moveTo(x1, y1);
      ctx.lineWidth = lineTemp;
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = lineCol;
      ctx.stroke();
      ctx.closePath();
  };



  var mouseIsDown = false;
  var mousePosition = {
      x: null
      , y: null
  };
  var updateMousePosition = function (event) {
      mousePosition.x = event.offsetX;
      mousePosition.y = event.offsetY;
  };

  cover.addEventListener('mousedown', function (event) {
      mouseIsDown = true; // toggle mouseIsDown
      updateMousePosition(event); // update the mousePosition
  });
  cover.addEventListener('mouseup', function (event) {
      mouseIsDown = false;
  });

  // When the mouse is moved over the canvas element
  cover.addEventListener('mousemove', function (event) {
      if (mouseIsDown) {

          //                the mouse positions. program does not work if these are placed inside the while loop
          var mpX = mousePosition.x;
          var mpY = mousePosition.y;

          var ex = event.offsetX;
          var ey = event.offsetY;

          //                tempWid is a temporary width that will change
          //                omo is the current opacity that gets incremented up
          var tempWid = lineWid;
          var omo = 0.0;


          //                else{

          //                just in case
          if (lineSoft <= 0) {
              ctx.globalAlpha = lineOpacity;
              line(mpX, mpY, ex, ey, tempWid);

              tempWid = -1;
          }

          if (document.getElementById("eraserRadio").checked) {
              ctx.globalCompositeOperation = "destination-out";
              follower.style.backgroundColor = "white";
          };

          //as it gets softer, originally it also got smaller, so the code below just increases lineWidth as it gets softer

          if (lineSoft > 30) {
              tempWid = tempWid * 1.4;
          } else if (lineSoft > 40) {
              tempWid = tempWid * 1.45;
          } else if (lineSoft > 50) {
              tempWid = tempWid * 1.5;
          } else if (lineSoft > 60) {
              tempWid = tempWid * 1.6;
          } else if (lineSoft > 70) {
              tempWid = tempWid * 1.7;
          } else if (lineSoft > 80) {
              tempWid = tempWid * 1.8;
          } else if (lineSoft > 90) {
              tempWid = tempWid * 1.9;
          }

          if (lineSoft > 100) {
              lineSoft = 100;
          }


          //implementing lineOpacity within softness
          var opacityCutoff = tempWid - ((lineOpacity) * tempWid);

          //the while loop
          while (tempWid > opacityCutoff) {
              ctx.globalAlpha = omo / 100.0;
              line(mpX, mpY, ex, ey, tempWid);
              tempWid = tempWid - (lineSoft) / 20.0;
              omo = omo + (lineOpacity) * .8;
          }
          updateMousePosition(event);
      }



      //*****extra added for the follower to follow the cursor
      follower.style.left = event.x - .5 * lineWid + "px";
      follower.style.top = event.y - .5 * lineWid + "px";

      ctx.globalCompositeOperation = "source-over";
      updateFollower();


  });



  //        code to clear canvas
  var canvas2 = document.querySelector('#canvas1');
  var ctx2 = canvas2.getContext('2d');

  var clearButton = document.getElementById("clear");

  clearButton.addEventListener('click', function () {

      var canvas2width = canvas2.width;
      var canvas2height = canvas2.height;

      ctx.clearRect(0, 0, canvas2width, canvas2height);
  });

