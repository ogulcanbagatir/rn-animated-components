import colors from "@/theme/colors";
import { memo } from "react";
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { clamp, interpolate, runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
const { width } = Dimensions.get("screen")

interface Props {
  onChange?: (val: number)=> void,
  range?: number[],
  containerStyle?: ViewStyle
}

const minTranslateX = 0
const maxTranslateX = (width * 0.8) + 10

const mapRange = (value: number, inputRange: Array<number>, outputRange: Array<number>, clamp?: boolean) => {
  "worklet"
  if(clamp){
    if(value < inputRange[0]){
      return outputRange[0]
    }else if(value > inputRange[1]){
      return outputRange[1]
    }
  }

  const res = outputRange[0] + ((value - inputRange[0]) * (outputRange[1] - outputRange[0])) / (inputRange[1] - inputRange[0])

  return res
}


function Slider({onChange, range, containerStyle}: Props){
  const sv = useSharedValue(0)

  const onGesture = Gesture.Pan()
  .onBegin((e)=> {
    sv.value = clamp(e.x, minTranslateX, maxTranslateX)
    onChange && runOnJS(onChange)(mapRange(sv.value, [minTranslateX, maxTranslateX], range || [0, 1]))
  })
  .onUpdate((e)=> {
    sv.value = clamp(e.x, minTranslateX, maxTranslateX)
    onChange && runOnJS(onChange)(mapRange(sv.value, [minTranslateX, maxTranslateX], range || [0, 1]))
  })

  const animStyle = useAnimatedStyle(()=> {
    const w = interpolate(sv.value, [minTranslateX, maxTranslateX], [0, 100])
    return {
      width: `${w}%`
    }
  },[])

  return (
    <GestureDetector gesture={onGesture}>
      <Animated.View style={[styles.container, containerStyle]}>
        <View style={styles.line}>
          <View style={{flexDirection: "row", alignItems: "center", height: "100%"}}>
            <Animated.View style={[styles.innerLine, animStyle]}/>
            <View style={styles.thumb}/>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50
  },
  line: {
    width: width * 0.8,
    height: 10,
    borderRadius: 30,
    backgroundColor: colors.p2
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.orange1,
    marginLeft: - 10,
    shadowColor: colors.dark1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  innerLine: {
    height: "100%",
    backgroundColor: colors.orange1,
    borderTopLeftRadius: 1000,
    borderBottomLeftRadius: 1000
  }
})

export default memo(Slider)