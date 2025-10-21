# 📄 PageCurl

A realistic page curl transition effect built with **React Native Skia** and **Reanimated**.  
Features a 3D page turning animation with realistic shadows, backside rendering, and gesture control.

## ✨ Features

- Realistic 3D page curl effect with cylinder projection  
- Interactive gesture-based page turning (swipe from top or bottom)  
- Automatic shadow and backside rendering  
- Support for both image-based and view-based content  
- Programmatic control via ref methods  
- Smooth spring animations  
- Direction-aware curl (top/bottom swipe detection)  

## 📦 Usage

This component is **self-contained** and can be used by simply copying the file.

### Steps

1. **Copy and paste** the `PageCurl.tsx` file into your project  
2. **Install required dependencies** if not already installed:

   ```bash
   npx expo install react-native-reanimated @shopify/react-native-skia react-native-gesture-handler
   ```

3. **Use it inside your component**:

   **Using with images:**
   ```tsx
   import { useRef } from "react"
   import PageCurl, { PageCurlHandle } from "./PageCurl/PageCurl"

   export default function PageCurlExample() {
     const ref = useRef<PageCurlHandle>(null)
     
     return (
       <View style={styles.container}>
         <PageCurl
           images={[
             require("./assets/page1.jpg"),
             require("./assets/page2.jpg"),
             require("./assets/page3.jpg"),
           ]}
           gestureEnabled={true}
           ref={ref}
         />
         
         {/* Optional controls */}
         <View style={styles.controls}>
           <Button title="Previous" onPress={() => ref.current?.prev()} />
           <Button title="Next" onPress={() => ref.current?.next()} />
         </View>
       </View>
     )
   }
   ```

   **Using with custom views:**
   ```tsx
   export default function PageCurlExample() {
     const data = [
       { title: "Page 1", color: "#FF6B6B" },
       { title: "Page 2", color: "#4ECDC4" },
       { title: "Page 3", color: "#45B7D1" },
     ]
     
     return (
       <PageCurl
         data={data}
         gestureEnabled={true}
         renderPage={({ item, index }) => (
           <View style={[styles.page, { backgroundColor: item.color }]}>
             <Text style={styles.title}>{item.title}</Text>
           </View>
         )}
       />
     )
   }
   ```

## 🛠 Prerequisites

- React Native Reanimated  
- React Native Skia  
- React Native Gesture Handler  

## ⚠️ Important Notes

**Snapshot-based rendering for custom views:**  
When using `data` + `renderPage`, the component captures a **static snapshot (screenshot)** of each rendered page. This means:

- ✅ **Works well for:** Static content, text, images, styled views  
- ❌ **Not suitable for:** Animated content, videos, interactive elements, real-time updates  
- 📸 The page content is frozen at the moment the snapshot is taken  

## ⚙️ Props

| Prop      | Type       | Required | Default | Description                          |
|-----------|------------|----------|---------|--------------------------------------|
| `images`  | `any[]`    | No*      | -       | Array of image sources (require or URI) |
| `data`    | `any[]`    | No*      | -       | Array of data for custom views       |
| `renderPage` | `function` | No    | -       | Render function for custom views     |
| `gestureEnabled` | `boolean` | No | `false` | Enable swipe gestures for transition |

\* Either `images` or `data` + `renderPage` must be provided

### `renderPage` Function

```tsx
renderPage?: ({ item, index }: { item: any; index: number }) => React.ReactNode
```

## 📖 Ref Methods

The component exposes ref methods for programmatic control:

| Method   | Description                  |
|----------|------------------------------|
| `next()` | Navigate to next page        |
| `prev()` | Navigate to previous page    |

## 🎨 How it Works

The PageCurl effect uses a custom GLSL shader that:
1. Projects the page onto a cylinder surface
2. Calculates hit points for the curl effect
3. Renders backside with grayscale transformation
4. Applies realistic shadows and anti-aliasing
5. Detects swipe direction (top/bottom) for natural curl direction

The shader implements advanced techniques including:
- Cylinder geometry projection
- Ray-surface intersection
- Mirror UV mapping for top/bottom detection
- Distance-based anti-aliasing
- Shadow calculation based on geometry

---

Made with ❤️ by **niche.guys**

Follow us on [Twitter](https://x.com/GuysNiche)

