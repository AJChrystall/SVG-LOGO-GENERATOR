const inquirer = require("inquirer");
const fs = require("fs");
const SVG = require("@svgdotjs/svg.js");

async function generateLogo() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "text",
      message: "Enter up to three characters for your logo:"
    },
    {
      type: "input",
      name: "textColor",
      message: "Enter a color keyword or a hexadecimal number for your text color:"
    },
    {
      type: "list",
      name: "shape",
      message: "Choose a shape for your logo:",
      choices: ["circle", "triangle", "square"]
    },
    {
      type: "input",
      name: "shapeColor",
      message: "Enter a color keyword or a hexadecimal number for your shape color:"
    }
  ]);

  const { text, textColor, shape, shapeColor } = answers;

  // Create a new SVG document
  const svg = SVG().size(300, 200);

  // Add the specified shape to the SVG document
  switch (shape) {
    case "circle":
      svg.circle(100).move(100, 50).fill(shapeColor);
      break;
    case "triangle":
      svg.polygon("100,150 200,150 150,50").fill(shapeColor);
      break;
    case "square":
      svg.rect(100, 50, 100, 100).fill(shapeColor);
      break;
    default:
      break;
  }

  // Add the specified text to the SVG document
  svg.text(text).move(150, 125).font({ size: 48, anchor: "middle" }).fill(textColor);

  // Write the SVG document to a file
  fs.writeFileSync("logo.svg", svg.svg());

  console.log("Generated logo.svg");
}

generateLogo();

module.exports = generateLogo;
