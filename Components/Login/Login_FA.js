import { NativeBaseProvider, Text, Box, Input, Icon, Toast } from "native-base";
import React from "react";
import axios from "react-native-axios";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Device from "expo-device";
import md5 from "blueimp-md5";

function Login_FA(props, { navigation }) {
  var UserName = "";
  var Password = "";
  var DeviceMacID = "";
  var Returnaxios = "";

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require("../img/images/Logins.png")}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "10%",
            borderColor: "#04075d",
          }}
        >
          <Box style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: "right",
                color: "white",
                textShadowColor: "black",
                textShadowRadius: 5,
                fontFamily: "IRANSansMobile",
              }}
            >
              {""}
               نام کاربری/ شماره حساب
              {"\n"}
            </Text>
            <Input
              w="100%"
              mx={0}
              style={{
                fontSize: 18,
                color: "white",
                fontFamily: "IRANSansMobile",
                textAlign: "center",
                textShadowColor: "rgba(255,255,255,0.3)",
                textShadowRadius: 5,
              }}
              placeholderTextColor="rgba(255,255,255,0.5)"
              placeholder="نام کاربری/ شماره حساب"
              keyboardType={"number-pad"}
              InputRightElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size="md"
                  m={2}
                  color="white"
                />
              }
              onChangeText={(text) => {
                UserName = text;
              }}
            />
          </Box>
          <Box style={{ marginTop: 10 }}>
            <Text
              style={{
                fontFamily: "IRANSansMobile",
                fontSize: 16,
                textAlign: "right",
                color: "white",
                textShadowColor: "black",
                textShadowRadius: 5,
              }}
            >
              {""}
              کلمه عبور
              {"\n"}
            </Text>
            <Input
              w="100%"
              mx={0}
              secureTextEntry={true}
              style={{
                fontSize: 18,
                color: "white",
                textShadowColor: "rgba(255,255,255,0.3)",
                textShadowRadius: 5,
                fontFamily: "IRANSansMobile",
                textAlign: "center",
              }}
              placeholderTextColor="rgba(255,255,255,0.5)"
              placeholder=" کلمه عبور"
              InputRightElement={
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size="md"
                  m={2}
                  color="white"
                />
              }
              onChangeText={(text) => {
                Password = text;
              }}
            />
          </Box>
          <TouchableOpacity
            style={{
              height: 60,
              width: "100%",
              marginTop: 30,
              alignContent: "center",
              alignSelf: "center",
              backgroundColor: "#eb9c0e",
            }}
            onPress={Go_Login}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: 20,
                height: "100%",
                fontFamily: "IRANSansMobile",

                color: "#FFF",
              }}
            >
              ورود
            </Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
      </ImageBackground>
    </NativeBaseProvider>
  );

  function SendToServer(Url, Parameters) {
    Parameters = JSON.stringify(Parameters);
    console.log(Url + Parameters);
    var Myreturn = "";
    axios
      .get(Url + Parameters)
      .then(function (response) {
        console.log(response.data.body);
        Returnaxios = response.data.body[0].Token;

        switch (response.data.body[0].Token) {
          case "AccountNotFound": {
            ShowMessage("#ff0000", "This account has not registered ");

            break;
          }
          case "LoginNotMatch": {
            ShowMessage("#ff0000", "User Or Password is not Match.");
            break;
          }
          case "Blocked": {
            ShowMessage("#ff0000", "Username has been blocked.");
            break;
          }
          default: {
            const FeatchAccinfo = {
              Accno: response.data.body[0].Accno,
              Token: response.data.body[0].Token,
            };
            const strFeatchAccinfo = JSON.stringify(FeatchAccinfo);
            var GetAccountListStr = "";
            const Login2 = response.data.body[0];
            console.log(strFeatchAccinfo);
            axios
              .get(
                "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/GetAccountList?" +
                  strFeatchAccinfo
              )
              .then(function (response) {
                console.log(response.data);
                GetAccountListStr = JSON.stringify(response.data);
                console.log(Login2.NameFamily);
                props.navigation.navigate("MainForm_FA", {
                  Username: Login2.Accno,
                  NameFmily: Login2.NameFamily,
                  Tokens: Login2.Token,
                  Accinfo: response.data,
                  Suffix: Login2.Suffix,
                  Suffix2: [
                    {
                      label: "101",
                      value: "key",
                    },
                  ],
                  LastLoginDateTime: Login2.LastLoginDateTime,
                  BranchCode: Login2.branchcode,
                  CustomerNumber: Login2.customernumber,
                  IBAN: Login2.iban,
                });
              })
              .catch(function (error) {
                console.log(error);
                Toast.show({
                  title: "Connection Time Out ",
                  backgroundColor: "#ff0000",

                  textStyle: { fontSize: 12 },
                  duration: 3000,
                });
              });
          }
        }
      })
      .catch(function (error) {
        Toast.show({
          title: "Connection Time Out ",
          backgroundColor: "#ff0000",

          textStyle: { fontSize: 12 },
          duration: 3000,
        });
      });
    return Returnaxios;
  }
  function Go_Login() {
    var devideID = Device.osBuildId;
    var osVersion = Device.osVersion;
    const PARAMETERS = {
      UserName: fixNumbers(UserName),
      Password: md5(fixNumbers(Password)),
      DeviceID: devideID + "-" + osVersion,
      uniqID: devideID,
    };

    var jj = SendToServer(
      "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/Login?",
      PARAMETERS
    );
  }
  function ShowMessage(Color, Titles) {
    Toast.show({
      title: Titles,
      backgroundColor: Color,

      textStyle: { fontSize: 12 },
      duration: 5000,
    });
  }
  function fixNumbers(str) {
    var persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ],
      arabicNumbers = [
        /0/g,
        /1/g,
        /2/g,
        /3/g,
        /4/g,
        /5/g,
        /6/g,
        /7/g,
        /8/g,
        /9/g,
      ];
    if (typeof str === "string") {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default Login_FA;
