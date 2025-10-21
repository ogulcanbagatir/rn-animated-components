import PageCurl, { PageCurlHandle } from "@/components/PageCurl/PageCurl"
import colors from "@/theme/colors"
import { Feather } from "@expo/vector-icons"
import React, { useRef } from "react"
import { Pressable, StyleSheet, View } from "react-native"

export default function PageCurlExample() {
  const ref = useRef<PageCurlHandle>(null)

  return (
    <View style={styles.container}>
      <PageCurl
        ref={ref}
        images={[
          require("../assets/images/1.png"),
          require("../assets/images/2.png"),
          require("../assets/images/3.png"),
          require("../assets/images/4.png"),
        ]}
        gestureEnabled={true}
      />
      
      <Pressable 
        style={styles.leftButton}
        onPress={() => ref.current?.prev()}
      >
        <Feather name="chevron-left" size={28} color="white" />
      </Pressable>
      
      <Pressable 
        style={styles.rightButton}
        onPress={() => ref.current?.next()}
      >
        <Feather name="chevron-right" size={28} color="white" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark1,
  },
  leftButton: {
    position: "absolute",
    left: 20,
    bottom: 32,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  rightButton: {
    position: "absolute",
    right: 20,
    bottom: 32,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  }
})

