# 🌀 RadialProgress

A customizable animated radial progress indicator built with React Native Skia and Reanimated.
Ideal for showing percentage based progress with smooth scaling and opacity animations.

https://github.com/user-attachments/assets/af5b2883-38d7-4521-854a-9a021e7559e7

## Features

- Circular progress with animated scale and opacity effects
- Fully customizable size colors and animation behavior
- Dynamic text percentage display in the center
- Smooth animations powered by Reanimated and Skia
- Fully self-contained, just copy & paste  

## 📦 Usage

This component is **self-contained** and can be used by simply copying the file.

### Steps

1. **Copy and paste** the `RadialProgress.tsx` file into your project  
2. **Install required dependencies** if not already installed:

  ```bash
   npx expo install react-native-reanimated @shopify/react-native-skia
  ```

3. **Use it inside your component**:

  ```tsx
  export default function RadialProgressExample() {
    const progress = useSharedValue(0.3); // thirty percent

    React.useEffect(() => {
      progress.value = withTiming(0.8, { duration: 1500 });
    }, []);

    return (
      <RadialProgress
        size={200}
        progress={progress}
        font={require("../assets/fonts/font.ttf")}
        fontSize={28}
        innerColor="#111111"
        lineColor="#00C853"
        lineThickness={3}
        lineCount={90}
        lineHeight={30}
        animationConfig={{
          scale: 1.4,
          opacity: 0.6
        }}
        containerStyle={{
          alignSelf: "center",
          marginTop: 40
        }}
      />
    );
  }
  ```

## 🛠 Prerequisites

- React Native Reanimated  
- React Native Skia 

## ⚙️ Props

| Prop           | Type     | Required | Default                          | Description                                                              |
|----------------|----------|----------|----------------------------------|--------------------------------------------------------------------------|
| `size`         | number   | No       | `200`                            | Radius of the circle                                                     |
| `containerStyle`| ViewStyle | No     | —                                | Custom style for the outer Canvas container                              |
| `progress`     | SharedValue<number> | Yes    | —                       | Progress value in the range from zero to one to control the animation                              |
| `font`         | number   | No       | -                                | Skia font for percentage text                                   |
| `fontSize`     | number   | No       | -                                | Fontsize for percentage text                               |
| `innerColor`   | string   | No       | `"#111111"`                      | Inner circle color                                                 |
| `lineColor`    | string   | No       | `"white"`                        | Color of lines. Also applied to the percentage text|
| `lineThickness`| string   | No       | `2`                              | Thickness of the lines|
| `lineCount`| number   | No       | `90`                                 | Number of lines to be used|
| `lineHeight`| number   | No       | `30`                                | Height of the lines|
| `animationConfig`| {scale: number, opacity: number}   | No       | `{scale: 1.3, opacity: 0.4}`   | Min opacity factor for inactive lines and max scale factor for active lines|

## Notes

- The component expects progress between zero and one
- The text uses the provided Skia font for precise centering
- The Canvas size accounts for the scale factor and line heights so lines never clip

Made with ❤️ by **niche.guys**

Follow us on [Twitter](https://x.com/GuysNiche)

