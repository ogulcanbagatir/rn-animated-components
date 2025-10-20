# 📊 Stepper

A custom animated step progress indicator with smooth transitions and checkmark animations.  
Crafted using **React Native Skia** and **Reanimated**.

## ✨ Features

- Smooth animated progress between steps  
- Automatic checkmark animation on completed steps  
- Customizable colors with gradient support  
- Adjustable blur effect for glowing active steps  
- Responsive sizing and spacing  
- Fully self-contained, just copy & paste  

## 📦 Usage

This component is **self-contained** and can be used by simply copying the file.

### Steps

1. **Copy and paste** the `Stepper.tsx` file into your project  
2. **Install required dependencies** if not already installed:

   ```bash
   npx expo install react-native-reanimated @shopify/react-native-skia
   ```

3. **Use it inside your component**:

   ```tsx
   import Stepper from "./Stepper"

   export default function App() {
     const [currentStep, setCurrentStep] = useState(0)

     return (
       <Stepper
         stepCount={4}
         currentStep={currentStep}
         width={350}
         outlineColor="#E0E0E0"
         activeColors={["#FF6B6B", "#4ECDC4"]}
         blur={4}
         radius={16}
         iconSize={16}
         iconColor="#FFFFFF"
         textColor="#FFFFFF"
       />
     )
   }
   ```

## 🛠 Prerequisites

- React Native Reanimated  
- React Native Skia 

## ⚙️ Props

| Prop           | Type              | Required | Default     | Description                                                              |
|----------------|-------------------|----------|-------------|--------------------------------------------------------------------------|
| `stepCount`    | number            | Yes      | —           | Total number of steps in the progress indicator                          |
| `width`        | number            | Yes      | —           | Width of the stepper component                                           |
| `currentStep`  | number            | No       | `0`         | Current active step (0-indexed)                                          |
| `outlineColor` | string            | No       | —           | Color of the inactive step outline                                       |
| `activeColors` | string or string[] | No      | —           | Color(s) for active steps. Single color or array for gradient            |
| `blur`         | number            | No       | `4`         | Blur effect intensity for active steps (creates glow effect)             |
| `radius`       | number            | No       | `16`        | Radius of step circles                                                   |
| `iconSize`     | number            | No       | `16`        | Size of the checkmark icon in completed steps                            |
| `iconColor`    | string            | No       | —           | Color of the checkmark icon                                              |
| `textColor`    | string            | No       | —           | Color of the step numbers                                                |
| `customFont`   | FontStyle         | No       | —           | Custom font configuration for step numbers                               |
| `duration`     | number            | No       | `1000`      | Animation duration in milliseconds                                       |

### `customFont` structure

| Key          | Type                          | Required | Default                | Description                                      |
|--------------|-------------------------------|----------|------------------------|--------------------------------------------------|
| `fontFamily` | string or number              | No       | System default         | Font family name (string) or require() path (number) |
| `fontSize`   | number                        | No       | `16`                   | Font size                                        |
| `fontWeight` | string                        | No       | `"bold"`               | Font weight ("normal", "bold", "100"-"900")      |
| `fontStyle`  | "normal" or "italic"          | No       | `"normal"`             | Font style                                       |

## 💡 Examples

### Basic Stepper
```tsx
<Stepper
  stepCount={3}
  currentStep={1}
  width={300}
  outlineColor="#CCCCCC"
  activeColors="#4CAF50"
/>
```

### Stepper with Gradient
```tsx
<Stepper
  stepCount={5}
  currentStep={2}
  width={400}
  outlineColor="#E0E0E0"
  activeColors={["#FF6B6B", "#FFD93D", "#4ECDC4"]}
  blur={6}
  radius={20}
  iconSize={14}
  iconColor="#FFFFFF"
  textColor="#333333"
/>
```

### Minimal Stepper
```tsx
<Stepper
  stepCount={4}
  currentStep={0}
  width={280}
  outlineColor="#999999"
  activeColors="#2196F3"
  blur={2}
  radius={12}
  iconSize={8}
/>
```

### Stepper with Custom Font (System Font)
```tsx
<Stepper
  stepCount={4}
  currentStep={1}
  width={350}
  outlineColor="#E0E0E0"
  activeColors="#9C27B0"
  customFont={{
    fontFamily: "Arial",  // System font name
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal"
  }}
  duration={800}
/>
```

### Stepper with Custom Font File
```tsx
<Stepper
  stepCount={4}
  currentStep={1}
  width={350}
  outlineColor="#E0E0E0"
  activeColors="#9C27B0"
  customFont={{
    fontFamily: require("./assets/fonts/CustomFont.ttf"),  // Font file
    fontSize: 18
  }}
  duration={800}
/>
```

### Fast Animation Stepper
```tsx
<Stepper
  stepCount={6}
  currentStep={3}
  width={400}
  outlineColor="#BDBDBD"
  activeColors={["#E91E63", "#9C27B0"]}
  duration={500}
  blur={3}
/>
```

## 🎨 Customization Tips

- **Gradient Effect**: Pass an array of colors to `activeColors` for a gradient progression
- **Glow Effect**: Increase `blur` value for a more prominent glow on active steps
- **Size Adjustment**: Modify `radius` and `iconSize` proportionally for different sizes
- **Animation Speed**: Customize animation speed with the `duration` prop (in milliseconds)
- **Custom Typography**: Use `customFont` to match your app's design system
- **Font Weight Options**: Supports both string values ("normal", "bold") and numeric values ("100"-"900")

## 📝 Notes

- Steps are **0-indexed**, so the first step is `0`
- When a step is completed, the number fades out and a checkmark fades in
- The progress bar smoothly animates between steps
- Width calculation automatically accounts for step circles and spacing

---

Made with ❤️ by **niche.guys**

