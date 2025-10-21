import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  // Props will be added here
}

function StickyParticles({}: Props) {
  return (
    <View style={styles.container}>
      {/* Component content will be added here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StickyParticles;

