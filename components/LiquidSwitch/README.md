# 💧 LiquidSwitch

A custom animated toggle switch with a liquid-like sliding effect and optional icon support.  
Crafted using **React Native Skia** and **Reanimated**.

https://github.com/user-attachments/assets/b9107e53-426b-4dc1-8c5c-a18d6b292856

## ✨ Features

- Smooth switch animation with a unique liquid effect  
- Optional icons for both ON and OFF states  
- Customizable track and thumb colors  
- Responsive size scaling  
- Fully self-contained, just copy & paste  

## 📦 Usage

This component is **self-contained** and can be used by simply copying the file.

### Steps

1. **Copy and paste** the `LiquidSwitch.tsx` file into your project  
2. **Install required dependencies** if not already installed:

   ```bash
   npx expo install react-native-reanimated @shopify/react-native-skia
   ```

3. **Use it inside your component**:

   ```tsx
   import LiquidSwitch from "./LiquidSwitch"

   export default function App() {
     return (
       <LiquidSwitch
         size={100}
         onChange={(val) => console.log("Switched to", val)}
         trackColors={{
           true: "#00C853",
           false: "#CFD8DC"
         }}
         images={{
           true: {
             source: require("./assets/check.png"),
             width: 24,
             height: 24,
             color: "rgba(255,255,255,0.8)"
           },
           false: {
             source: require("./assets/cross.png"),
             width: 24,
             height: 24,
             color: "rgba(255,255,255,0.8)"
           }
         }}
       />
     )
   }
   ```

## 🛠 Prerequisites

- React Native Reanimated  
- React Native Skia 

## ⚙️ Props

| Prop           | Type     | Required | Default                          | Description                                                              |
|----------------|----------|----------|----------------------------------|--------------------------------------------------------------------------|
| `size`         | number   | No       | `80`                             | Height of the switch (width is auto-scaled)                              |
| `onChange`     | function | Yes      | —                                | Callback when the switch value changes                                   |
| `containerStyle` | ViewStyle | No    | —                                | Custom style for the outer container                                     |
| `gap`          | number   | No       | `4`                              | Inner spacing between track and thumb                                    |
| `trackColors`  | object   | No       | `{ true: "#1690F3", false: "#adb5bd" }` | Background colors for ON/OFF states                            |
| `thumbColor`   | string   | No       | `"white"`                        | Color of the thumb ball                                                  |
| `images`       | object   | No       | —                                | Optional image icons for ON/OFF states                                   |
| `initialValue`  | boolean | No       | `false`                          | Initial value of the switch

### `images.true` and `images.false` structure

| Key     | Type           | Required | Description                                      |
|---------|----------------|----------|--------------------------------------------------|
| `source` | string or number | Yes    | Image asset or URI                               |
| `width`  | number         | Yes      | Width of the image                               |
| `height` | number         | Yes      | Height of the image                              |
| `fit`    | string         | No       | One of `"contain"`, `"cover"`, `"fill"`, etc.    |
| `color`  | string (rgba)  | No       | Tint color applied using Skia ColorMatrix        |

---

Made with ❤️ by **niche.guys**

Follow us on [Twitter](https://x.com/GuysNiche)

