import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "react-native-axios";
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
  Root,
  Toast,
  Text,
  Thumbnail,
  Radio,
  ListItem,
  Box,
  NativeBaseProvider,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
// import {Button } from 'native-base';
import md5 from "md5";
function AddPassword_EN(props, { navigation }) {
  var password = "";
  var confermpass = "";

  function Checkvalidation(param) {
    console.log(param);

    const NumbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const AlphaArrPersian = [
      "ض",
      "ص",
      "ث",
      "ق",
      "ف",
      "غ",
      "ع",
      "ه",
      "خ",
      "ح",
      "ج",
      "چ",
      "ش",
      "س",
      "ی",
      "ب",
      "ل",
      "ا",
      "ت",
      "ن",
      "م",
      "ک",
      "گ",
      "پ",
      "ظ",
      "ط",
      "ز",
      "ر",
      "ذ",
      "ذ",
      "د",
      "ئ",
      "و",
      "و",
      "پ",
    ];
    const AlphaArr = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    const CharArr = ["!", "@", "#", "%", "&"];

    var cuNumbers = 0;
    var cuPerisan = 0;
    var cuAlpha = 0;
    var cuChar = 0;
    var cuUpperAlpha = 0;
    console.log("Checkvalidation ->");
    for (let index = 0; index < param.length; index++) {
      for (let index1 = 0; index1 < NumbersArr.length; index1++) {
        if (NumbersArr[index1] == param[index]) {
          cuNumbers++;
          break;
        }
      }
      for (let index1 = 0; index1 < AlphaArrPersian.length; index1++) {
        if (NumbersArr[index1] == param[index]) {
          cuPerisan++;
          break;
        }
      }

      for (let index1 = 0; index1 < CharArr.length; index1++) {
        if (CharArr[index1] == param[index]) {
          cuChar++;
          break;
        }
      }

      for (let index1 = 0; index1 < AlphaArr.length; index1++) {
        if (AlphaArr[index1] == param[index]) {
          cuAlpha++;
          break;
        }
      }
      for (let index1 = 0; index1 < AlphaArr.length; index1++) {
        if (AlphaArr[index1].toUpperCase() == param[index]) {
          cuUpperAlpha++;
          break;
        }
      }
    }

    console.log(cuNumbers);
    console.log(cuAlpha);
    console.log(cuChar);
    console.log(cuPerisan);
    console.log(cuUpperAlpha);
    if (
      (cuNumbers != 0) &
      (cuAlpha != 0) &
      (cuUpperAlpha != 0) &
      (param.length >= 8)
    ) {
      return "OK";
    } else return "NOK";
  }
  function Go_Login() {
    try {
      console.log(password);
      console.log(Checkvalidation(password));
      console.log("send Account : " + props.route.params.ACCNO);
      if ((password == confermpass) & (Checkvalidation(password) == "OK")) {
        const myObj = {
          accountNumber: props.route.params.ACCNO,

          Password: md5(password),
          Passport: props.route.params.Passport,
          Mobile: props.route.params.BirthDay,
        };
        console.log(myObj);

        const myObj2 = {
          Mobile: props.route.params.BirthDay,
          Account: props.route.params.ACCNO.substring(0, 10),
          NationalCode: props.route.params.Passport,
          Password: md5(password),
          uniqID: md5(password),
          DeviceID: md5(password),
        };
        console.log("Send RegPassEn");
        console.log(
          "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/Register?" +
            JSON.stringify(myObj2)
        );

        axios
          .post(
            "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/Register?" +
              JSON.stringify(myObj2)
          )
          .then(function (response) {
            console.log("GetData is OK");
            console.log(response.data.body);

            if (response.data.body == "OK") {
              Toast.show({
                title: "your Account has Register successfully, please login ",
                backgroundColor: "#ff0000",
                textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
                duration: 3000,
              });

              Alert.alert(
                "Register Account",
                "your Account has Register successfully, please login ",
                [
                  {
                    text: "ok",
                    onPress: () => props.navigation.navigate("SplashEN"),
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              );
            } else if (response.data.body == "Duplicate") {
              Alert.alert(
                "Register Account",
                "your Account is  exists, please login  ",
                [
                  {
                    text: "ok",
                    onPress: () => props.navigation.navigate("AppEN"),
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              );
            } else {
              Toast.show({
                title: "رمز وارد شده اشتباه است  ",
                backgroundColor: "#ff0000",
                textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
                duration: 3000,
              });
              console.log("Change is ok ");
            }
            // this.state.Myprops.navigation.navigate('ChangePass', {});
          })
          .catch(function (error) {
            Toast.show({
              title: "Connection Time Out ",
              backgroundColor: "#ff0000",
              textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
              duration: 3000,
            });
          })
          .then(function () {
            // always executed
          });
      } else {
        if (Checkvalidation(password) != "OK") {
          Toast.show({
            title: "Failed, Checking password condition ",

            backgroundColor: "#ff0000",
            textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
            duration: 3000,
          });
        } else {
          Toast.show({
            title: "Confirm password is not match ",
            backgroundColor: "#ff0000",
            textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
            duration: 3000,
          });
        }
      }
    } catch (err) {
      Toast.show({
        title: "Connection Time Out ",
        backgroundColor: "#ff0000",
        textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
        duration: 3000,
      });
    }
  }
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Image
          source={require("../../img/images/logo.png")}
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
            fontSize: 25,
            marginTop: "3%",
            height: 40,
            backgroundColor: "#eb9c0e",
            width: "100%",

            textAlign: "center",
            textAlignVertical: "center",
            padding: 15,

            color: "#fff",
          }}
        >
          Insert New Password
        </Text>
        <Box style={{ marginTop: 50 }}>
          <Text style={{ fontFamily: "IRANSansMobile", fontSize: 16 }}>
            {"   "}
            New Password
          </Text>
          <Input
            w="100%"
            mx={0}
            secureTextEntry={true}
            style={{ fontSize: 18, marginTop: 10 }}
            placeholder=" Password"
            InputRightElement={
              <Icon as={<MaterialIcons name="lock" />} size="md" m={2} />
            }
            onChangeText={(text) => {
              password = text;
            }}
          />
        </Box>
        <Box style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: "IRANSansMobile", fontSize: 16 }}>
            {"   "}
            Confirm New password
          </Text>
          <Input
            w="100%"
            mx={0}
            secureTextEntry={true}
            style={{ fontSize: 18, marginTop: 10 }}
            placeholder=" Password"
            InputRightElement={
              <Icon as={<MaterialIcons name="lock" />} size="md" m={2} />
            }
            onChangeText={(text) => {
              confermpass = text;
            }}
          />
        </Box>
      </View>
      <View
        style={{
          marginTop: "10%",
          marginLeft: "3%",
          Family: "IRANSansMobile",
          fontSize: 20,
          color: "#eb9c0e",
          //  backgroundColor: '#eb9c0e',
        }}
      >
        <Text
          style={{
            marginTop: "1%",
            marginLeft: "3%",
            Family: "IRANSansMobile",
            fontSize: 20,
            color: "#eb9c0e",
            //  backgroundColor: '#eb9c0e',
          }}
        >
          Password are case sensitive and must contain:
        </Text>
        <Text
          style={{
            Family: "IRANSansMobile",
            marginLeft: "10%",
            marginTop: "2%",
            fontSize: 20,
            color: "#994442",
          }}
        >
          . At least 8 characters
        </Text>
        <Text
          style={{
            Family: "IRANSansMobile",
            color: "#994442",
            marginLeft: "10%",
            fontSize: 20,
          }}
        >
          . At least 1 upper case letter
        </Text>
        <Text
          style={{
            Family: "IRANSansMobile",
            color: "#994442",
            marginLeft: "10%",
            fontSize: 20,
          }}
        >
          . At least 1 lower case letter
        </Text>
        <Text
          style={{
            Family: "IRANSansMobile",
            color: "#994442",
            marginLeft: "10%",
            fontSize: 20,
          }}
        >
          . At least 1 number
        </Text>
      </View>

      <View style={{ bottom: 0 }}>
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

const styles = StyleSheet.create({
  container: {},
});

export default AddPassword_EN;
