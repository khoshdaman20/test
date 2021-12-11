import React from "react";
import { View, StyleSheet, Text, Linking, Alert } from "react-native";
import {
  Select,
  VStack,
  CheckIcon,
  Center,
  Image,
  NativeBaseProvider,
  Button,
  Stack,
  Heading,
  HStack,
} from "native-base";
import axios from "react-native-axios";
import CountDown from "react-native-countdown-component";
import { justifyContent, textAlign } from "styled-system";
import { Rect } from "react-native-svg";

function MainForm_FA(props, { navigation }) {
  let [service, setService] = React.useState("");
  var IBAN = "";
  var AccinfoJS = JSON.parse(props.route.params.Accinfo.body);
  var FirsMetudes = AccinfoJS[0];
  var DefualtAccNumbers =
    FirsMetudes.SCAB + FirsMetudes.SCAN + FirsMetudes.SCAS;
  var DefualtIBAN = FirsMetudes.NEIBAN;
  var DefualtAcc = DefualtAccNumbers;
  var totalDuration = 300;
  FirsMetudes.SCAB +
    FirsMetudes.SCAN +
    FirsMetudes.SCAS +
    " - " +
    FirsMetudes.NEIBAN;

  const filteredItems = JSON.parse(props.route.params.Accinfo.body).filter(
    (item) => {
      IBAN = item;
      console.log(IBAN);

      return true;
    }
  );
  function onValueChange(value) {
    console.log("Change Value: " + value);
    var pieces = value.split(" - ");
    console.log("pieces[0]: " + pieces[0]);
    console.log("pieces[1]: " + pieces[1]);

    (DefualtAccNumbers = pieces[0]), (DefualtIBAN = pieces[1]);
  }

  function onValueChangeRset() {
    var Times = totalDuration;
    Times = Times + 1;
    console.log(Times);
    totalDuration = Times;
    // this.state.isFinisheDur = false;
  }
  return (
    <View style={styles.container}>
      {/* <Text>{props.route.params.Tokens}</Text> */}
      <NativeBaseProvider>
        <Image
          source={require("../img/images/logo.png")}
          style={{
            height: 100,
            resizeMode: "stretch",
            alignContent: "center",
            width: "90%",
            marginTop: 30,
            marginLeft: 20,
          }}
        />
        <CountDown
          until={{ totalDuration }}
          size={0}
          onFinish={() =>
            props.navigation.navigate("SplashEN", {
              User: "",
              pass: "",
            })
          }
          onPress={(until) => console.log(until)}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: "#1CC625" }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "", s: "" }}
        />
        <View style={styles.HeaderView}>
          <Text
            style={{
              marginTop: 10,
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            Welcome {props.route.params.NameFmily.trim()}
          </Text>
          <Text
            style={{
              marginTop: 10,
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            Last Login: {props.route.params.LastLoginDateTime.trim()}
          </Text>
          <VStack alignItems="center" space={1}>
            <Select
              selectedValue={service}
              minWidth="90%"
              accessibilityLabel="Select Account Number"
              placeholder={DefualtAcc + "-" + DefualtIBAN}
              color="#fff"
              shadow="7"
              fontSize="14"
              style={{ textAlign: "center" }}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(value) => onValueChange(value)}
            >
              {(() =>
                filteredItems.map(
                  (item) => (
                    (IBAN = item.NEIBAN),
                    (
                      <Select.Item
                        label={
                          item.SCAB +
                          item.SCAN +
                          item.SCAS +
                          " - " +
                          item.NEIBAN
                        }
                        value={
                          item.SCAB +
                          item.SCAN +
                          item.SCAS +
                          " - " +
                          item.NEIBAN
                        }
                      />
                    )
                  )
                ))()}
            </Select>
          </VStack>
        </View>
        <Stack space={3} alignItems="center" marginTop="3">
          <HStack space={3} alignItems="center">
            <Center h="150" w="40%" rounded="md" shadow={0} textAlign="center">
              <Button
                Button
                borderRadius="20"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  // margin: 3,
                  marginRight: 5,
                  justifyContent: "center",
                  flex: 1,
                }}
                onPress={() => {
                  console.log("Starts ");
                  onValueChangeRset();

                  const myObj = {
                    Accont: DefualtAccNumbers,
                    Token: props.route.params.Tokens,
                    LastCount: "3",
                    CustomerName: props.route.params.NameFmily,
                    LastBalance: 3,
                  };

                  const myObjStr = JSON.stringify(myObj);

                  console.log(
                    "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/LastBalance?" +
                      myObjStr
                  );

                  console.log("Start Send");

                  axios
                    .get(
                      "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/LastBalance?" +
                        myObjStr
                    )
                    .then((response) => {
                      // console.log(response.data);

                      const myObjStr = JSON.stringify(response.data);
                      var Login = JSON.parse(myObjStr);

                      console.log("Trans 30 -> " + DefualtIBAN);

                      props.navigation.navigate("Transactions", {
                        myJSON: Login,
                        ACCNO: DefualtAccNumbers,
                        IBAN: DefualtIBAN,
                        CustomerName: props.route.params.NameFmily,
                        LastBalance: 3,
                      });
                    });
                }}
              >
                <Image
                  source={require("../img/images/3tr.png")}
                  style={{
                    alignContent: "center",
                    alignSelf: "center",
                    marginBottom: 10,
                  }}
                ></Image>
                <Text
                  style={{
                    color: "#000",
                    textAlign: "center",
                    fontFamily: "IRANSansMobile",
                    fontSize: 15,
                  }}
                >
                  3 گردش
                </Text>
              </Button>
            </Center>

            <Center h="150" w="40%" rounded="md" shadow={3}>
              <Button
                Button
                borderRadius="20"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  // margin: 3,
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Image
                  source={require("../img/images/balance2.png")}
                  style={{
                    alignContent: "center",
                    alignSelf: "center",
                    marginBottom: 10,
                  }}
                ></Image>

                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "IRANSansMobile",
                    fontSize: 15,
                    color: "#000",
                  }}
                  onPress={() => {
                    onValueChangeRset();
                    console.log("Starts ");
                    var AccountNumber = DefualtAccNumbers;
                    console.log(AccountNumber);
                    const myObj = {
                      Accont: DefualtAccNumbers,
                      Token: props.route.params.Tokens,
                    };

                    const myObjStr = JSON.stringify(myObj);
                    console.log(
                      "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/Balance?" +
                        myObjStr
                    );
                    axios
                      .get(
                        "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/Balance?" +
                          myObjStr
                      )
                      .then(function (response) {
                        console.log("OK");
                        const myObjStr = JSON.stringify(response.data);
                        var Login = JSON.parse(myObjStr);
                        var myJSON = JSON.stringify(Login.body);
                        console.log(myJSON);
                        var Login2 = JSON.parse(
                          myJSON.replace("[", "").replace("]", "")
                        );
                        myJSON = myJSON.replace("$", "");
                        myJSON = myJSON.replace('"', " ");
                        myJSON = myJSON.replace('"', " ");
                        Alert.alert(
                          "اعلام موجودی",
                          "موجودی شما مبلغ :‌" + myJSON + "درهم می باشد",
                          [
                            {
                              text: "تایید",

                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                          ],
                          { cancelable: false }
                        );
                      });
                  }}
                >
                  موجودی
                </Text>
              </Button>
            </Center>
          </HStack>
        </Stack>
        <Stack space={3} alignItems="center" marginTop="3">
          <HStack space={3} alignItems="center">
            <Center h="150" w="40%" rounded="md" shadow={0} textAlign="center">
              <Button
                Button
                borderRadius="20"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  // margin: 3,
                  marginRight: 5,
                  justifyContent: "center",
                  flex: 1,
                }}
                onPress={() => {
                  console.log("Starts ");
                  onValueChangeRset();

                  const myObj = {
                    Accont: DefualtAccNumbers,
                    Token: props.route.params.Tokens,
                    LastCount: "30",
                    CustomerName: props.route.params.NameFmily,
                    LastBalance: 30,
                  };

                  const myObjStr = JSON.stringify(myObj);

                  console.log(
                    "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/LastBalance?" +
                      myObjStr
                  );

                  console.log("Start Send");

                  axios
                    .get(
                      "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/LastBalance?" +
                        myObjStr
                    )
                    .then((response) => {
                      // console.log(response.data);

                      const myObjStr = JSON.stringify(response.data);
                      var Login = JSON.parse(myObjStr);

                      console.log("Trans 30 -> " + DefualtIBAN);

                      props.navigation.navigate("Transactions", {
                        myJSON: Login,
                        ACCNO: DefualtAccNumbers,
                        IBAN: DefualtIBAN,
                        CustomerName: props.route.params.NameFmily,
                        LastBalance: 30,
                      });
                    });
                }}
              >
                <Image
                  source={require("../img/images/3tr.png")}
                  style={{
                    alignContent: "center",
                    alignSelf: "center",
                    marginBottom: 10,
                  }}
                ></Image>
                <Text
                  style={{
                    color: "#000",
                    textAlign: "center",
                    fontFamily: "IRANSansMobile",
                    fontSize: 15,
                  }}
                >
                  30 گردش
                </Text>
              </Button>
            </Center>

            <Center h="150" w="40%" rounded="md" shadow={2}>
              <Button
                Button
                borderRadius="20"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Image
                  source={require("../img/images/ChangePass.png")}
                  style={{
                    alignContent: "center",
                    alignSelf: "center",
                    marginBottom: 10,
                  }}
                ></Image>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "IRANSansMobile",
                    fontSize: 15,
                    color: "#000",
                  }}
                  onPress={() => {
                    onValueChangeRset();
                    console.log("Starts ");

                    props.navigation.navigate("ChangePass_EN", {
                      // myJSON: Login,
                      ACCNO: DefualtAccNumbers,
                      IBAN: DefualtIBAN,
                      Token: props.route.params.Tokens,
                    });
                  }}
                >
                  تغییر کلمه عبور
                </Text>
              </Button>
            </Center>
          </HStack>
        </Stack>
        <View
          style={{
            backgroundColor: "#ffca5e",
            width: "100%",
            marginTop: "5%",
            height: 170,
          }}
        >
          <Button
            success
            // full
            borderRadius="40"
            onPress={() =>
              Linking.openURL(
                "http://www.banksaderat.ae/Forms/GeneralTariff/GeneralTariif2021.pdf"
              )
            }
            style={{
              justifyContent: "flex-start",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: "86%",
              marginLeft: "7%",
              marginRight: "7%",
            }}
          >
            <Text
              style={{
                textAlign: "right",
                // margin: 10,
                fontFamily: "IRANSansMobile",
                fontSize: 15,
                color: "#000",
              }}
            >
              <Image
                source={require("../img/images/GT.png")}
                style={{ marginLeft: 10 }}
                w="30px"
                h="35px"
              ></Image>
              GeneralTariif
            </Text>
          </Button>
          <Button
            success
            // full
            marginTop="2"
            borderRadius="40"
            onPress={() =>
              Linking.openURL("http://www.banksaderat.ae/NewsEvents.html")
            }
            style={{
              justifyContent: "flex-start",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: "86%",
              marginLeft: "7%",
              marginRight: "7%",
            }}
          >
            <Text
              style={{
                textAlign: "right",
                // margin: 10,
                fontFamily: "IRANSansMobile",
                fontSize: 15,
                color: "#000",
              }}
            >
              <Image
                source={require("../img/images/News.png")}
                style={{ marginLeft: 10 }}
                w="30px"
                h="35px"
              ></Image>
              Events
            </Text>
          </Button>

          <Button
            success
            // full
            borderRadius="40"
            marginTop="2"
            onPress={() =>
              props.navigation.navigate("BranchesInfo", {
                User: "",
                pass: "",
              })
            }
            style={{
              justifyContent: "flex-start",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: "86%",
              marginLeft: "7%",
              marginRight: "7%",
            }}
          >
            <Text
              style={{
                textAlign: "right",
                // margin: 10,
                fontFamily: "IRANSansMobile",
                fontSize: 15,
                color: "#000",
              }}
            >
              <Image
                source={require("../img/images/Branchs.png")}
                style={{ marginLeft: 10 }}
                w="30px"
                h="35px"
              ></Image>
              Branches
            </Text>
          </Button>
          <Button
            success
            h="49px"
            borderRadius="40"
            marginTop="2"
            onPress={() =>
              props.navigation.navigate("SplashEN", {
                User: "",
                pass: "",
              })
            }
            style={{
              justifyContent: "center",
              // backgroundColor: "#ffff",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: "86%",
              marginLeft: "7%",
              marginRight: "7%",
            }}
          >
            <Text
              style={{
                textAlign: "center",

                fontFamily: "IRANSansMobile",
                fontSize: 15,
                color: "#000",
              }}
            >
              خروج
            </Text>
          </Button>
        </View>
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#efca5e",
  },
  HeaderView: {
    alignContent: "center",
  },
});

export default MainForm_FA;
