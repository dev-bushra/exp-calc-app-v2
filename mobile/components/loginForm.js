import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TextInput,
    Button
} from "react-native";
import axios from "axios";

export default function Login() {
    [username, setUsername] = useState("");
    [password, setPassword] = useState("");

    const handleLogin = async() => {
        const requestData = {
            username: username,
            password: password,
        };
        const localIpAddress = "192.168.1.214";
        const port = 4000;
        const apiUrl = `http://${localIpAddress}:${port}/api/user/login`;
        axios
            .post(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
            .then((response) => {
                setData(response.data);
                console.log("login response:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching login data:", error);
            });
    }

    // const handleLogin = async () => {
    //     console.log("fffffff");
    // try {
    //     // Create a request object with the username and password
    //     const requestData = {
    //     username: username,
    //     password: password,
    //     };

    //     // Make a POST request to your endpoint
    //     const localIpAddress = "192.168.1.214";
    //     const port = 4000;
    //     const apiUrl = `http://${localIpAddress}:${port}/api/expense`;
    //     // const response = await fetch("/api/user/login", {
    //     const response = await fetch(
    //         `http://${localIpAddress}:${port}/api/user/login`,
    //         {
    //             method: "POST",
    //             headers: {
    //             "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(requestData),
    //         }
    //     );

    //     if (response.ok) {
    //     // Login was successful, handle the response here
    //         const responseData = await response.json();
    //         console.log("ddd", responseData);
    //     // You can perform actions like storing tokens, redirecting, etc.
    //     } else {
    //     // Handle login error here
    //     console.error("Login failed");
    //     }
    // } catch (error) {
    //     // Handle network or other errors
    //     console.error("An error occurred:", error);
    // }
    // };

    return (
        <View style={styles.container}>
            <Text> (UserName): {username} </Text>
            <Text> (Password):{password} </Text>
            <Text style={styles.title}>Login Page</Text>
            <TextInput
                placeholder="Username"
                onChangeText={(val) => {
                setUsername(val);
                }}
            />
            <TextInput
                placeholder="Password"
                onChangeText={(val) => {
                setPassword(val);
                }}
                secureTextEntry
            />
            <Button title="Login" color="lightblue" onPress={handleLogin}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
        input: {
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: "white",
    },
});