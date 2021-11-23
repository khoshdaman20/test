import React from "react";
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
  Text,
  Toast,
  Thumbnail,
  Radio,
  ListItem,
  View,
  Picker,
  CheckBox,
  NativeBaseProvider,
  Box,
  HStack,
  Checkbox,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { Component } from "react";
import { marginTop } from "styled-system";
export default class Apps extends Component {
  // export default function Apps() {
  constructor(props, { navigation }) {
    super(props);
    this.state = {
      selected2: undefined,
      selectedLang: "0",
    };
    username = "";
    password = "";
    Emarat = "false";

    nationalCode = "";
    accountNumbers = "";
    mobileNumbers = "";
    this.state = {
      Myprops: props,
    };
  }
  Go_Login() {}
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
              placeholder="009715*111111"
              InputRightElement={
                <Icon as={<MaterialIcons name="phone" />} size="md" m={2} />
              }
            />
          </Box>
        </View>
        <View style={{ bottom: 0 }}>
          <CheckBoxOK />
          <TouchableOpacity
            style={{
              height: 60,
              width: "100%",
              marginTop: 10,
              alignContent: "center",
              alignSelf: "center",
              backgroundColor: "#eb9c0e",
            }}
            onPress={this.Go_Login()}
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
      <Checkbox isInvalid value="invalid" style={{ marginLeft: 2 }}>
        Terms and condition
      </Checkbox>
    </HStack>
  );
};
