let canvas;
let conversionBase; // we can convert it to any base not just 2
let currentNumber;
let remainder;
let animationStep = 0; // Tracks which part of the animation we’re on
let currentFontSize;
let startFontSize;
let targetFontSize = 21; // Shrink to this size
let fontShrinkSpeed = 1; // Speed of font size reduction
let lerpRate;
let positions = {}; // To hold target positions for text
const minWidth = 100;
let width;
let height;
const CANVAS_FONT_RATIO = 3.7;
const CURRENT_NUMBER_TEXT = "Current Number";
const DIVIDE_SYMBOL = "/";
const NEW_BASE = "New Base";
const REMAINDER = "Remainder";
const TEXT_SPACER = 10;
let x;
let y;
let userInputStage = true;
let base10InputDiv;
let base10InputLabel;
let base10Input;
let newBaseInputDiv;
let newBaseLabel;
let newBaseInput;
let convertButton;
let animatedCalculations = [];
let textY = 90;
let algorithmStep = 0; //0 currentNumber, 1 new base, 2 remainder
let algorithmAnimating = true;
let alpha = 0;
let alphachange = 2;
let result = "";
let resultLabel;
let resultTextBox;
let resultDiv;
let isResultAnimation = false;
let resultFontSize;
let remainderCounter = 1;
let resultTextX = 20;
const symbolMap = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
  16: "G",
  17: "H",
  18: "I",
  19: "J",
  20: "K",
  21: "L",
  22: "M",
  23: "N",
  24: "O",
  25: "P",
  26: "Q",
  27: "R",
  28: "S",
  29: "T",
  30: "U",
  31: "V",
  32: "W",
  33: "X",
  34: "Y",
  35: "Z",
};

function setup() {
  width = select("#base-10-conversion-fig").size().width;
  height = select("#base-10-conversion-fig").size().height;

  //Lets make the base 10 input form field using BULMA classes!
  //make base 10 input field div
  base10InputDiv = createDiv();
  base10InputDiv.parent("#canvas-controls");
  base10InputDiv.addClass("feildmt-1 mb-1");
  //create the label
  base10InputLabel = createElement("label", "Enter a number:");
  base10InputLabel.addClass("label has-text-dark");
  base10InputLabel.parent(base10InputDiv);
  //create the input. bulma requires a div wrapper with control class
  let base10InputControl = createDiv();
  base10InputControl.addClass("control");
  base10InputControl.parent(base10InputDiv);
  base10Input = createInput("28");
  base10Input.addClass("input");
  base10Input.parent(base10InputControl);
  //create the input field for the new base
  //make field div
  newBaseInputDiv = createDiv();
  newBaseInputDiv.parent("#canvas-controls");
  newBaseInputDiv.addClass("feild mt-1 mb-1");
  //make the label
  newBaseLabel = createElement("label", "Enter a new base:");
  newBaseLabel.addClass("label has-text-dark");
  newBaseLabel.parent(newBaseInputDiv);
  //lets make the input control div an the input field
  let newBaseInputControl = createDiv();
  newBaseInputControl.addClass("control");
  newBaseInputControl.parent(newBaseInputDiv);
  newBaseInput = createInput("2");
  newBaseInput.id("new-base-input");
  newBaseInput.addClass("input");
  newBaseInput.parent(newBaseInputControl);

  //create the button
  let convertButtonField = createDiv();
  convertButtonField.addClass("field mt-1 mb-1");
  convertButtonField.parent("#canvas-controls");
  let convertButtonControl = createDiv();
  convertButtonControl.addClass("control");
  convertButtonControl.parent(convertButtonField);
  convertButton = createButton("Convert");
  convertButton.parent(convertButtonControl);
  convertButton.addClass("button is-link");
  convertButton.mouseClicked(convertNumber);
  //create the result div
  resultDiv = createDiv();
  resultDiv.addClass("field");
  resultDiv.parent("#canvas-controls");
  resultLabel = createElement("label", "Result: ");
  resultLabel.parent(resultDiv);
  resultTextBox = createSpan(result);
  resultTextBox.parent(resultDiv);

  //create the canvas
  canvas = createCanvas(width, height);
  canvas.parent("#base-10-conversion");
  canvas.id("base-10-canvas");
  updateFontSizeAndTextPosition();
}

function draw() {
  background("#423D3D");

  if (userInputStage) {
    textSize(targetFontSize);
    let input = base10Input.value();
    let msg;
    if (isWholeNumber(input)) {
      fill(0, 255, 0);
      msg = input + " is a valid base 10 integer!";
    } else {
      fill(255, 0, 0);
      msg = input + " is not a valid number :(";
    }
    text(msg, 20, 40);
    input = newBaseInput.value();
    if (isWholeNumber(input) && input <= 45) {
      fill(0, 255, 0);

      msg = input + " is a valid new base";
    } else if (isWholeNumber(input) && input > 45) {
      fill(255, 0, 0);
      textWrap(WORD);
      msg = input + " is a valid base but too big for this application.";
    } else {
      fill(255, 0, 0);
      msg = input + " is not a valid base :(";
    }
    text(msg, 20, 40 + targetFontSize);
  } else if (animationStep < 4) {
    fill("#f25733");
    textAlign(LEFT, TOP);

    switch (animationStep) {
      case 0:
        textSize(currentFontSize);
        text(CURRENT_NUMBER_TEXT, x, y);
        if (currentFontSize > targetFontSize) {
          currentFontSize -= fontShrinkSpeed; // Shrink font size
          x = lerp(x, positions.currentNumber.x, lerpRate);
          y = lerp(y, positions.currentNumber.y, lerpRate);
        } else {
          animationStep++; // Move to next step
          currentFontSize = startFontSize;
          x = width / 2;
          y = width / 2;
        }
        break;
      case 1:
        //display step 0 text
        textSize(targetFontSize);
        textAlign(LEFT, TOP);
        text(
          CURRENT_NUMBER_TEXT,
          positions.currentNumber.x,
          positions.currentNumber.y
        );
        //animate the second word
        textSize(currentFontSize);
        text(DIVIDE_SYMBOL, x, y);
        if (currentFontSize > targetFontSize) {
          currentFontSize -= fontShrinkSpeed; // Shrink font size
          x = lerp(x, positions.divSymbol.x, lerpRate);
          y = lerp(y, positions.divSymbol.y, lerpRate);
        } else {
          animationStep++; // Move to next step
          currentFontSize = startFontSize;
          x = width / 2;
          y = width / 2;
        }
        break;
      case 2:
        //display step 0 and 1 text
        textSize(targetFontSize);
        textAlign(LEFT, TOP);
        text(
          CURRENT_NUMBER_TEXT,
          positions.currentNumber.x,
          positions.currentNumber.y
        );
        text(DIVIDE_SYMBOL, positions.divSymbol.x, positions.divSymbol.y);
        //animate the second word
        textSize(currentFontSize);
        text(NEW_BASE, x, y);
        if (currentFontSize > targetFontSize) {
          currentFontSize -= fontShrinkSpeed; // Shrink font size
          x = lerp(x, positions.newBase.x, lerpRate);
          y = lerp(y, positions.newBase.y, lerpRate);
        } else {
          animationStep++; // Move to next step
          currentFontSize = startFontSize;
          x = width / 2;
          y = width / 2;
        }
        break;
      case 3:
        //display step 0 and 1 text
        textSize(targetFontSize);
        textAlign(LEFT, TOP);
        text(
          CURRENT_NUMBER_TEXT,
          positions.currentNumber.x,
          positions.currentNumber.y
        );
        text(DIVIDE_SYMBOL, positions.divSymbol.x, positions.divSymbol.y);
        text(NEW_BASE, positions.newBase.x, positions.newBase.y);
        //animate the second word
        textSize(currentFontSize);
        text(REMAINDER, x, y);
        if (currentFontSize > targetFontSize) {
          currentFontSize -= fontShrinkSpeed; // Shrink font size
          x = lerp(x, positions.remainder.x, lerpRate);
          y = lerp(y, positions.remainder.y, lerpRate);
        } else {
          animationStep++; // Move to next step
          currentFontSize = startFontSize;
          x = width / 2;
          y = width / 2;
        }
        break;
    }
  } else {
    const r = 242;
    const g = 87;
    const b = 51;
    fill(r, g, b, 256);

    // now we will animate the algorithm
    textSize(targetFontSize);
    textAlign(LEFT, TOP);
    text(
      CURRENT_NUMBER_TEXT,
      positions.currentNumber.x,
      positions.currentNumber.y
    );
    text(DIVIDE_SYMBOL, positions.divSymbol.x, positions.divSymbol.y);
    text(NEW_BASE, positions.newBase.x, positions.newBase.y);
    text(REMAINDER, positions.remainder.x, positions.remainder.y);
    animatedCalculations.forEach((line) => {
      text(
        line.currentNumber.text,
        positions.currentNumber.x,
        line.currentNumber.y
      );
      if (line.divSymbol) {
        text(line.divSymbol.text, positions.divSymbol.x, line.divSymbol.y);
      }
      if (line.newBase) {
        text(line.newBase.text, positions.newBase.x, line.newBase.y);
      }
      if (line.remainder) {
        isResultAnimation ? textSize(resultFontSize) : textSize(targetFontSize);
        text(line.remainder.text, line.remainder.x, line.remainder.y);
      }
    });
    if (algorithmAnimating) {
      fill(r, g, b, alpha);
      switch (algorithmStep) {
        case 0:
          text(str(currentNumber), positions.currentNumber.x, textY);
          alpha += alphachange;
          if (alpha > 255) {
            alpha = 0;
            animatedCalculations.push({
              currentNumber: {
                text: str(currentNumber),
                y: textY,
              },
            });
            algorithmStep++;
          }
          break;
        case 1:
          text(str(conversionBase), positions.newBase.x, textY);
          alpha += alphachange;
          if (alpha > 255) {
            alpha = 0;
            animatedCalculations.at(-1).newBase = {
              text: str(conversionBase),
              y: textY,
            };
            algorithmStep++;
            remainder = currentNumber % conversionBase;
            currentNumber = Math.floor(currentNumber / conversionBase);
          }
          break;
        case 2:
          text(str(remainder), positions.remainder.x, textY);
          alpha += alphachange;
          if (alpha > 255) {
            alpha = 0;
            animatedCalculations.at(-1).remainder = {
              text: str(remainder),
              x: positions.remainder.x,
              y: textY,
              counter: remainderCounter,
            };
            remainderCounter++;
            let remainderString = symbolMap[str(remainder)]
              ? symbolMap[str(remainder)]
              : str(remainder);
            result = remainderString + result;
            resultTextBox.html(result);
            algorithmStep = 0;
            if (currentNumber <= 0) {
              algorithmAnimating = false;
              isResultAnimation = true;
              resultFontSize = calculateTargetFont(width, targetFontSize, true);
            }
            textY = textY + TEXT_SPACER + targetFontSize;
            if (textY + targetFontSize > height) {
              height = height + targetFontSize + TEXT_SPACER + TEXT_SPACER;
              resizeCanvas(width, height);
            }
          }
          break;
      }
    }
    // lets move the resulting remainder into their msb to lsb result
    if (isResultAnimation) {
      let line = animatedCalculations.at(remainderCounter - 2);
      line.remainder.x = lerp(line.remainder.x, resultTextX, 0.1);
      line.remainder.y = lerp(line.remainder.y, textY, 0.1);
      if (
        resultTextX - 1 <= line.remainder.x &&
        line.remainder.x <= resultTextX + 1 &&
        textY - 1 <= line.remainder.y &&
        line.remainder.y <= textY + 1
      ) {
        remainderCounter--;
        if (symbolMap[line.remainder.text]) {
          line.remainder.text = symbolMap[line.remainder.text];
        }
        textSize(resultFontSize);
        resultTextX =
          resultTextX + TEXT_SPACER + textWidth(line.remainder.text);
      }
      if (remainderCounter === 1) isResultAnimation = false;
    }
  }
}

function updateFontSizeAndTextPosition() {
  startFontSize = floor(height / CANVAS_FONT_RATIO);
  currentFontSize = startFontSize;
  targetFontSize = startFontSize;
  targetFontSize = calculateTargetFont(width, targetFontSize, false);
  lerpRate = targetFontSize / startFontSize;
  x = width / 2;
  y = height / 2;

  // Set target positions for the final display
  textSize(targetFontSize);
  let currentX = 20;
  positions.currentNumber = { x: currentX, y: 40 };
  currentX += TEXT_SPACER;
  currentX += ceil(textWidth(CURRENT_NUMBER_TEXT));
  positions.divSymbol = { x: currentX, y: 40 };
  currentX += TEXT_SPACER;
  currentX += ceil(textWidth(DIVIDE_SYMBOL));
  positions.newBase = { x: currentX, y: 40 };
  currentX += TEXT_SPACER;
  currentX += ceil(textWidth(NEW_BASE));
  positions.remainder = { x: currentX, y: 40 };
  textSize(currentFontSize);
}

function calculateTargetFont(width, fontSize, isForResult) {
  let widthUsed;
  if (isForResult) {
    let spacerTotal = (result.length - 1) * TEXT_SPACER;
    //add 20 for left margin and 20 for right margin
    spacerTotal += 40;
    do {
      textSize(fontSize);
      widthUsed = spacerTotal + ceil(textWidth(result));
      fontSize--;
    } while (widthUsed > width);
  } else {
    do {
      textSize(fontSize);
      widthUsed = 20;
      widthUsed += ceil(textWidth(CURRENT_NUMBER_TEXT));
      widthUsed += TEXT_SPACER;
      widthUsed += ceil(textWidth(DIVIDE_SYMBOL));
      widthUsed += TEXT_SPACER;
      widthUsed += ceil(textWidth(NEW_BASE));
      widthUsed += TEXT_SPACER;
      widthUsed += ceil(textWidth(REMAINDER));
      widthUsed += 20;
      fontSize--;
    } while (widthUsed > width);
  }
  return fontSize;
}

function isWholeNumber(input) {
  input = input.trim();
  // Check if the string can be converted to a number
  if (isNaN(input) || input.length === 0) {
    return false;
  }

  // Convert the string to a number and check if it's an integer
  const num = Number(input);
  return Number.isInteger(num) && num >= 0;
}

function convertNumber() {
  if (
    isWholeNumber(base10Input.value()) &&
    isWholeNumber(newBaseInput.value())
  ) {
    currentNumber = Number(base10Input.value());
    base10Input.attribute("disabled", "");
    conversionBase = Number(newBaseInput.value());
    newBaseInput.attribute("disabled", "");
    userInputStage = false;
  }
}

function windowResized() {
  width = select("#base-10-conversion-fig").size().width;
  resizeCanvas(width, height);
  updateFontSizeAndTextPosition();
}
