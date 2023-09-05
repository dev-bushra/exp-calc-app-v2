import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function AddEx({ submitHandler }) {
  [exName, setExName] = useState('');
  [qte, setQte] = useState('');
  [price, setPrice] = useState('');
  const dataToSend = {
    title: "ggg",
    price: 54,
    quantity: 30,
  };

  const changeHandler = (val) => {
    setExName(val);
  };

  // POST Request
  const addExToEndPoint = () => {
    const localIpAddress = "192.168.1.214";
    const port = 4000;
    const apiUrl = `http://${localIpAddress}:${port}/api/expense`;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(dataToSend), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        // Handle the response data here
        console.log("Response data:", responseData);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }

  return (
    <View>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.PriceInput}
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={(val) => {
            const numericValue = val.replace(/[^0-9]/g, "");
            setPrice(numericValue);
          }}
          value={price}
        />
        <TextInput
          style={styles.qteInput}
          placeholder="Qte"
          keyboardType="numeric" 
          onChangeText={(val) => {
            const numericValue = val.replace(/[^0-9]/g, "");
            setQte(numericValue);
          }}
          value={qte}
        />
        <TextInput
          style={styles.nameInput}
          placeholder="Name"
          onChangeText={(val) => {
            setExName(val);
          }}
          value={exName}
        />
      </View>
      <Button color="lightblue" onPress={addExToEndPoint} title="Add Expense" />
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
  },
  nameInput: {
    width: "55%",
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  PriceInput: {
    width: "20%",
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  qteInput: {
    width: "10%",
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});