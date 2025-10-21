<img width="2365" height="846" alt="banner-nicheguys" src="https://github.com/user-attachments/assets/b384814f-895f-49b9-b273-665c78c0a2f3" style="border-radius: 20px; width: 100%; height: auto;" />

<div align="center">

# Animated Components for React Native

**Premium quality, production-ready animated components built with Skia & Reanimated**

[![GitHub stars](https://img.shields.io/github/stars/ogulcanbagatir/rn-animated-components?style=for-the-badge&logo=github&color=yellow)](https://github.com/ogulcanbagatir/rn-animated-components/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://x.com/GuysNiche)

[![Follow @NicheGuys](https://img.shields.io/twitter/follow/GuysNiche?style=for-the-badge&logo=x&label=Follow%20%40NicheGuys&color=black)](https://x.com/GuysNiche)

</div>


## What is this?

A **carefully curated collection** of visually stunning, interactive, and **self-contained** animation components for React Native and Expo. Each component is:

- **Production-Ready** — Tested, optimized, and ready to ship
- **High Performance** — GPU-accelerated with React Native Skia
- **Fully Customizable** — Extensive props for every use case
- **Cross-Platform** — Works on iOS, Android, and Web

Perfect for developers who want **premium animations** without the hassle of building from scratch.


# Components

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| [`LiquidSwitch`](components/LiquidSwitch/README.md) | Smooth, physics-inspired toggle with liquid morphing effect | Skia · Reanimated |
| [`ScratchCard`](components/ScratchCard/README.md) | Interactive scratch-to-reveal with realistic texture | Skia · Gesture Handler |
| [`CircleLoader`](components/CircleLoader/README.md) | Elegant circular loading animation with orbital motion | Skia · Reanimated |
| [`AnimatedNumber`](components/AnimatedNumber/README.md) | Smooth number transitions with digit-by-digit animation | Reanimated |
| [`RadialProgress`](components/RadialProgress/README.md) | Circular progress indicator with animated rim and percentage | Skia · Reanimated |
| [`Curtain`](components/Curtain/README.md) | Gesture-controlled curtain opening/closing transition | Reanimated · Gesture Handler |
| [`Stepper`](components/Stepper/README.md) | Animated step indicator for multi-step flows | Skia · Reanimated |
| [`StickyParticles`](components/StickyParticles/README.md) | GPU-powered metaballs with touch interaction & 3 visual modes | Skia · Reanimated · Gesture Handler |
| [`PageCurl`](components/PageCurl/README.md) | Realistic page curl effect with gesture control | Skia · Reanimated · Gesture Handler |

> Click any component name to view detailed documentation, props, and usage examples.



# Usage

Each component is self-contained. Just copy and use.

**1. Copy the component** you need from `components/[ComponentName]/`

**2. Install dependencies:**
```bash
npx expo install react-native-reanimated react-native-gesture-handler @shopify/react-native-skia
```

**3. Import and use:**
```tsx
import { LiquidSwitch } from './components/LiquidSwitch'

export default function App() {
  return (
    <LiquidSwitch
      size={100}
      onChange={(value) => console.log('Switched:', value)}
      trackColors={{ true: '#00C853', false: '#CFD8DC' }}
    />
  )
}
```

> See each component's README for detailed props and examples.

---

## Try the Demo App

Want to see all components in action?

```bash
git clone https://github.com/ogulcanbagatir/rn-animated-components.git
cd rn-animated-components
npx expo install
npx expo start
```

**Requirements:** React Native 0.72+ or Expo SDK 49+

---

## Built by NicheGuys

<div align="center">

**We're two passionate developers sharing our craft with the community**

<a href="https://github.com/saimemre1">
  <img src="https://github.com/saimemre1.png" width="80" height="80" style="border-radius: 50%; margin: 10px;" alt="Emre" />
</a>
<a href="https://github.com/ogulcanbagatir">
  <img src="https://github.com/ogulcanbagatir.png" width="80" height="80" style="border-radius: 50%; margin: 10px;" alt="Ogulcan" />
</a>

[@saimemre1](https://github.com/saimemre1) • [@ogulcanbagatir](https://github.com/ogulcanbagatir)

### Follow Our Journey

We regularly share dev tips, animations, and project updates on Twitter!

[![Follow on X](https://img.shields.io/twitter/follow/GuysNiche?style=for-the-badge&logo=x&label=Follow%20%40NicheGuys&color=black)](https://x.com/GuysNiche)

**Got questions? Found a bug? Want to collaborate?**  
Open an [issue](https://github.com/ogulcanbagatir/rn-animated-components/issues) or reach out on [Twitter](https://x.com/GuysNiche)!

</div>

## Show Your Support

If you find this library useful, please:

- **Star this repo** — it helps others discover it
- **Follow [@NicheGuys](https://x.com/GuysNiche)** — stay updated
- **Share with your network** — spread the word

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=ogulcanbagatir/rn-animated-components&type=Date)](https://star-history.com/#ogulcanbagatir/rn-animated-components&Date)

</div>

---


<div align="center">

License: MIT 

Free to use in personal and commercial projects. Attribution appreciated.

**Made with ❤️ by [NicheGuys](https://x.com/GuysNiche)**

</div>
