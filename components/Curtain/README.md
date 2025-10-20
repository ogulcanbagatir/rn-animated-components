# 🎭 Curtain

A curtain like animation with **React Native Skia** and **Reanimated**.  
A gesture based curtain animation which reveals the content behind. You can also pass your own SharedValue from outside to control the curtain’s motion.

https://github.com/user-attachments/assets/84bc8387-0083-4fbd-bed7-fc1a2df9a536

## ✨ Features

- Interactive gesture-controlled curtain motion with bezier curve transitions
- Controllable through a shared value  
- Fully customizable dimensions, colors, and gesture range  
- Self-contained, copy–paste ready component   

## 📦 Usage

This component is **self-contained** and can be used by simply copying the file.

### Steps

1. **Copy and paste** the `Curtain.tsx` file into your project  
2. **Install required dependencies** if not already installed:

   ```bash
   npx expo install react-native-reanimated @shopify/react-native-skia react-native-gesture-handler
   ```

3. **Use it inside your component**:

   ```tsx
    export default function CurtainExample() {
      const animValue = useSharedValue(0)
      return (
        <View style={styles.container}>
          <Image
            source={require("../assets/images/nicheguys-logo.png")}
            style={{width: 300, height: 1000}}
            resizeMode="contain"
          />
          <Curtain
            progress={animValue}
            containerStyle={{position: "absolute"}}
          />
        </View>
      )
    }
   ```

## 🛠 Prerequisites

- React Native Reanimated  
- React Native Skia
- React Native Gesture Handler

## ⚙️ Props

| Prop      | Type       | Required | Default                                     | Description                          |
|-----------|------------|----------|---------------------------------------------|--------------------------------------|
| `progress`   | `SharedValue<number>`   | Yes       | -                    | Shared value used to animate curtains, changes between 0-1 |
| `width`   | `number`   | No       | `screen_width`                              | Container width                      |
| `height`  | `number`   | No       | `screen_height`                             | Container height                     |
| `minY`    | `number`   | No       | `80`                                        | y value to start animation           |
| `maxY`    | `number`   | No       | `screen_height - 60`                        | y value to end animation             |
| `colors`  | `array`    | No       | `["##FFE8AD", "##EF5A57"]`                  | left and right curtain color         |
| `onAnimationEnd`  | `function`    | No       | -                 | Callback for animation        |
| `containerStyle`  | `ViewStyle`    | No       | -                 | Container style        |

---

Made with ❤️ by **niche.guys**

Follow us on [Twitter](https://x.com/GuysNiche)

