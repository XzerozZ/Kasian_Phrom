import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

import TextF from './TextF';

interface headTitleProps {
    toggle: boolean;
    setToggle: (state: boolean) => void;
}

const headTitle: React.FC<headTitleProps> = ({ toggle, setToggle }) => {
    const animatedValue = useRef(new Animated.Value(toggle ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: toggle ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [toggle]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 26], // Adjust this value based on your requirement
    });

    return (
        <TouchableOpacity
            id='CheckBoxContainer'
            activeOpacity={1}
            style={toggle ? styles.container : styles.container_f}
            onPress={() => setToggle(!toggle)}
        >
            <Animated.View
                style={[toggle ? styles.circle : styles.circle_f , { transform: [{ translateX }] }]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 34,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: '#2A4296', // Replace with your primary color
        padding: 2,
        backgroundColor: '#FFECB6', // Replace with your secondary2 color
        justifyContent: 'center',
    },
    circle: {
        width: 26,
        height: 26,
        backgroundColor: '#2A4296', // Replace with your primary color
        borderRadius: 13,
    },
    container_f: {
        width: 60,
        height: 34,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: '#C9C9C9', // Replace with your primary color
        padding: 2,
        backgroundColor: '#FCFCFC', // Replace with your secondary2 color
        justifyContent: 'center',
    },
    circle_f: {
        width: 26,
        height: 26,
        backgroundColor: '#C9C9C9', // Replace with your primary color
        borderRadius: 13,
    },
});

export default headTitle;
