# 🎉 ScratchCard

A scratchable canvas component that reveals hidden content using gesture-based interaction.  
Built with **Skia**, **Reanimated**, and **Gesture Handler**.

https://github.com/user-attachments/assets/9f66bebf-e76c-4c78-a37d-d4a398c82a44

## ✨ Features

- Scratch-off effect using pan gesture  
- Customizable overlay and behind content  
- Supports dynamic layout size  
- Self-contained and copy-paste friendly  

## 📦 Usage

This component is **self-contained** and can be used by simply copying the file.

### Steps

1. **Copy and paste** the `ScratchCard.tsx` file into your project  
2. **Install required dependencies** if not already installed:

   ```bash
   npx expo install react-native-reanimated react-native-gesture-handler @shopify/react-native-skia
   ```

3. **Use it inside your component**:

   ```tsx
   import ScratchCard from "./ScratchCard"

   export default function App() {
     return (
       <ScratchCard containerStyle={{ width: 300, height: 300 }}>
         <ScratchCard.Behind>
           {/* Content shown after scratching */}
           <Image source={require("./gift.png")} style={{ width: 300, height: 300 }} />
         </ScratchCard.Behind>
         <ScratchCard.Overlay>
           {/* Scratchable surface */}
           <Rect
             x={0}
             y={0}
             width={300}
             height={300}
             color="#ccc"
           />
         </ScratchCard.Overlay>
       </ScratchCard>
     )
   }
   ```

## 🛠 Prerequisites

- React Native Reanimated  
- React Native Gesture Handler  
- React Native Skia

## ⚙️ Props

### `ScratchCard` Props

| Prop            | Type            | Required | Default                  | Description                                 |
|-----------------|-----------------|----------|--------------------------|---------------------------------------------|
| `children`      | ReactNode       | ✅       | —                        | Must include `ScratchCard.Behind` and `ScratchCard.Overlay` |
| `containerStyle`| ViewStyle       | ❌       | `full screen dimensions` | Optional custom container styling           |

### `ScratchCard.Overlay`

Defines the top layer that the user scratches off. Can be any Skia element or function receiving layout size.

| Prop      | Type                                   | Required | Description                          |
|-----------|----------------------------------------|----------|--------------------------------------|
| `children`| ReactNode or `(layout) => ReactNode`   | ✅       | Render content over the scratch area|

### `ScratchCard.Behind`

Defines the hidden content revealed during scratching. Can be any RN element.

| Prop      | Type          | Required | Description                           |
|-----------|---------------|----------|---------------------------------------|
| `children`| ReactNode     | ✅       | Visible only after scratching begins  |

---

Made with ❤️ by **niche.guys**

Follow us on [Twitter](https://x.com/GuysNiche)

