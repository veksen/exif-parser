const { apertureSpeedToHuman } = require("./index");

describe("apertureSpeedToHuman", () => {
  it("returns a valid human readable aperture speed - below 1s exact match", () => {
    expect(apertureSpeedToHuman("0.000625")).toBe("1/1600");
    expect(apertureSpeedToHuman("0.00125")).toBe("1/800");
    expect(apertureSpeedToHuman("0.03333333333333333")).toBe("1/30");
  });

  it("returns a valid human readable aperture speed - inexact match", () => {
    expect(apertureSpeedToHuman("0.01666666666666666")).toBe("1/60");
    expect(apertureSpeedToHuman("0.0101316")).toBe("1/100");
  });

  it("returns a valid human readable aperture speed - 1s or above", () => {
    expect(apertureSpeedToHuman("1")).toBe("1");
    expect(apertureSpeedToHuman("245")).toBe("245");
  });
});
