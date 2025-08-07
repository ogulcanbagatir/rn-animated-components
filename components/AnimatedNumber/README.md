# 🔢 AnimatedNumber

An animated number display with smooth transitions for both digits and separators.  
Built using React Native Reanimated layout animations.

## ✨ Features

- Smoothly animates number updates with layout transitions
- Animated comma or dot separators between every 3 digits
- Supports two animation strategies: "translate" and "swap"
- Supports customizable animation configs: "timing" and "spring"

## 📦 Usage

This component is self-contained and can be used by simply copying the file.

### Steps

1. Copy and paste the AnimatedNumber.tsx file into your project
2. Install required dependency if not already installed:

    npx expo install react-native-reanimated

3. Use it inside your component:

    import AnimatedNumber from "./AnimatedNumber"
    import { TextInput, View } from "react-native"
    import { useRef, useState } from "react"

    export default function AnimatedNumberExample() {
      const [number, setNumber] = useState("")
      const inputRef = useRef(null)

      return (
        <View style={styles.container}>
          <AnimatedNumber
            number={number}
            textStyle={styles.text}
            containerStyle={{ width: "100%", justifyContent: "center" }}
            separatorAnimation="swap"
            separator="comma"
            animationConfig={{
              type: "spring",
              damping: 20,
              stiffness: 120
            }}
          />
          <TextInput
            ref={inputRef}
            autoFocus
            style={{ width: "100%", height: 0, backgroundColor: "transparent", position: "absolute", bottom: 0 }}
            onChangeText={setNumber}
            keyboardType="numeric"
          />
        </View>
      )
    }

## 🛠 Prerequisites

- React Native Reanimated

## ⚙️ Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| number | string | Yes | — | The numeric string to display |
| separator | "comma" \| "dot" | No | "comma" | Separator type |
| separatorAnimation | "swap" \| "translate" | No | "swap" | Animation behavior for separators |
| textStyle | TextStyle | No | — | Custom style for each character digits and separators |
| containerStyle | ViewStyle | No | — | Custom style for outer wrapper |
| animationConfig | AnimationConfigs | No | { type: "timing", duration: 300 } | Config for animation |
| prefix | string | No | - |  Static text added before the number. |
| suffix | string | No | - |  Static text added after the number. |

---

## ⚙️ animationConfig

animationConfig can be one of two types. The `type` field determines which fields are applicable.

### TimingOptions

| Field | Type | Required | Default | Note |
|-------|------|----------|---------|------|
| type | "timing" | yes | — | When this type is selected, the fields below are used |
| duration | number | no | 300 | Duration in ms |
| easing | EasingFunction | no | Easing.out(Easing.cubic) | Easing function |

### SpringOptions

| Field | Type | Required | Default | Note |
|-------|------|----------|---------|------|
| type | "spring" | yes | — | When this type is selected, the fields below are used |
| damping | number | no | 20 | Higher value reduces bounce |
| mass | number | no | 1 | Larger mass slows down the animation |
| stiffness | number | no | 100 | Higher value makes the animation faster |
| overshootClamp | boolean | no | false | If true, prevents overshooting the target |

Note: For `"timing"` type, duration is exact. For `"spring"` type, duration is physics-based.  
If you need exact sync with other animations, use `"timing"` or calculate an approximate spring duration.

### Examples

    // timing
    animationConfig={{
      type: "timing",
      duration: 400,
      easing: Easing.out(Easing.exp)
    }}

    // spring
    animationConfig={{
      type: "spring",
      damping: 20,
      stiffness: 120,
      overshootClamp: false
    }}

---

Made with ❤️ by niche.guys  
Let the numbers flow beautifully.
