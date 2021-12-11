import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashEN from "./Components/Splash/Splash_EN";
import SplashFA from "./Components/Splash/Splash_FA";

import RegisterEN from "./Components/Register/Register_EN";
import RegisterFA from "./Components/Register/Register_FA";
import Apps from "./Components/Register/Register_EN";
import Login_EN from "./Components/Login/Login_EN";
import Login_FA from "./Components/Login/Login_FA";

import MainForm_EN from "./Components/MainForm/MainForm_EN";
import Transactions from "./Components/Transaction/Transactions";
import ChangePass_EN from "./Components/ChangePassword/ChangePass_EN";
import ChangePass_FA from "./Components/ChangePassword/ChangePass_FA";
import BranchesInfo from "./Components/Branchesinfo/BranchesInfo";
import OTP_EN from "./Components/Register/OTP/OTP_EN";
import OTP_Forgetpassword_EN from "./Components/ForgetPassword/OTP/OTP_EN";

import OTP_FA from "./Components/Register/OTP/OTP_FA";
import ForgetPassword_EN from "./Components/ForgetPassword/ForgetPassword_EN";
import AddPassword_EN from "./Components/Register/AddPassword/AddPassword_EN";
import AddPassword_ForgetPassword_EN from "./Components/ForgetPassword/ForgetPasswordChange/AddPassword_EN";
import MainForm_FA from "./Components/MainForm/MainForm_FA";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashEN" component={SplashEN} />
        <Stack.Screen name="SplashFA" component={SplashFA} />
        <Stack.Screen name="Login_EN" component={Login_EN} />
        <Stack.Screen name="Login_FA" component={Login_FA} />
        <Stack.Screen name="ChangePass_FA" component={ChangePass_FA} />
        <Stack.Screen name="ChangePass_EN" component={ChangePass_EN} />
        <Stack.Screen name="OTP_FA" component={OTP_FA} />
        <Stack.Screen name="OTP_EN" component={OTP_EN} />

        <Stack.Screen name="MainForm_EN" component={MainForm_EN} />
        <Stack.Screen name="MainForm_FA" component={MainForm_FA} />

        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="BranchesInfo" component={BranchesInfo} />
        <Stack.Screen name="RegisterEN" component={RegisterEN} />
        <Stack.Screen name="RegisterFA" component={RegisterFA} />
        <Stack.Screen name="ForgetPassword_EN" component={ForgetPassword_EN} />
        <Stack.Screen name="AddPassword_EN" component={AddPassword_EN} />
        <Stack.Screen
          name="AddPassword_ForgetPassword_EN"
          component={AddPassword_ForgetPassword_EN}
        />
        <Stack.Screen
          name="OTP_Forgetpassword_EN"
          component={OTP_Forgetpassword_EN}
        />

        <Stack.Screen name="Apps" component={Apps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
