

const colors = {
  blue1: "#1690F3", //#1690F3
  blue2: "#C5E2FC", //#C5E2FC
  
  green1: "#4BAA4E", //#4BAA4E
  green2: "#D4EDD4", //#D4EDD4

  red1: "#EF5A57", //#EF5A57
  red2: "#FAC8C7", //#FAC8C7

  orange1: "#F5AF00", //#F5AF00
  orange2: "#FFE8AD", //#FFE8AD,

  dark1: "#111111", //#111111
  dark2: "#2d3439", //#2d3439
  dark3: "#5d666f", //#5d666f
  dark4: "#adb5bd", //#adb5bd
  dark5: "#dee2e6", //#dee2e6
  dark6: "#F3F5F6", //#F3F5F6,
  
  white: "#FFFFFF",
  p1: "#FFE8AD",
  p2: "#FDF9E5"
}

export type ColorTheme = typeof colors;
export type ColorNames = keyof typeof colors | (string & {})

export default colors;

export function hexToRgba(hex: ColorNames, opacity: number): string {
  // If hex is a key of colors, resolve it
  const hexValue = (hex in colors) ? colors[hex as keyof typeof colors] : hex;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
  return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})` : '';
}
