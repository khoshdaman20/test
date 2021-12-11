import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Entypo } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import * as Font from "expo-font";
// import useFonts hook
import { useFonts } from "@use-expo/font";
import * as font from "expo-font";
font.loadAsync({
  IRANSansMobile: require("../../assets/fonts/IRANSansMobile.ttf"),
});
export default function SplashFA(props, { navigation }) {
  function Login() {}
  function Go_Login() {
    props.navigation.navigate("Login_FA");
  }
  function Go_Register() {
    props.navigation.navigate("RegisterFA");
  }
  function LoadEnglishPages() {
    console.log("Go To EN Pages");
    props.navigation.navigate("SplashEN");
  }
  function GOForgetPassword() {
    props.navigation.navigate("ForgetPassword_FA");
  }
  const [selected, setSelected] = React.useState(1);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: '#2626',
      }}
    >
      <ImageBackground
        source={require("../img/images/splash.png")}
        style={{
          flex: 1,
          width: "100%",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.buttonLogin} onPress={Go_Login}>
          <Text style={styles.btnText}>ورود</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={Go_Register}>
          <Text style={styles.btnText}>ثبت نام</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={GOForgetPassword}>
          <Text style={styles.btnText}>فراموشی کلمه عبور</Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#fdfdfd",
            fontFamily: "IRANSansMobile",
            fontSize: 15,
            marginTop: 20,
          }}
        >
          Address:AL MAKTOUM STREET, DEIRA, DUBAI P.O 4182;
        </Text>
        <Text
          style={{
            color: "#fdfdfd",

            fontSize: 15,
            marginTop: 20,
          }}
        >
          Tell:0097146035555
        </Text>
      </ImageBackground>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footericon} onPress={Go_Login}>
          <Ionicons
            name="md-language"
            size={32}
            color="white"
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginBottom: 1,
              marginTop: 4,
            }}
          />
          <Text style={styles.btnText}>فارسی</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footericonR} onPress={LoadEnglishPages}>
          <Ionicons
            name="md-language"
            size={32}
            color="white"
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginBottom: 1,
              marginTop: 4,
            }}
          />
          <Text style={styles.btnText}>English</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonLogin: {
    width: "85%",

    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 15,

    borderRadius: 50,
    marginTop: "40%",
  },

  buttonRegister: {
    width: "85%",

    backgroundColor: "#228B22",
    padding: 15,

    borderRadius: 50,
    marginTop: 20,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "IRANSansMobile",
  },
  footer: {
    backgroundColor: "#04075d",
    height: "10%",
    width: "100%",
    bottom: 0,
    flexDirection: "row",

    justifyContent: "space-evenly",
  },
  footericon: {
    width: "50%",
    height: "100%",
    marginLeft: "10%",
    textAlign: "center",
  },
  footericonR: {
    width: "50%",
    height: "100%",
    textAlign: "center",
    marginRight: "10%",
    // right: 0,
  },
  footerText: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    marginTop: 30,
    padding: 10,
    textAlign: "center",
  },
});
