import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import CountDown from "react-native-countdown-component";
import {
  Container,
  Content,
  Footer,
  Left,
  Right,
  Header,
  Body,
  FooterTab,
  Button,
  Icon,
  Item,
  Input,
  Label,
  Root,
  Toast,
  Thumbnail,
  Radio,
  ListItem,
  Picker,
  NativeBaseProvider,
} from "native-base";
import axios from "react-native-axios";
function OTP_EN(props, { navigation }) {
  //var accountNumbers = props.route.params.Accno;
  // var isFinisheDur = false;
  var OTPCode = "";
  var OldOTPCODE = props.route.params.OTPCode;
  const [NewOTPState, setNewOTPState] = useState(props.route.params.OTPCode);
  const [count, setCount] = useState(30);
  const [ResendCount, setResendCount] = useState(1);
  const [isFinisheDur, setisFinisheDur] = useState(false);

  return (
    <NativeBaseProvider>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../img/logoVertical.png")}
          style={{
            height: 100,
            resizeMode: "stretch",
            alignContent: "center",
            width: 100,
            marginTop: "10%",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Text
          style={{
            fontFamily: "IRANSansMobile",
            fontSize: 18,
            marginTop: "11%",
            backgroundColor: "#eb9c0e",
            width: "100%",
            height: 30,
            paddingTop: 2,
            textAlign: "center",
            color: "#fff",
          }}
        >
          Please enter the submitted code
        </Text>
        <Input
          style={{
            Family: "IRANSansMobile",
            fontSize: 35,
            borderColor: "#eb9c0e",
            borderWidth: 1,
            textAlign: "center",
            margin: 20,
          }}
          placeholder="- - - - - - "
          keyboardType={"number-pad"}
          onChangeText={(txt) => {
            OTPCode = txt;
          }}
        ></Input>
        <CountDown
          until={count}
          size={30}
          onFinish={() => setisFinisheDur(true)}
          onPress={(until) => console.log(until)}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: "#1CC625" }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "MM", s: "SS" }}
        />
        <Button
          transparent
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
              console.log("-------------------");

              console.log(props.route.params.Accno);
              console.log(props.route.params.Passportcode);
              console.log(props.route.params.Accno);
              console.log(props.route.params.Birthday);

              const myObj = {
                Action: "CreateOTP",
                // Accno: this.props.route.params.Accno,

                Accno: props.route.params.Accno,
                Passportcode: props.route.params.Passportcode,
                Birthday: props.route.params.Birthday,
              };
              console.log("--------sss-----------");

              const myObjStr = JSON.stringify(myObj);
              console.log("ResendCount: " + ResendCount);
              var Times = count;
              console.log(isFinisheDur);
              if (isFinisheDur == true) {
                if (ResendCount > 5) {
                  Toast.show({
                    title: "Your Account is Block",
                    backgroundColor: "#ff0000",
                    textStyle: {
                      fontFamily: "IRANSansMobile",
                      fontSize: 12,
                    },
                    duration: 3000,
                  });
                } else {
                  var mm = ResendCount;
                  mm = mm + 1;
                  setResendCount(mm);

                  Times = Times + 1;
                  setCount(count + 1);
                  // this.setState({ totalDuration: Times });
                  setisFinisheDur(false);
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
                      console.log("OK3 -> ");
                      console.log(response.data.body);

                      var mm = JSON.stringify(response.data.body);

                      const Log = JSON.parse(mm);
                      OldOTPCODE = Log[0].req;
                      var myCode = Log[0].req;
                      console.log("myCode:" + myCode);
                      OldOTPCODE = myCode;
                      console.log(
                        "State.OldOTPCODE New OTP->: " +
                          props.route.params.OTPCode
                      );
                      console.log("Log[0].req: " + Log[0].req);
                      // State.totalDuration = 90;
                      setNewOTPState(Log[0].req);
                      console.log("injam ");
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
                    });
                }
              } else {
                Toast.show({
                  title: "please wait until the time gets down  ",
                  backgroundColor: "#ff0000",
                  textStyle: {
                    fontFamily: "IRANSansMobile",
                    fontSize: 12,
                  },
                  duration: 3000,
                });
              }
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
              fontFamily: "IRANSansMobile",
              fontSize: 24,
              textAlign: "center",
              // marginLeft: 25,
              width: "100%",
              color: "#fff",
            }}
          >
            Resend the code
          </Text>
        </Button>
        <Button
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
              console.log(OldOTPCODE);
              const myObj = {
                Action: "GetOTP",
                Accno: props.route.params.Accno,
                OTPCode: OTPCode,
              };

              console.log("myObj:");
              console.log(myObj);
              const myObjStr = JSON.stringify(myObj);
              // var myProps = this.props;
              // var State = this.state;
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
                  console.log(response.data);

                  var OTPData = response.data.body;

                  var OTPDatastr = JSON.stringify(OTPData);

                  var mm = JSON.stringify(response.data.body);

                  const Log = JSON.parse(mm);
                  console.log("State.OldOTPCODE-> : " + OldOTPCODE);
                  console.log("Log[0].req1: " + Log[0].req);
                  console.log(Log[0].req + " - " + NewOTPState);
                  if (isFinisheDur == true) {
                    Toast.show({
                      title: "The code entered is incorrect",
                      backgroundColor: "#ff0000",
                      textStyle: {
                        fontFamily: "IRANSansMobile",
                        fontSize: 12,
                      },
                      duration: 3000,
                    });
                  } else {
                    if (OTPCode == NewOTPState) {
                      console.log("Go Send");
                      const myObj = {
                        ACCNO: props.route.params.Accno.substring(0, 10),
                        Passport: props.route.params.Passportcode,
                        BirthDay: props.route.params.Birthday,
                      };
                      const myObjStr = JSON.stringify(myObj);
                      console.log("Send RegPassEn");
                      console.log(myObjStr);

                      props.navigation.navigate("AddPassword_EN", myObj);
                    } else {
                      Toast.show({
                        title: "The code entered is incorrect",
                        backgroundColor: "#ff0000",
                        textStyle: {
                          fontFamily: "IRANSansMobile",
                          fontSize: 12,
                        },
                        duration: 3000,
                      });
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
              fontFamily: "IRANSansMobile",
              fontSize: 24,
              textAlign: "center",
              // marginLeft: 25,
              width: "100%",
              color: "#fff",
            }}
          >
            Submit
          </Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OTP_EN;
