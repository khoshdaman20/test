import React from "react";
import {
  Icon,
  Input,
  Text,
  Toast,
  View,
  NativeBaseProvider,
  Box,
  HStack,
  Checkbox,
} from "native-base";
import axios from "react-native-axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { Component } from "react";
import { fontSize, marginTop } from "styled-system";
export default class Apps extends Component {
  constructor(props, { navigation }) {
    super(props);
    this.state = {
      selected2: undefined,
      selectedLang: "0",
      Myprops: props,
      checkTerms: false,
    };
    username = "";
    password = "";
    Emarat = "false";

    nationalCode = "";
    accountNumbers = "";
    mobileNumbers = "";
  }
  ChekingGo = false;
  Go_Login() {
    // console.log(this.state.selectedLang);
    if (this.state.selectedLang == 1) {
    }
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value,
    });
  }
  render() {
    return (
      <NativeBaseProvider>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
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
          <Text
            style={{
              fontFamily: "IRANSansMobile",
              fontSize: 30,
              marginTop: "11%",
              height: 40,
              backgroundColor: "#eb9c0e",
              width: "100%",

              textAlign: "center",
              textAlignVertical: "center",
              padding: 15,

              color: "#fff",
            }}
          >
            {""}
            Register
          </Text>
        </View>
        <View
          style={{
            marginTop: "10%",
            marginLeft: "10%",
            marginRight: "10%",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Box>
            <Text style={{ fontFamily: "IRANSansMobile", fontSize: 16 }}>
              {"   "}
              Account Number:
            </Text>
            <Input
              w="100%"
              mx={3}
              style={{ fontSize: 18, marginTop: 10 }}
              placeholder="2624123456100"
              onChangeText={(txt) => {
                accountNumbers = txt;
              }}
              InputRightElement={
                <Icon as={<MaterialIcons name="person" />} size="md" m={2} />
              }
            />
          </Box>
          <Box style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: "IRANSansMobile", fontSize: 16 }}>
              {"   "}
              Enter EmaratID or PassportCode
            </Text>
            <Input
              w="100%"
              mx={3}
              style={{ fontSize: 18, marginTop: 10 }}
              onChangeText={(txt) => {
                nationalCode = txt;
              }}
              placeholder=" - - - - - - - - - - - - - - - - "
              InputRightElement={
                <Icon as={<MaterialIcons name="payment" />} size="md" m={2} />
              }
            />
          </Box>
          <Box style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: "IRANSansMobile", fontSize: 16 }}>
              {"   "}
              Mobile Number:
            </Text>
            <Input
              w="100%"
              mx={3}
              style={{ fontSize: 18, marginTop: 10 }}
              onChangeText={(text) => {
                mobileNumbers = text;
              }}
              placeholder="009715*111111"
              InputRightElement={
                <Icon as={<MaterialIcons name="phone" />} size="md" m={2} />
              }
            />
          </Box>
        </View>
        <View style={{ bottom: 0 }}>
          <Checkbox
            isInvalid
            value="invalid"
            style={{ marginLeft: 2 }}
            onChange={(checker) => {
              if (checker == true) this.setState({ selectedLang: true });
              else this.setState({ selectedLang: false });
            }}
          >
            Terms and condition
          </Checkbox>

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
              if (this.state.selectedLang == 1) {
                try {
                  const myObj = {
                    Action: "CheckReg",
                    Account: accountNumbers.substring(0, 10),
                    Mobile: mobileNumbers,
                    Passport: nationalCode,
                  };

                  var Myprops = this.props;
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
                          title: "This account  has allready been registered",
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
                            console.log(JSON.stringify(response.data.body));
                            if (JSON.stringify(response.data.body) == "[]") {
                              Toast.show({
                                title: "This account has  not registered ",
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

                                console.log(accountNumbers.substring(0, 10));
                                console.log(mobileNumbers);
                                console.log(nationalCode);
                                console.log(Log[0].req);
                                const myObj2 = {
                                  Action: "CreateOTP",
                                  Accno: accountNumbers.substring(0, 10),
                                  Birthday: mobileNumbers,
                                  Passportcode: nationalCode,
                                  OTPCode: Log[0].req,
                                };
                                console.log("Last Send ");
                                Myprops.navigation.navigate(
                                  "Reg_ConfermOtpEN",
                                  myObj2
                                );
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

                    textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
                    duration: 3000,
                  });
                }
              } else {
                Toast.show({
                  title: "Please confirm the terms and conditions",
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
                fontSize: 20,
                marginTop: 20,
                height: "100%",
                color: "#FFF",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </NativeBaseProvider>
    );
  }
}
export const CheckBoxOK = () => {
  return (
    <HStack space={6} style={{ marginTop: 20 }}>
      <Checkbox
        isInvalid
        value="invalid"
        style={{ marginLeft: 2 }}
        //   onChange={(check) => {
        //     console.log(check);
        //     if (check == true) {
        //       checkTerms = true;
        //     } else {
        //       checkTerms = false;
        //     }
        //     this.setState({ checkTerms: check });
        //   }}
        onPress={() => this.setState({ selectedLang: 1 })}
      >
        Terms and condition
      </Checkbox>
    </HStack>
  );
};
