// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function hoursToAngle(hours, mins) {
  return ((360 / 12) * hours) + ((360 / 12 / 60) * mins);
}

export function minsToAngle(mins) {
  return (360 / 60) * mins;
}

export function secsToAngle(secs) {
  return (360 / 60) * secs;
}