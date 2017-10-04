//#source=App.js
(function(){
  var WIDTH = 1000;
  var HEIGHT = 800;
  var initialThickness = 4;
  var initialLineLength = 220;
  var angleChange = 0;
  var canvas = document.getElementById("mainCanvas");
  var app = new PIXI.Application(WIDTH, HEIGHT, { antialias: true, view: canvas });
  var graphics = new PIXI.Graphics();

  var fractalTree = function() {
    var drawBranch = function(x, y, length, thikness, angle) {
      if (length < 2) return;

      thikness *= 0.7;
      length *= 0.68;

      graphics.lineStyle(thikness, 0xFFFFFF, 1000);
      graphics.moveTo(x, y);
      var leftX = x + Math.floor(length * Math.cos((-angle - angleChange) * (Math.PI / (360))));
      var leftY = y + Math.floor(length *  Math.sin((-angle - angleChange) * (Math.PI / (360))));
      graphics.lineTo(leftX, leftY);
      graphics.endFill();
      drawBranch(leftX, leftY, length, thikness, angle + angleChange);

      graphics.lineStyle(thikness, 0xFFFFFF, 1000);
      graphics.moveTo(x, y);
      var leftX = x + Math.floor(length * Math.cos((-angle + angleChange) * (Math.PI / (360))));
      var leftY = y + Math.floor(length * Math.sin((-angle + angleChange) * (Math.PI / (360))))
      graphics.lineTo(leftX, leftY);
      graphics.endFill();
      drawBranch(leftX, leftY, length, thikness, angle - angleChange);
    }

    graphics.lineStyle(initialThickness, 0xFFFFFF, 10);
    graphics.moveTo(WIDTH/2, HEIGHT);
    graphics.lineTo(WIDTH/2, HEIGHT - initialLineLength);
    graphics.endFill();

    drawBranch(WIDTH/2, HEIGHT - initialLineLength, initialLineLength, initialThickness, 180);
  };

  window.onload = function() {

    document.body.appendChild(app.view);
    app.stage.interactive = true;

    app.stage.addChild(graphics);
    var angleSliderElement = document.getElementById("angleSlider");
    angleChange = +(angleSliderElement.value);
    fractalTree();

    angleSliderElement.onchange = function(e) {
      angleChange = +(this.value);
      document.getElementById("angleValue").innerHTML = angleChange + "°";
      graphics.clear();
      fractalTree();
    }
  }
})();
