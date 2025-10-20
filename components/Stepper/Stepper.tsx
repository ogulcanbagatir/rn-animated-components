import { BlurMask, Canvas, Group, LinearGradient, matchFont, Path, Skia, SkFont, SkPath, Text, vec, useFont } from "@shopify/react-native-skia";
import { useEffect, useMemo } from "react";
import { Platform } from "react-native";
import { Easing, interpolate, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

interface FontStyle {
  fontFamily?: string | number; 
  fontSize?: number;
  fontStyle?: "normal" | "italic";
  fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
}

interface Props {
  stepCount: number,
  width: number,
  currentStep?: number,
  outlineColor?: string,
  activeColors?: string | string [],
  blur?: number,
  radius?: number,
  iconSize?: number,
  iconColor?: string,
  textColor?: string,
  customFont?: FontStyle,
  duration?: number
}

interface ItemProps {
  stepWidth: number,
  radius: number, 
  textWidth: number, 
  index: number, 
  iconSize: number, 
  textHeight: number,
  currentStep: number,
  iconColor?: string,
  blur: number,
  textColor?: string,
  font: SkFont,
  centerY: number
}

const strokeWidth = 3

const addCircleFromLeft = (p: SkPath, cx: number, cy: number, r: number) => {
  const rect = Skia.XYWHRect(cx - r, cy - r, r * 2, r * 2)
  p.addArc(rect, 180, -359.999)
  p.close()
}

export const makeCheckInBox = (size: number, strokeWidth?: number) => {
  const p = Skia.Path.Make()
  const sw = Math.max(1, strokeWidth ?? Math.round(size * 0.14))
  const inset = sw / 2
  const s = Math.max(0, size - sw)

  const x1 = inset + 0.15 * s
  const y1 = inset + 0.52 * s
  const x2 = inset + 0.42 * s
  const y2 = inset + 0.78 * s
  const x3 = inset + 0.86 * s
  const y3 = inset + 0.24 * s

  p.moveTo(x1, y1)
  p.lineTo(x2, y2)
  p.lineTo(x3, y3)
  return p
}

const defaultFont = matchFont({
  fontFamily: Platform.select({ ios: "Helvetica", android: "sans-serif", default: "serif" }),
  fontSize: 16,
  fontWeight: "bold",
})

function Item({ stepWidth, radius, textWidth, index, iconSize, textHeight, iconColor, blur, textColor, font, centerY, currentStep}: ItemProps){
  const checkPath = useMemo(()=> makeCheckInBox(iconSize, strokeWidth), [iconSize, blur])

  const checkAnim = useDerivedValue(()=> {
    return withTiming(index >= currentStep ? 0 : 1, {duration: 500})
  },[currentStep, index])

  const textOpacity = useDerivedValue(()=> {
    return withTiming(index >= currentStep ? 1 : 0, {duration: 500})
  },[currentStep, index])

  return (
    <Group transform={[{translateX: ((stepWidth + (radius * 2)) * index )}]}>
      <Text 
        text={`${index + 1}`} 
        font={font} 
        x={strokeWidth + blur + radius - textWidth / 2 } 
        y={textHeight / 2 + centerY - strokeWidth / 2} 
        color={textColor}
        opacity={textOpacity}
      />
      <Path
        path={checkPath}
        end={checkAnim}
        style={"stroke"}
        strokeWidth={strokeWidth}
        strokeJoin={"round"}
        strokeCap={"round"}
        transform={[{translateX: radius - iconSize / 2 + strokeWidth + blur}, {translateY: centerY - iconSize / 2}]}
        color={iconColor}
      />
    </Group>
  )
}

export default function Stepper({ 
  stepCount, 
  width,
  currentStep = 0, 
  outlineColor, 
  blur = 4, 
  activeColors, 
  radius = 16, 
  iconSize = 16,
  iconColor,
  textColor,
  customFont,
  duration = 1000
}: Props){
  const stepWidth = (width - (radius * 2 * stepCount)) / (stepCount - 1) 
  const circumference = radius * 2 * Math.PI
  const progress = useSharedValue(0)
  
  const height = (radius * 2) + (strokeWidth * 2) + (blur * 2)
  
  const centerY = height / 2

  const customFontSource = typeof customFont?.fontFamily === 'number' ? customFont.fontFamily : null;
  const loadedCustomFont = useFont(customFontSource, customFont?.fontSize || 16);

  const font = useMemo(() => {
    if (customFont) {
      if (typeof customFont.fontFamily === 'number' && loadedCustomFont) {
        return loadedCustomFont;
      }
      if (typeof customFont.fontFamily === 'string') {
        return matchFont({
          fontFamily: customFont.fontFamily,
          fontSize: customFont.fontSize || 16,
          fontWeight: customFont.fontWeight || "bold",
          fontStyle: customFont.fontStyle || "normal"
        });
      }
      return matchFont({
        fontFamily: Platform.select({ ios: "Helvetica", android: "sans-serif", default: "serif" }),
        fontSize: customFont.fontSize || 16,
        fontWeight: customFont.fontWeight || "bold",
        fontStyle: customFont.fontStyle || "normal"
      });
    }
    return defaultFont;
  }, [customFont, loadedCustomFont]);
  
  useEffect(()=> {
    progress.value = withTiming(currentStep, { duration, easing: Easing.linear })
  },[currentStep, duration])

  const { outlinePath, animatedPath } = useMemo(() => {
    const p = Skia.Path.Make()
  
    addCircleFromLeft(p, radius + strokeWidth + blur, centerY, radius)
  
    for (let i = 0; i < stepCount - 1; i++) {
      const currentX = radius + i * (stepWidth + radius * 2)
      const nextX = currentX + stepWidth + radius 
  
      p.moveTo(currentX + radius + strokeWidth + blur, centerY)
      p.lineTo(nextX + strokeWidth + blur, centerY)
  
      addCircleFromLeft(p, nextX + radius + strokeWidth + blur, centerY, radius)
    }
  
    return { outlinePath: p, animatedPath: p.copy() }
  }, [stepCount, stepWidth, radius, centerY])
  
  const pathLength = useMemo(()=> {
    return stepWidth * (stepCount - 1) + circumference * stepCount
  },[animatedPath])

  const {outputRange, inputRange} = useMemo(()=> {
    let arr = []
    const eachStep = (circumference / pathLength) + (stepWidth / pathLength)
    for(let i = 0; i < stepCount; i++){
      arr.push((circumference / pathLength) + eachStep * i)
    }
    arr[arr.length - 1] = 1
    return {outputRange: arr, inputRange: Array.from({length: stepCount}, (_, i) => i)}
  },[stepCount])

  const strokeEnd = useDerivedValue(()=> {
    return interpolate(progress.value, inputRange, outputRange)
  },[outputRange, stepCount])
  

  return (
    <Canvas style={{width: width + (strokeWidth * 2) + blur * 2, height}}>
      <Path
        path={outlinePath}
        style="stroke"
        color={outlineColor}
        strokeWidth={strokeWidth}
      />
      <Path
        path={animatedPath}
        style="stroke"
        end={strokeEnd}
        strokeWidth={strokeWidth}
        color={typeof activeColors === "string" ? activeColors : undefined}
      >
        {
          Array.isArray(activeColors) &&      
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, 0)}
            colors={activeColors}
          />
        }
        {
          blur &&
          <BlurMask style="solid" blur={blur}/>
        }
      </Path>
      {
        new Array(stepCount).fill(0).map((_, i) => {
          const { height: textHeight } = font?.measureText(`${i + 1}`)
          const width = font?.getGlyphWidths(font.getGlyphIDs(`${i + 1}`))[0]

          return (
            <Item
              key={i}
              stepWidth={stepWidth}
              radius={radius}
              textWidth={width} 
              index={i}
              iconSize={iconSize} 
              textHeight={textHeight}
              currentStep={currentStep}
              iconColor={iconColor}
              blur={blur}
              textColor={textColor}
              font={font}
              centerY={centerY}
            />
          )
        })
      }
    </Canvas>
  )
}