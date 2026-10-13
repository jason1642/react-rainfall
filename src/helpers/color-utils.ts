export const toRgbChannels = (color: string): string => {
  const hex = color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h =
      hex[1].length === 3 ? [...hex[1]].map((c) => c + c).join("") : hex[1];
    return [0, 2, 4].map((o) => parseInt(h.slice(o, o + 2), 16)).join(", ");
  }
  const nums = color.match(/[\d.]+/g);
  return nums && nums.length >= 3
    ? nums.slice(0, 3).join(", ")
    : "255, 255, 255";
};
