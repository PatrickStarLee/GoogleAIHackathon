import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { ModalPage } from "./Modal";
import { DatePickerInput } from "react-native-paper-dates";
import { ButtonPage } from "./Button";

const FoodModal = ({ isVisible, onCancel, onSubmit, selectedItem, title }) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inputDate, setInputDate] = useState(new Date());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setFoodName(selectedItem ? selectedItem.name : "");
    setQuantity(selectedItem ? selectedItem.quantity : "");
    setInputDate(selectedItem ? new Date(selectedItem.date) : new Date());
  }, [selectedItem])

  useEffect(() => {
    let newErrors: { [key: string]: string } = {};

    const regex = /^[a-zA-Z]*$/;

    if (foodName.trim() === "") {
      newErrors.foodName = "The name of the food can't be empty!";
    } else if (!regex.test(foodName)) {
      newErrors.foodName = "The name of the food must be a string";
    }

    if (quantity.trim() === "") {
      newErrors.quantity = "Quantity cannot be blank!";
    } else if (!Number.isInteger(Number(quantity))) {
      newErrors.quantity = "Quantity must be a number";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [foodName, quantity, inputDate]);

  const handleSubmit = () => {
    if (isFormValid) {
      const newItem = { name: foodName, quantity: quantity, date: inputDate.toISOString().split("T")[0] };
      onSubmit(newItem);
      setFoodName("");
      setQuantity("");
      setInputDate(new Date());
    } else {
      alert("Form has errors. Please correct them.");
    }
  };

  return (
    <ModalPage isVisible={isVisible}>
      <ModalPage.Container>
        <View style={styles.modal}>
          <ModalPage.Header title={title} />
          <ModalPage.Body>
            <TextInput
              style={styles.input}
              placeholder="Enter name of food..."
              value={foodName}
              onChangeText={setFoodName}
            />
            {errors.foodName && <Text style={{ color: "red" }}>{errors.foodName}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Enter quantity..."
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            {errors.quantity && <Text style={{ color: "red" }}>{errors.quantity}</Text>}
            <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
              <DatePickerInput
                locale="en"
                label="Expiration Date"
                value={inputDate}
                onChange={setInputDate}
                inputMode="start"
                mode="outlined"
              />
            </View>
          </ModalPage.Body>
          <ModalPage.Footer>
            <View style={styles.button}>
              <TouchableOpacity
                style={[styles.customButton, { opacity: isFormValid ? 1 : 0.5 }]}
                disabled={!isFormValid}
                onPress={handleSubmit}
              >
                <Text style={styles.customText}>Submit</Text>
              </TouchableOpacity>
              <ButtonPage title="Cancel" onPress={onCancel} />
            </View>
          </ModalPage.Footer>
        </View>
      </ModalPage.Container>
    </ModalPage>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingTop: 10,
    borderColor: "grey",
    borderBottomWidth: 2,
  },
  button: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  customButton: {
    backgroundColor: "blue",
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  customText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default FoodModal;
