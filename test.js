const generateLogo = require("./index");

describe("generateLogo", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(process, "exit").mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
    process.exit.mockRestore();
  });

  it("should generate a logo with the specified text and shape", async () => {
    const mockAnswers = {
      text: "ABC",
      textColor: "#000",
      shape: "circle",
      shapeColor: "#fff"
    };

    jest.spyOn(inquirer, "prompt").mockResolvedValueOnce(mockAnswers);

    await generateLogo();

    expect(fs.existsSync("logo.svg")).toBe(true);
    expect(console.log).toHaveBeenCalledWith("Generated logo.svg");

    const fileContents = fs.readFileSync("logo.svg", "utf8");
    expect(fileContents).toContain(`<circle cx="100" cy="100" r="50" fill="${mockAnswers.shapeColor}"/>`);
    expect(fileContents).toContain(`<text x="150" y="125" text-anchor="middle" font-size="48px" fill="${mockAnswers.textColor}">${mockAnswers.text}</text>`);

    fs.unlinkSync("logo.svg");
  });
});
