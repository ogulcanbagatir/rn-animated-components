import { Dimensions, FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import Stepper from "@/components/Stepper/Stepper";
import colors, { hexToRgba } from "@/theme/colors";
import { Feather } from "@expo/vector-icons";

const width = Dimensions.get("window").width - 32;

const images = [require("../assets/images/1.png"),require("../assets/images/2.png"),require("../assets/images/3.png"),require("../assets/images/4.png")]

export default function StepperExample(){
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<FlatList>(null);
  
  useEffect(() => {
    if(currentStep >= 0 && currentStep < images.length){
      scrollRef.current?.scrollToIndex({index: currentStep, animated: true});
    }
  }, [currentStep])

  const handleNext = () => {
    if(currentStep === images.length - 1){
      return;
    }
    setCurrentStep(s => s + 1);
  }

  const handlePrevious = () => {
    if(currentStep === 0){
      return;
    }
    setCurrentStep(s => s - 1);
  }
  
  return (
    <View style={styles.container}>
      <Stepper
        currentStep={currentStep}
        stepCount={4}
        width={width}
        textColor={"white"}
        outlineColor={hexToRgba("#FFFFFF", 0.4)}
        blur={4}
        activeColors={colors.p1}
        radius={16}
        iconSize={16}
        iconColor={"white"}
        customFont={{
          fontFamily: require("../assets/fonts/SpaceMono-Regular.ttf"),
          fontSize: 18,
          fontWeight: "bold",
          fontStyle: "normal"
        }}
        duration={800}
      />
      <FlatList
        data={images}
        ref={scrollRef}
        horizontal
        style={styles.flatList}
        pagingEnabled
        snapToInterval={width}
        snapToAlignment="start"
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.imageContainer}>
            <Image
              source={item}
              style={{width: "100%", height: "100%"}}
              resizeMode="cover"
            />
          </View> 
        )}
      />
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={handlePrevious}
          style={styles.button}
        >
          <Feather name="arrow-left" size={24} color={colors.dark1} />
        </Pressable>
        <Pressable
          onPress={handleNext}
          style={styles.button}
        >
          <Feather name="arrow-right" size={24} color={colors.dark1} />
        </Pressable>
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: colors.dark1,
    alignItems: "center",
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  flatList: {
    width: "100%",
    flex: 1,
    marginTop: 16,
    borderRadius: 16,
  },
  flatListContent: {
  },
  imageContainer: {
    width: width,
    height: "100%",
    borderCurve: "continuous"
  },
  button: {
    backgroundColor: colors.p1,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
  }
})