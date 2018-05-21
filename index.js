// also a good reference https://www.scantips.com/lights/fstop2.html

const subSecondStops = [10, 13, 15, 20, 25, 30, 40, 50, 60, 80, 100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000];

const findClosest = (arr, search) => {
  return arr.reduce((prev, curr) => (Math.abs(curr - search) < Math.abs(prev - search) ? curr : prev));
};

const apertureSpeedToHuman = apertureSpeed => {
  // above 1s
  if (apertureSpeed >= 1) {
    return `${apertureSpeed}`;
  }

  // no remainder, is an integer
  if ((1 / apertureSpeed) % 1 === 0) {
    return `1/${1 / apertureSpeed}`;
  }

  // exact match in our table? use it
  const rounded = Math.round(1 / apertureSpeed);
  if (subSecondStops.includes(rounded)) {
    return `1/${rounded}`;
  }

  // otherwise attempt for the closest
  const closest = findClosest(subSecondStops, 1 / apertureSpeed);
  if (closest) {
    return `1/${closest}`;
  }

  throw "Error: No match - this should not happen";
};

module.exports = {
  apertureSpeedToHuman
};
