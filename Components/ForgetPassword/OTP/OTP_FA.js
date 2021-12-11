import React from "react";
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
function OTP_FA(props) {
  //var accountNumbers = props.route.params.Accno;
  var isFinisheDur = false;

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
          لطفا کد ارسالی وارد  نمایید
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
            this.state.OTPCode = txt.toUpperCase();
          }}
        ></Input>
        <CountDown
          until={300}
          size={30}
          onFinish={() => (isFinisheDur = true)}
          onPress={(until) => console.log(until)}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: "#1CC625" }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "دقیقه", s: "ثانیه" }}
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

              console.log(this.props.route.params.Accno);
              console.log(this.props.route.params.Passportcode);
              console.log(this.props.route.params.Accno);
              console.log(this.props.route.params.Birthday);

              const myObj = {
                Action: "CreateOTP",
                // Accno: this.props.route.params.Accno,

                Accno: this.props.route.params.Accno,
                Passportcode: this.props.route.params.Passportcode,
                Birthday: this.props.route.params.Birthday,
              };
              console.log("--------sss-----------");

              console.log("myObj:");
              console.log(myObj);
              const myObjStr = JSON.stringify(myObj);
              var Times = this.state.totalDuration;
              if (this.state.isFinisheDur == true) {
                if (this.state.ResendCount > 5) {
                  Toast.show({
                    title: "Your Account is Block",
                    backgroundColor: "#ff0000",
                    textStyle: {
                      fontFamily: "IRANSansMobile",
                      fontSize: 12,
                    },
                    duration: 3000,
                  });
                }
                this.state.ResendCount++;
                Times = Times + 1;
                this.setState({ totalDuration: Times });
                this.state.isFinisheDur = false;
                console.log(
                  "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/OTPService?" +
                    myObjStr
                );
                var State = this.state;
                var ms = this;

                var myProps = this.props;
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
                    State.OldOTPCODE = Log[0].req;
                    var myCode = Log[0].req;
                    ms.setState({ OldOTPCODE: myCode });
                    console.log(
                      "State.OldOTPCODE New OTP->: " + State.OldOTPCODE
                    );
                    console.log("Log[0].req: " + Log[0].req);
                    State.totalDuration = 90;

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
              } else {
                Toast.show({
                  title: "لطفا صبر کنید تا زمان به پایان برسد ",
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
             ارسال مجدد کد
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
              console.log(this.state.OldOTPCODE);
              const myObj = {
                Action: "GetOTP",
                Accno: this.props.route.params.Accno,
                OTPCode: this.state.OTPCode,
              };

              console.log("myObj:");
              console.log(myObj);
              const myObjStr = JSON.stringify(myObj);
              var myProps = this.props;
              var State = this.state;
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
                  console.log("State.OldOTPCODE-> : " + State.OldOTPCODE);
                  console.log("Log[0].req1: " + Log[0].req);
                  console.log(Log[0].req + " - " + State.OldOTPCODE);
                  if (State.isFinisheDur == true) {
                    Toast.show({
                      title: "کد وارد شده اشتباه است",
                      backgroundColor: "#ff0000",
                      textStyle: {
                        fontFamily: "IRANSansMobile",
                        fontSize: 12,
                      },
                      duration: 3000,
                    });
                  } else {
                    if (State.OTPCode == State.OldOTPCODE) {
                      console.log("Go Send");
                      const myObj = {
                        ACCNO: myProps.route.params.Accno.substring(0, 10),
                        Passport: myProps.route.params.Passportcode,
                        BirthDay: myProps.route.params.Birthday,
                      };
                      const myObjStr = JSON.stringify(myObj);
                      console.log("Send RegPassEn");
                      console.log(myObjStr);

                      myProps.navigation.navigate("RegChangePass", myObj);
                    } else {
                      Toast.show({
                        title: "کد وارد شده اشتباه است",
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
            ثبت
          </Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OTP_FA;
