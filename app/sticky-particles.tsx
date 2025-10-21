import StickyParticles from "@/components/StickyParticles/StickyParticles";
import colors from "@/theme/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function StickyParticlesExample() {
  return (
    <View style={styles.container}>
      <StickyParticles />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark1,
    paddingTop: 64,
    paddingHorizontal: 20,
  },
});

