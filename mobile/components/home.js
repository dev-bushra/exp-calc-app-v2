import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import Header from "./components/header";
import ExItem from "./components/ExItem";
import AddEx from "./components/addEx";
import Login from "./components/Login";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [ex, setEx] = useState([
    { exName: "Coffee", price: "300", key: "1" },
    { exName: "Car", price: "300", key: "2" },
    { exName: "Tea", price: "300", key: "3" },
  ]);

  const pressHandler = (key) => {
    setEx((prevEx) => {
      return prevEx.filter((ex) => ex.key != key);
    });
  };

  const submitHandler = (exName, qte, price) => {
    if (exName.length > 3) {
      setExName("");
      setQte("");
      setPrice("");
      setEx((prevEx) => {
        return [
          { exName, qte, price, key: Math.random().toString() },
          ...prevEx,
        ];
      });
    } else {
      Alert.alert("OOPS", "must be over 3 characters long", [
        { exName: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  useEffect(() => {
    const localIpAddress = "192.168.1.214";
    const port = 4000;
    const apiUrl = `http://${localIpAddress}:${port}/api/expense`;
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        console.log("response:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddEx submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <ExItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
