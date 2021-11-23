import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Linking,
} from "react-native";
import {
  HStack,
  Stack,
  Center,
  Heading,
  Image,
  List,
  NativeBaseProvider,
  Thumbnail,
  Box,
  Spacer,
  VStack,
  Avatar,
  Toast,
  Button,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { marginTop } from "styled-system";
const DATA = [
  {
    name: "Al MAktoum Branch",
    adress: "Address: Dubai, Deira, Al Maktoum",
    tel: "Tel No: +97146035555",
    img: require("../img/Branchpic/HO.jpg"),
    pox: "P.O.BOX: 4182, Dubai, UAE",
    url: "https://www.google.com/maps/place/%D8%A8%D8%A7%D9%86%DA%A9+%D8%B5%D8%A7%D8%AF%D8%B1%D8%A7%D8%AA+%D8%A7%DB%8C%D8%B1%D8%A7%D9%86+%D8%AF%DB%8C%D8%B1%D9%87+%D8%AF%D8%A8%DB%8C%E2%80%AD/@25.2664422,55.3084884,17z/data=!3m1!4b1!4m5!3m4!1s0x3e5f4335ba4fffff:0x284e2a5294069cca!8m2!3d25.2664422!4d55.3106771",
  },
  {
    name: "Murshed Bazar Branch",
    adress: "Address: Dubai, Baniyas Street, Al Owais Tower",
    tel: "Tel No: +97142264805",
    img: require("../img/Branchpic/Murshed.jpg"),
    pox: "P.O.BOX: 4182, Dubai, UAE",
    url: "https://www.google.com/maps/place/%D8%A8%D8%A7%D9%86%DA%A9+%D8%B5%D8%A7%D8%AF%D8%B1%D8%A7%D8%AA+%D8%A7%DB%8C%D8%B1%D8%A7%D9%86+%D8%AF%DB%8C%D8%B1%D9%87+%D8%AF%D8%A8%DB%8C%E2%80%AD/@25.2664422,55.3084884,17z/data=!3m1!4b1!4m5!3m4!1s0x3e5f4335ba4fffff:0x284e2a5294069cca!8m2!3d25.2664422!4d55.3106771",
  },
  {
    name: "Sheikh Zayed Road Branch",
    adress: "Address: Dubai, Sheikh Zayed Rd, Al Wasl Tower",
    tel: "Tel No: +97143311187",
    img: require("../img/Branchpic/sheikhzayed.jpg"),
    pox: "P.O.BOX: 4182, Dubai, UAE",
    url: "https://www.google.com/maps/place/%D8%A8%D8%A7%D9%86%DA%A9+%D8%B5%D8%A7%D8%AF%D8%B1%D8%A7%D8%AA+%D8%A7%DB%8C%D8%B1%D8%A7%D9%86+%D8%AF%DB%8C%D8%B1%D9%87+%D8%AF%D8%A8%DB%8C%E2%80%AD/@25.2664422,55.3084884,17z/data=!3m1!4b1!4m5!3m4!1s0x3e5f4335ba4fffff:0x284e2a5294069cca!8m2!3d25.2664422!4d55.3106771",
  },
  {
    name: "Bur Dubai Branch",
    adress: "Address: Dubai, Khalid Bin Waleed (Bank) Street",
    tel: "Tel No: +97143511110",
    img: require("../img/Branchpic/BurDubai.jpg"),
    pox: "P.O.BOX: 4182, Dubai, UAE",
    url: "https://www.google.com/maps/place/%D8%A8%D8%A7%D9%86%DA%A9+%D8%B5%D8%A7%D8%AF%D8%B1%D8%A7%D8%AA+%D8%A7%DB%8C%D8%B1%D8%A7%D9%86+%D8%AF%DB%8C%D8%B1%D9%87+%D8%AF%D8%A8%DB%8C%E2%80%AD/@25.2664422,55.3084884,17z/data=!3m1!4b1!4m5!3m4!1s0x3e5f4335ba4fffff:0x284e2a5294069cca!8m2!3d25.2664422!4d55.3106771",
  },
  {
    name: "Abu Dhabi Branch",
    adress: "Address: Abu Dhabi, Hamdan Street",
    tel: "Tel No: +97126225155",
    img: require("../img/Branchpic/AbuDhabi.jpg"),
    pox: "P.O.BOX: 700, Abu Dhabi, UAE",
    url: "https://www.google.com/maps/place/%D8%A8%D8%A7%D9%86%DA%A9+%D8%B5%D8%A7%D8%AF%D8%B1%D8%A7%D8%AA+%D8%A7%DB%8C%D8%B1%D8%A7%D9%86+%D8%AF%DB%8C%D8%B1%D9%87+%D8%AF%D8%A8%DB%8C%E2%80%AD/@25.2664422,55.3084884,17z/data=!3m1!4b1!4m5!3m4!1s0x3e5f4335ba4fffff:0x284e2a5294069cca!8m2!3d25.2664422!4d55.3106771",
  },
  {
    name: "Ajman Branch",
    adress: "Address: Ajman, Sheikh Rashid Bin Humaid Alnuaimi Street",
    tel: "Tel No: +97167422232",
    img: require("../img/Branchpic/AjmanBr.jpg"),
    pox: "P.O.BOX: 16, Ajman, UAE",
    url: "https://www.google.com/maps/place/%D8%A8%D8%A7%D9%86%DA%A9+%D8%B5%D8%A7%D8%AF%D8%B1%D8%A7%D8%AA+%D8%A7%DB%8C%D8%B1%D8%A7%D9%86+%D8%AF%DB%8C%D8%B1%D9%87+%D8%AF%D8%A8%DB%8C%E2%80%AD/@25.2664422,55.3084884,17z/data=!3m1!4b1!4m5!3m4!1s0x3e5f4335ba4fffff:0x284e2a5294069cca!8m2!3d25.2664422!4d55.3106771",
  },
  {
    name: "Sharjah Branch",
    adress: "Address: Sharjah, Al Arooba Street",
    tel: "Tel No: +97165681121",
    img: require("../img/Branchpic/Sharjah.jpg"),
    pox: "P.O.BOX: 316, Sharjah, UAE",
    url: "https://www.google.com/maps/place/%D8%A8%D8%A7%D9%86%DA%A9+%D8%B5%D8%A7%D8%AF%D8%B1%D8%A7%D8%AA+%D8%A7%DB%8C%D8%B1%D8%A7%D9%86+%D8%AF%DB%8C%D8%B1%D9%87+%D8%AF%D8%A8%DB%8C%E2%80%AD/@25.2664422,55.3084884,17z/data=!3m1!4b1!4m5!3m4!1s0x3e5f4335ba4fffff:0x284e2a5294069cca!8m2!3d25.2664422!4d55.3106771",
  },
  {
    name: "Al Ain Branch",
    adress: "Address: Al Ain, Main Street",
    tel: "Tel No: +97137641556",
    img: require("../img/Branchpic/AlAin.jpg"),
    pox: "P.O.BOX: 1140, Al Ain, UAE",
    url: "https://www.google.com/maps/place/%D8%A8%D8%A7%D9%86%DA%A9+%D8%B5%D8%A7%D8%AF%D8%B1%D8%A7%D8%AA+%D8%A7%DB%8C%D8%B1%D8%A7%D9%86+%D8%AF%DB%8C%D8%B1%D9%87+%D8%AF%D8%A8%DB%8C%E2%80%AD/@25.2664422,55.3084884,17z/data=!3m1!4b1!4m5!3m4!1s0x3e5f4335ba4fffff:0x284e2a5294069cca!8m2!3d25.2664422!4d55.3106771",
  },
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const BranchesInfo = () => {
  function onpressitem(container) {
    console.log("ok: " + container);
    Linking.openURL(container);
  }
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <Image
          source={require("../img/images/logo.png")}
          style={{
            height: 100,
            resizeMode: "stretch",
            alignContent: "center",
            width: "90%",
            marginTop: 0,

            marginLeft: 20,
          }}
        />
      </NativeBaseProvider>
      <FlatList
        data={DATA}
        style={{ marginTop: 100 }}
        onLongPress={() => onpressitem(item.url)}
        renderItem={({ item }) => (
          <NativeBaseProvider>
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack space={3} justifyContent="space-between">
                <Image
                  size="50"
                  source={item.img}
                  //   w="40px"
                  //   h="45px"
                />
                <VStack>
                  <Text
                    style={{
                      fontSize: 19,
                      fontStyle: "bold",
                      width: "100%",
                      //   alignContent: "center",
                      //   alignItems: "center",
                      //   alignSelf: "center",
                    }}
                    _dark={{
                      color: "warmGray.50",
                    }}
                    bold
                  >
                    {item.name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    style={{ fontSize: "13", width: "70%" }}
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.adress}
                  </Text>
                  <Text
                    color="coolGray.600"
                    style={{ fontSize: "14", width: "100%" }}
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.tel}
                  </Text>
                </VStack>

                <Spacer />
              </HStack>
              <Box>
                <Button
                  transparent
                  info
                  style={{
                    marginTop: -60,
                    alignContent: "flex-end",
                    alignSelf: "flex-end",
                    alignItems: "flex-end",
                  }}
                  onPress={() => onpressitem(item.url)}
                >
                  <Ionicons
                    name="compass-outline"
                    size={32}
                    color="white"
                    style={{
                      justifyContent: "right",
                      textAlign: "right",
                      marginBottom: 1,
                      marginTop: 4,
                    }}
                  />
                </Button>
              </Box>
            </Box>
          </NativeBaseProvider>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BranchesInfo;
