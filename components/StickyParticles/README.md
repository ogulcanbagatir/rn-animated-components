# ✨ StickyParticles

An advanced metaballs animation component with GPU-accelerated rendering and interactive touch support.  
Features three distinct visual modes and extensive customization options.



## ✨ Features

- **GPU-Accelerated Rendering**: Built with React Native Skia for smooth 60 FPS animations
- **Interactive Touch**: Particles react to touch with smooth spring-based animations
- **Three Animation Modes**:
  - **Standard**: Classic metaballs with smooth blending
  - **Glow**: Soft edges with outer glow effect
  - **Cooked**: Dynamic hue shifting with dramatic edge darkening
- **Highly Customizable**: Control colors, sizes, speeds, particle count, and more
- **Performance Optimized**: CPU-side pre-calculations for expensive operations
- **Fully Self-Contained**: Copy-paste ready with no external dependencies beyond Skia and Reanimated

## 📦 Usage

This component is **self-contained** and can be used by simply copying the file.

### Steps

1. **Copy and paste** the `StickyParticles.tsx` file into your project
2. **Install required dependencies** if not already installed:

   ```bash
   npx expo install react-native-reanimated @shopify/react-native-skia react-native-gesture-handler
   ```

3. **Use it inside your component**:

   ```tsx
   import StickyParticles from "./StickyParticles"
   import { Dimensions, View } from "react-native"
   import { GestureHandlerRootView } from "react-native-gesture-handler"

   const { width, height } = Dimensions.get("window")

   export default function App() {
     return (
       <GestureHandlerRootView style={{ flex: 1 }}>
         <View style={{ flex: 1, backgroundColor: "#000" }}>
           <StickyParticles
             color="#6366F1"
             touchBallColor="#8B5CF6"
             speed={0.3}
             enableTouchInteraction={true}
             touchSmoothness={0.1}
             animationSize={40}
             ballCount={15}
             clumpFactor={1.2}
             touchBallSize={3}
             minParticleRadius={0.5}
             maxParticleRadius={2.0}
             mode="standard"
             width={width}
             height={height}
           />
         </View>
       </GestureHandlerRootView>
     )
   }
   ```

## 🛠 Prerequisites

- React Native Reanimated
- React Native Skia
- React Native Gesture Handler

## ⚙️ Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `color` | `string` | No | `"#ffffff"` | Primary color for particles (hex format) |
| `touchBallColor` | `string` | No | `"#ffffff"` | Color for the interactive touch ball (hex format) |
| `speed` | `number` | No | `0.3` | Animation speed multiplier (higher = faster) |
| `enableTouchInteraction` | `boolean` | No | `true` | Enable/disable touch interaction |
| `touchSmoothness` | `number` | No | `0.05` | Touch smoothing factor (0-1, higher = smoother) |
| `animationSize` | `number` | No | `30` | Scale factor for the animation space |
| `ballCount` | `number` | No | `15` | Number of particles (1-100) |
| `clumpFactor` | `number` | No | `1` | Particle spread multiplier (higher = more spread out) |
| `touchBallSize` | `number` | No | `3` | Size of the interactive touch ball |
| `minParticleRadius` | `number` | No | `0.5` | Minimum radius for particles |
| `maxParticleRadius` | `number` | No | `2.0` | Maximum radius for particles |
| `mode` | `AnimationMode` | No | `"standard"` | Visual mode: "standard", "glow", or "cooked" |
| `width` | `number` | No | `400` | Canvas width |
| `height` | `number` | No | `400` | Canvas height |

## 🎨 Animation Modes

### Standard
Classic metaballs effect with smooth blending between particles. Best for subtle background animations.

**Recommended Settings:**
```tsx
<StickyParticles
  ballCount={70}
  minParticleRadius={0.3}
  maxParticleRadius={1}
  mode="standard"
/>
```

### Glow
Softer edges with an outer glow effect. Creates a dreamy, luminous appearance.

**Recommended Settings:**
```tsx
<StickyParticles
  ballCount={70}
  minParticleRadius={0.3}
  maxParticleRadius={1}
  mode="glow"
/>
```

### Cooked
Dynamic hue shifting with dramatic edge darkening and pulsing threshold. Creates a vibrant, energetic effect with deep shadows at particle edges.

**Recommended Settings:**
```tsx
<StickyParticles
  ballCount={20}
  minParticleRadius={0.5}
  maxParticleRadius={2}
  mode="cooked"
/>
```

**Note:** Cooked mode uses fewer particles for optimal performance while maintaining visual impact.

## 🔧 Performance Tips

1. **Particle Count**: Lower values (10-30) for better performance, higher (50-100) for denser visuals
2. **Cooked Mode**: Uses CPU pre-calculations for hue shifts and pulsing—optimized for performance
3. **Touch Smoothness**: Higher values (0.1-0.2) reduce jitter but increase lag
4. **Animation Size**: Larger values spread particles across more screen space
5. **ClumpFactor**: Values > 1 spread particles, < 1 clusters them together

## 💡 Implementation Details

### Metaballs Algorithm
Uses an implicit field function where each particle contributes to the field based on its distance. When the combined field strength exceeds a threshold, pixels are rendered.

### GPU Rendering
The metaballs calculations are performed entirely on the GPU using SkSL (Skia Shader Language) for maximum performance. The shader handles:
- Distance field calculations for up to 100 particles
- Mode-based visual effects (glow, hue shift, edge darkening)
- Touch ball blending with smooth scale animations

### CPU Optimizations
Expensive operations like hue rotation and pulsing thresholds are pre-calculated on the CPU once per frame, then passed to the GPU as uniforms. This prevents millions of redundant calculations across pixels.

### Touch Interaction
Touch events are handled via `react-native-gesture-handler` with smooth spring animations for the touch ball's appearance and disappearance. The touch position is smoothed over time to prevent jittery movement.

## 📝 Notes

- The component uses `GestureHandlerRootView` internally, but you should wrap your app in it at the root level
- Colors must be in hex format (e.g., `"#FF5733"`)
- Particle positions are deterministic—same seed produces same motion paths
- The touch ball scales in/out smoothly using spring animations
- Canvas renders with anti-aliasing enabled by default

## 🎯 Use Cases

- **Background Animations**: Add visual interest to empty spaces
- **Loading Screens**: Create engaging loading experiences
- **Interactive Demos**: Showcase touch interactions
- **Art Installations**: Create generative art with user interaction
- **Onboarding Flows**: Add dynamic visual elements

---

Made with ❤️ by **niche.guys**

Follow us on [Twitter](https://x.com/GuysNiche)
