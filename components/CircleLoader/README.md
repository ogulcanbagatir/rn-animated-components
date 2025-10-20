# 🔵 CircleLoader

A circular animated loader built with **React Native Skia** and **Reanimated**.  
Balls move back and forth on a perfect circular path with smooth color transitions.

https://github.com/user-attachments/assets/b64d394b-ce53-4115-8e5f-e10b5b21d019

## ✨ Features

- Smooth circular motion with easing  
- Customizable radius, ball size, and colors  
- Built with performance in mind using
- Fully self-contained and copy-paste ready  

## 📦 Usage

This component is **self-contained** and can be used by simply copying the file.

### Steps

1. **Copy and paste** the `CircleLoader.tsx` file into your project  
2. **Install required dependencies** if not already installed:

   ```bash
   npx expo install react-native-reanimated @shopify/react-native-skia
   ```

3. **Use it inside your component**:

   ```tsx
   export default function CircleLoaderExample() {
     const [play, setPlay] = useState(false)
   
     return (
       <View style={styles.container}>
         <Pressable onPress={()=> setPlay(p => !p)} style={{marginBottom: 32}}>
           <Text style={styles.playText}>
             {play ? "Reset" : "Play"}
           </Text>
         </Pressable>
         <CircleLoader
           radius={80}
           circleR={4}
           colors={["#EF5A57", "#F5AF00", "#4BAA4E","#EF5A57", "#F5AF00", "#4BAA4E"]}
           isPlaying={play}
         />
       </View>
     )
   }
   ```

## 🛠 Prerequisites

- React Native Reanimated  
- React Native Skia

## ⚙️ Props

| Prop      | Type       | Required | Default                                     | Description                          |
|-----------|------------|----------|---------------------------------------------|--------------------------------------|
| `radius`  | `number`   | No       | `120`                                       | Radius of the outer circle           |
| `circleR` | `number`   | No       | `10`                                        | Radius of each individual circle     |
| `colors`  | `string[]` | No       | `["#EF5A57", "#F5AF00", "#4BAA4E"]`         | Color array used for animation       |
| `isPlaying`| `boolean` | Yes      | `false`                                     | Boolean to control animation state   |

---

Made with ❤️ by **niche.guys**

Follow us on [Twitter](https://x.com/GuysNiche)

