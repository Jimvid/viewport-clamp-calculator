export const stringToNumber = (str: string) => {
  const number = str.split("px")[0];
  return Number(number);
};

export const calculateClamp = (sizes: ISize, screen: IScreenSize) => {
  const { maxSize, minSize } = sizes;
  const { maxScreenSize, minScreenSize } = screen;

  // Convert pixels to rems
  const maxSizeToRem = maxSize / 16;
  const minSizeToRem = minSize / 16;
  const maxScreenSizeToRem = maxScreenSize / 16;
  const minScreenSizeToRem = minScreenSize / 16;

  const sizeDiff = maxSizeToRem - minSizeToRem;
  const screenDiff = maxScreenSizeToRem - minScreenSizeToRem;

  let slope = sizeDiff / screenDiff;
  let intersection = (~minScreenSizeToRem * slope + minSizeToRem).toFixed(4);
  let preferedValue = `${intersection}rem + ${(slope * 100).toFixed(2)}vw`;

  // Check if any calculation results in NaN
  const arr = [minSizeToRem, maxSizeToRem, intersection, preferedValue, slope];
  const hasNaN = arr.some((f) => f === NaN || f.toString().includes("NaN"));

  // If NaN was found, return
  if (hasNaN) return;

  return `clamp(${minSizeToRem}rem, calc(${preferedValue}), ${maxSizeToRem}rem)`;
};

// Types
export interface ISize {
  maxSize: number;
  minSize: number;
}

export interface IScreenSize {
  maxScreenSize: number;
  minScreenSize: number;
}
