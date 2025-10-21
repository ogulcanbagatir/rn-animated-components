import StickyParticles, { AnimationMode } from "@/components/StickyParticles/StickyParticles";
import colors from "@/theme/colors";
import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function StickyParticlesExample() {
  const [mode, setMode] = useState<AnimationMode>("standard");

  // Mode-specific parameters for optimization
  // Keep radius constant to prevent re-calculation glitches
  const particleConfig = {
    standard: { count: 70 },
    glow: { count: 70 },
    cooked: { count: 70 },
  };

  const config = particleConfig[mode];
  
  // Constant radius range for all modes (prevents glitching)
  const minRadius = 0.3;
  const maxRadius = 0.8;

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <StickyParticles
          color={colors.p1}
          touchBallColor={colors.p1}
          speed={0.3}
          enableTouchInteraction={true}
          touchSmoothness={1.0}
          animationSize={40}
          ballCount={config.count}
          minParticleRadius={minRadius}
          maxParticleRadius={maxRadius}
          clumpFactor={1.3}
          touchBallSize={3}
          mode={mode}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
        />
        
        {/* Mode selector buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, mode === "standard" && styles.buttonActive]}
            onPress={() => setMode("standard")}
          >
            <Text style={[styles.buttonText, mode === "standard" && styles.buttonTextActive]}>
              Standard
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, mode === "glow" && styles.buttonActive]}
            onPress={() => setMode("glow")}
          >
            <Text style={[styles.buttonText, mode === "glow" && styles.buttonTextActive]}>
              Glow
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, mode === "cooked" && styles.buttonActive]}
            onPress={() => setMode("cooked")}
          >
            <Text style={[styles.buttonText, mode === "cooked" && styles.buttonTextActive]}>
              Cooked
            </Text>
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark1,
    paddingHorizontal: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.p2,
    backgroundColor: "transparent",
  },
  buttonActive: {
    backgroundColor: colors.p2,
  },
  buttonText: {
    fontFamily: "SpaceMono-Regular",
    fontSize: 14,
    color: colors.p2,
  },
  buttonTextActive: {
    color: colors.dark1,
  },
});
