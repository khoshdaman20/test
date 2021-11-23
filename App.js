import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashEN from "./Components/Splash/Splash_EN";
import SplashFA from "./Components/Splash/Splash_FA";

import RegisterEN from "./Components/Register/Register_EN";
import Apps from "./Components/Register/Register_EN";
import Login_EN from "./Components/Login/Login_EN";

import MainForm_EN from "./Components/MainForm/MainForm_EN";
import Transactions from "./Components/Transaction/Transactions";
import ChangePass_EN from "./Components/ChangePassword/ChangePass_EN";
import BranchesInfo from "./Components/Branchesinfo/BranchesInfo";
import OTP_EN from "./Components/Register/OTP/OTP_EN";
import ForgetPassword_EN from "./Components/Splash/ForgetPassword/ForgetPassword_EN";

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
        <Stack.Screen name="OTP_EN" component={OTP_EN} />
        <Stack.Screen name="SplashFA" component={SplashFA} />
        <Stack.Screen name="Login_EN" component={Login_EN} />
        <Stack.Screen name="MainForm_EN" component={MainForm_EN} />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="ChangePass_EN" component={ChangePass_EN} />
        <Stack.Screen name="BranchesInfo" component={BranchesInfo} />
        <Stack.Screen name="RegisterEN" component={RegisterEN} />
        <Stack.Screen name="ForgetPassword_EN" component={ForgetPassword_EN} />
        <Stack.Screen name="Apps" component={Apps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
