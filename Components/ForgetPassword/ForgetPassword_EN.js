import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import axios from "react-native-axios";
import { TextInput } from "react-native-gesture-handler";
import { alignItems, bottom } from "styled-system";
import { Icon, NativeBaseProvider, Toast } from "native-base";
import { Input } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
function ForgetPassword_EN(props, { navigation }) {
  var username = "";
  var password = "";
  var birthday = "";
  var passportcode = "";
  var MobileNumbers = "";

  const url = "";
  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../img/images/logo.png")}
          style={{
            height: 100,
            resizeMode: "stretch",
            alignContent: "center",
            width: "90%",
            marginTop: "10%",
            marginLeft: 30,
          }}
        />
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#eb9c0e",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>
            Password Recovery
          </Text>
        </View>
        <View style={{ alignItems: "left" }}>
          <Text
            style={{
              marginTop: 30,
              fontFamily: "IRANSansMobile",
              textAlign: "left",
              fontSize: 16,
            }}
          >
            Account Number:
          </Text>

          <Input
            w="95%"
            mx={3}
            my="1"
            style={{ fontSize: 14 }}
            placeholder="Account number"
            onChangeText={(text) => {
              username = text;
            }}
            InputRightElement={
              <Icon as={<MaterialIcons name="person" />} size="md" m={2} />
            }
          />
          <Text
            style={{
              marginTop: 30,
              fontFamily: "IRANSansMobile",
              textAlign: "left",
              fontSize: 16,
            }}
          >
            Enter EmaratID or PassportCode
          </Text>

          <Input
            w="95%"
            mx={3}
            my="1"
            style={{ fontSize: 14 }}
            onChangeText={(text) => {
              passportcode = text;
            }}
            placeholder="Emarat IDs or Passport Code"
            InputRightElement={
              <Icon as={<MaterialIcons name="payment" />} size="md" m={2} />
            }
          />
          <Text
            style={{
              marginTop: 30,
              fontFamily: "IRANSansMobile",
              textAlign: "left",
              fontSize: 16,
            }}
          >
            Mobile Number:
          </Text>

          <Input
            w="95%"
            mx={3}
            my="1"
            style={{
              fontSize: 14,
            }}
            placeholder="Mobile Number"
            onChangeText={(text) => {
              MobileNumbers = text;
            }}
            InputRightElement={
              <Icon as={<MaterialIcons name="phone" />} size="md" m={2} />
            }
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 60,
            position: "absolute",
            bottom: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#eb9c0e",
          }}
        >
          <TouchableOpacity
            style={{
              height: 60,
              width: "100%",
              marginTop: 10,
              alignContent: "center",
              alignSelf: "center",
              backgroundColor: "#eb9c0e",
            }}
            onPress={() => {
              try {
                const myObj = {
                  Action: "CheckReg",
                  Account: username.substring(0, 10),
                  Mobile: MobileNumbers,
                  Passport: passportcode,
                };
                console.log(
                  "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/CheckAccount_Servlet?" +
                    JSON.stringify(myObj)
                );
                axios
                  .post(
                    "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/CheckAccount_Servlet?" +
                      JSON.stringify(myObj)
                  )
                  .then(function (response) {
                    console.log("OK -> ");

                    console.log("Chek my ->" + response.data);
                    console.log(response.data);

                    var returnfun = JSON.stringify(response.data.body);
                    console.log("this body2-> Return: " + returnfun);
                    if (
                      (response.data.body == "Duplicate") |
                      (response.data.body == "OK")
                    ) {
                      try {
                        birthday = MobileNumbers;
                        const myObj = {
                          Action: "CreateOTP",
                          Accno: username.substring(0, 10),
                          Birthday: birthday,
                          Passportcode: passportcode,
                          OTPCode: "OTPCode",
                        };
                        console.log("myObj:");
                        console.log(myObj);
                        const myObjStr = JSON.stringify(myObj);

                        console.log(
                          "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/OTPService?" +
                            myObjStr
                        );

                        axios
                          .post(
                            "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/OTPService?" +
                              myObjStr
                          )
                          .then(function (response) {
                            console.log("OK -> ");
                            console.log(response.data);

                            var returnfun = JSON.stringify(response.data.body);
                            console.log("this body2-> Return: " + returnfun);
                            if (response.data.body == "AccountBan") {
                              Toast.show({
                                title:
                                  "Your account has been bloacked, visit the branch ",
                                backgroundColor: "#ff0000",

                                textStyle: {
                                  fontFamily: "IRANSansMobile",
                                  fontSize: 12,
                                },
                                duration: 3000,
                              });
                            } else if (response.data.body == "Duplicate") {
                              Toast.show({
                                title:
                                  "This account  has allready been registered",
                                backgroundColor: "#ff0000",

                                textStyle: {
                                  fontFamily: "IRANSansMobile",
                                  fontSize: 12,
                                },
                                duration: 3000,
                              });
                            } else if (response.data.body == "NOK") {
                              Toast.show({
                                title:
                                  "The Account's information is incorrect, please visit the branch ",
                                backgroundColor: "#ff0000",

                                textStyle: {
                                  fontFamily: "IRANSansMobile",
                                  fontSize: 12,
                                },
                                duration: 3000,
                              });
                            } else {
                              const myObj = {
                                Action: "CreateOTP",
                                Accno: accountNumbers.substring(0, 10),
                                Birthday: mobileNumbers,
                                Passportcode: nationalCode,
                                OTPCode: "OTPCode",
                              };

                              console.log(myObj);

                              console.log(
                                "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/OTPService?" +
                                  JSON.stringify(myObj)
                              );
                              axios
                                .post(
                                  "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/OTPService?" +
                                    JSON.stringify(myObj)
                                )
                                .then(function (response) {
                                  console.log(response.data);
                                  console.log(
                                    JSON.stringify(response.data.body)
                                  );
                                  if (
                                    JSON.stringify(response.data.body) == "[]"
                                  ) {
                                    Toast.show({
                                      title:
                                        "This account has  not registered ",
                                      backgroundColor: "#ff0000",

                                      textStyle: {
                                        fontFamily: "IRANSansMobile",
                                        fontSize: 12,
                                      },
                                      duration: 3000,
                                    });
                                  } else {
                                    var mm = JSON.stringify(response.data.body);
                                    const Log = JSON.parse(mm);
                                    console.log("this log " + Log[0].req);

                                    if (Log[0].req == "notfound") {
                                      Toast.show({
                                        title: "Account not found ",
                                        backgroundColor: "#ff0000",

                                        textStyle: {
                                          fontFamily: "IRANSansMobile",
                                          fontSize: 12,
                                        },
                                        duration: 3000,
                                      });
                                    } else if (Log[0].req == "notfound") {
                                    } else {
                                      console.log("Account Is OK");

                                      const myObj2 = {
                                        Action: "CreateOTP",
                                        Accno: username.substring(0, 10),
                                        Birthday: MobileNumbers,
                                        Passportcode: passportcode,
                                        OTPCode: Log[0].req,
                                      };
                                      console.log(myObj2);
                                      Toast.show({
                                        title: "Account has not registered ",
                                        backgroundColor: "#ff0000",

                                        textStyle: {
                                          fontFamily: "IRANSansMobile",
                                          fontSize: 12,
                                        },
                                        duration: 3000,
                                      });
                                      // props.navigation.navigate(
                                      //   "OTP_Forgetpassword_EN",
                                      //   myObj2
                                      // );
                                    }
                                  }
                                })
                                .catch(function (error) {
                                  Toast.show({
                                    title: "Connection Time Out ",
                                    backgroundColor: "#ff0000",

                                    textStyle: {
                                      fontFamily: "IRANSansMobile",
                                      fontSize: 12,
                                    },
                                    duration: 3000,
                                  });
                                })
                                .then(function () {
                                  // always executed
                                });
                            }
                          })
                          .catch(function (error) {
                            Toast.show({
                              title: "Connection Time Out ",
                              backgroundColor: "#ff0000",
                              textStyle: {
                                fontFamily: "IRANSansMobile",
                                fontSize: 12,
                              },
                              duration: 3000,
                            });
                          })
                          .then(function () {
                            // always executed
                          });
                      } catch (err) {
                        Toast.show({
                          title: "Connection Time Out ",
                          backgroundColor: "#ff0000",
                          textStyle: {
                            fontFamily: "IRANSansMobile",
                            fontSize: 12,
                          },
                          duration: 3000,
                        });
                      }
                    } else if (response.data.body == "AccountBan") {
                      Toast.show({
                        title: "The account has been blocked ",
                        backgroundColor: "#ff0000",
                        textStyle: {
                          fontFamily: "IRANSansMobile",
                          fontSize: 12,
                        },
                        duration: 3000,
                      });
                    } else if (response.data.body == "NOK") {
                      Toast.show({
                        title: "Account not found ",
                        backgroundColor: "#ff0000",
                        textStyle: {
                          fontFamily: "IRANSansMobile",
                          fontSize: 12,
                        },
                        duration: 3000,
                      });
                    } else {
                      Toast.show({
                        // text: 'اطلاعات وارد شده صحیح نمی باشد  ',
                        title: "The account´s  information is wrong  ",
                        backgroundColor: "#ff0000",
                        textStyle: {
                          fontFamily: "IRANSansMobile",
                          fontSize: 12,
                        },
                        duration: 3000,
                      });
                    }
                  })
                  .catch(function (error) {
                    Toast.show({
                      title: "Connection Time Out ",
                      backgroundColor: "#ff0000",
                      textStyle: {
                        fontFamily: "IRANSansMobile",
                        fontSize: 12,
                      },
                      duration: 3000,
                    });
                  })
                  .then(function () {
                    // always executed
                  });
              } catch (err) {
                Toast.show({
                  title: "Connection Time Out ",
                  backgroundColor: "#ff0000",
                  textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
                  duration: 3000,
                });
              }
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                marginTop: 10,
                height: "100%",
                color: "#FFF",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default ForgetPassword_EN;
