import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  HStack,
  Stack,
  Center,
  Heading,
  Image,
  List,
  NativeBaseProvider,
  FlatList,
  Thumbnail,
  Box,
  Spacer,
  VStack,
  Avatar,
  Toast,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "react-native-axios";
function Transactions(props) {
  function ExportPDF() {
    console.log("Starts ");
    console.log(props.route.params.LastBalance.toString());

    const myObj = {
      Accont: props.route.params.ACCNO,
      Token: props.route.params.Tokens,
      LastCount: props.route.params.LastBalance.toString(),
    };

    const myObjStr = JSON.stringify(myObj);

    console.log(
      "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/ExportPDF_Servlet?" +
        myObjStr
    );

    try {
      axios
        .get(
          "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/ExportPDF_Servlet?" +
            myObjStr
        )
        .then((response) => {
          // this.Download(response.data.body + '.xls');
          console.log(response.data.body);
          console.log(
            "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/csvFiles/" +
              response.data.body +
              ".pdf"
          );
          Linking.openURL(
            "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/csvFiles/" +
              response.data.body +
              ".pdf"
          );
        })
        .catch(function (error) {
          console.log("Exception object2");
        });
    } catch (error) {
      console.log("Exception object1");
      Toast.show({
        title: "There is no transaction ",
        type: "danger",
        textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
        duration: 3000,
      });
    }
  }
  function ExportExcel() {
    console.log("Starts ");
    console.log(props.route.params.LastBalance.toString());

    const myObj = {
      Accont: props.route.params.ACCNO,
      Token: props.route.params.Tokens,
      LastCount: props.route.params.LastBalance.toString(),
    };

    const myObjStr = JSON.stringify(myObj);

    console.log(
      "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/ExportPDF_Servlet?" +
        myObjStr
    );

    try {
      axios
        .get(
          "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/ExportPDF_Servlet?" +
            myObjStr
        )
        .then((response) => {
          // this.Download(response.data.body + '.xls');
          console.log(response.data.body);
          console.log(
            "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/csvFiles/" +
              response.data.body +
              ".xls"
          );
          Linking.openURL(
            "http://213.42.107.146:1372/MobilesBackEnd_war_exploded/csvFiles/" +
              response.data.body +
              ".xls"
          );
        })
        .catch(function (error) {
          console.log("Exception object2");
        });
    } catch (error) {
      console.log("Exception object1");
      Toast.show({
        title: "There is no transaction ",
        type: "danger",
        textStyle: { fontFamily: "IRANSansMobile", fontSize: 12 },
        duration: 3000,
      });
    }
  }
  function getSource(condition) {
    console.log(condition);
    if (condition == "deposit.png") {
      return require("../img/images/deposit.png");
    } else {
      return require("../img/images/import.png");
    }
  }
  return (
    <NativeBaseProvider>
      <Image
        source={require("../img/images/logo.png")}
        style={{
          height: 100,
          resizeMode: "stretch",
          alignContent: "center",
          width: "90%",
          marginTop: 30,
          marginLeft: 20,
        }}
      />
      <Stack space={3} alignItems="center">
        <HStack space={1} alignItems="center">
          <Center h="50px" w="100%" bg="primary.500" shadow={5}>
            <Text style={{ fontSize: 17 }}>
              IBAN: {props.route.params.IBAN}
            </Text>
          </Center>
        </HStack>
      </Stack>

      <FlatList
        data={props.route.params.myJSON}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Image
                size="50"
                source={getSource(item.img)}
                //   w="40px"
                //   h="45px"
              />
              <VStack>
                <Text
                  style={{
                    color: "" + item.color + "",
                    fontSize: 20,
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                  _dark={{
                    color: "warmGray.50",
                  }}
                  bold
                >
                  {item.AMOUNT}
                </Text>
                <Text
                  color="coolGray.600"
                  style={{ fontSize: "14", width: "100%" }}
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.SAPOD}
                </Text>
              </VStack>
              <Spacer />
              <Text
                color="coolGray.600"
                style={{ fontSize: "14", width: "58%" }}
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.DESC}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footericon} onPress={ExportPDF}>
          <FontAwesome5
            name="file-pdf"
            size={24}
            color="white"
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginBottom: 3,
              marginTop: 4,
            }}
          />
          <Text style={styles.btnText}>PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footericonR} onPress={ExportExcel}>
          <FontAwesome5
            name="file-excel"
            size={24}
            color="white"
            style={{
              justifyContent: "center",

              textAlign: "center",
              marginBottom: 3,
              marginTop: 4,
            }}
          />

          <Text style={styles.btnText}>EXCEL</Text>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
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
  },
  footer: {
    backgroundColor: "#04075d",
    height: "9%",
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
export default Transactions;
