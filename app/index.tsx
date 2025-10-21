import colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

const data: any[] = [
  {screen: "/liquid-switch", title: "Liquid Switch", icon: null},
  {screen: "/scratch-card", title: "Scratch Card", icon: null},
  {screen: "/circle-loader", title: "Circle Loader", icon: null},
  {screen: "/animated-number", title: "Animated Number", icon: null},
  {screen: "/curtain", title: "Curtain", icon: null},
  {screen: "/radial-progress", title: "Radial Progress", icon: null},
  {screen: "/stepper", title: "Stepper", icon: null},
  {screen: "/sticky-particles", title: "Sticky Particles", icon: null}
  {screen: "/page-curl", title: "Page Curl", icon: null}
]

export default function App() {
  const router = useRouter();

  const renderItem = ({item, index}: {item: any, index: number}) => {
    return (
      <Pressable style={styles.row} onPress={()=> router.navigate(item.screen)}>
        <View style={{flexDirection: "row", columnGap: 4, flex: 1}}>
          {
            item.icon &&
            <Image
              source={item.icon}
              style={{width: 40, height: 40}}
            />
          }
          <Text style={styles.title}>
            {item.title}
          </Text>
        </View>
        <Feather
          name="arrow-right"
          size={24}
          color={colors.p2}
        />
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {"Niche Guys RN Components"}
        </Text>
      </View>
      <FlatList
        style={{flex: 1}}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_,index)=> index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark1
  },
  row: {
    width: "100%",
    rowGap: 8,
    paddingVertical: 20,
    borderBottomWidth: 0.3,
    borderColor: colors.p2,
    flexDirection: "row"
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 24
  },
  title: {
    fontFamily: "SpaceMono-Regular",
    color: colors.p2,
    fontSize: 20
  },
  header: {
    width: "100%",
    paddingTop: 100,
    alignItems: "center"
  },
  headerTitle: {
    fontFamily: "SpaceMono-Regular",
    color: colors.p2,
    fontSize: 24,
  }
})
