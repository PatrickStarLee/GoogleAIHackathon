import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Option = {
    value: string;
    // Add other properties of an option here
  };

export type CustomRadioButtonProps = {
    data : Option[];
    onSelect : (value: string) => void;
};

export const CustomRadioButton = ({ data, onSelect }: CustomRadioButtonProps) => {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value: string) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View>
      {data.map((item) => {
        return (
          <Pressable
            style={
              item.value === userOption ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item.value)}>
            <Text style={styles.option}> {item.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
    option: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    },
    unselected: {
      backgroundColor: 'red',
      margin: 5,
    },
    selected: {
      backgroundColor: 'blue',
      margin: 6,
      padding: 10,
      borderRadius: 10,
    },
  });