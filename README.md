# 🧩 Animated Components for React Native

A collection of visually rich, interactive, self-contained components built using Skia, Reanimated, and Gesture Handler. Designed to work out-of-the-box. Perfect for rapid prototyping or production use.

Created with care by Niche Guys

Follow us on [@NicheGuys](https://x.com/GuysNiche)

---

## ✨ Features

- 🧠 Powered by **Skia**, **Reanimated**, and **Gesture Handler**  
- 📦 Self-contained components — use only what you need  
- 📱 Comes with a **demo app** to preview all components live  

---

## 📦 Components

| Name           | Description                                                   |
|----------------|---------------------------------------------------------------|
| `LiquidSwitch` | A smooth, physics-inspired toggle animation with liquid effect |
| `ScratchCard`  | Customizable scratch surface with masking support              |
| `CircleLoader` | Circular loader animation using radial motion                  |
| `AnimatedNumber`| An animated number display with smooth transitions for both digits and separators|
| `RadialProgress`| A circular progress indicator with animated rim lines and a centered percentage text|
| `Curtain`| Gesture based curtain opening animation|

---

## 🚀 Usage

1. **Copy the Component**  
   Find the component you want in components folder and copy its folder into your project.

2. **Install Dependencies**  
   Make sure you have the required libraries:
   ```bash
   npx expo install react-native-reanimated react-native-gesture-handler @shopify/react-native-skia
   ```

3. **Use It**
   Import and use the component like any other:
   ```tsx
   import CircleLoader from "./components/CircleLoader"

   export default function App() {
     return <CircleLoader />
   }
   ```

---

## 🧪 Try it Live

Clone this repo and run the demo app:

```bash
git clone https://github.com/ogulcanbagatir/rn-animated-components.git
cd rn-animated-components
npx expo install
npx expo start
```

---

## 📄 License

MIT — free to use in personal or commercial projects.
