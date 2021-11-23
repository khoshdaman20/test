import React from "react";
import { View, StyleSheet, Image } from "react-native";

function ForgetPassword_EN(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../img/logoVertical.png")}
        style={{
          height: 100,
          resizeMode: "stretch",
          alignContent: "center",
          width: 100,
          marginTop: "2%",
          alignItems: "center",
          justifyContent: "center",
          // marginRight: Dimensions.get('window').width - 180,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ForgetPassword_EN;
