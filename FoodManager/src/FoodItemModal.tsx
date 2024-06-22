import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Pressable,
    TouchableOpacity,
    Image,
    Button,
    FlatList,
    Alert,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { SearchBar } from "react-native-elements";
  import { Ionicons } from "@expo/vector-icons";
  import Icon from "react-native-vector-icons/FontAwesome";
  import { ButtonPage } from "./Button";
  import { ModalPage } from "./Modal";
  import { RadioButton } from "react-native-paper";
  import { DatePickerInput } from "react-native-paper-dates";
  import { db } from "../Firebase/config";
  import { doc, setDoc } from "firebase/firestore";

export interface FoodItem{
    foodName: string,
    foodQuantity: number,
    expirationDate: Date
}

type props = {
    modalVisible: boolean,
    item: FoodItem | null
}

const styles = StyleSheet.create({
    modal: {
      width: "100%",
      height: "90%",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonRectangle: {
      width: 200,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      textAlign: "center",
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      //alignItems: 'center',
      //padding: 10,
    },
    searchBar: {
      flex: 1,
      borderWidth: 0,
      marginRight: 10,
      paddingLeft: 10,
    },
    button: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    input: {
      paddingTop: 10,
      borderColor: "grey",
      borderBottomWidth: 2,
    },
    pop_up_container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    closeButton2: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    radioButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    radioLabel: {
      marginLeft: 8,
      fontSize: 16,
      color: "#333",
    },
    closeButton: {
      alignSelf: "flex-end",
      marginRight: "2%",
      marginTop: "2%",
      backgroundColor: "#ccc",
      borderRadius: 20,
      width: "10%",
      height: "5%",
      alignItems: "center",
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
    addButton: {
      flexDirection: "row",
      backgroundColor: "red",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

const FoodItemModal = (prop: props) => {
    const [addErrors, setAddErrors] = useState<{ [key: string]: string }>({});
    const [currentItem, setCurrentItem] = useState({
        foodName: prop.item.foodName,
        foodQuantity:  prop.item.foodQuantity,
        expirationDate: prop.item.expirationDate
    });
    const [foodInventory, setFoodInventory] = useState();
    const [isAddFormValid, setIsAddFormValid] = useState(false);
    function setAddFoodName(foodName: string){
        currentItem.foodName = foodName;
        setCurrentItem({... currentItem});
    }
    function setAddQuantity (foodQuantity: string){
        currentItem.foodQuantity = parseInt(foodQuantity);
        setCurrentItem({... currentItem});
    }
    function setAddInputDate(inputDate: Date){
        currentItem.expirationDate = inputDate;
        setCurrentItem({... currentItem});
    }

    const foodList = [
        {
          id: "1",
          name: "Banana",
          quantity: "23",
          date: "2024-02-23",
        },
        {
          id: "2",
          name: "Orange",
          quantity: "12",
          date: "2024-01-01",
        },
        {
          id: "3",
          name: "Ice Cream",
          quantity: "5",
          date: "2024-03-15",
        },
        {
          id: "4",
          name: "Spaghetti",
          quantity: "7",
          date: "2024-04-01",
        },
        {
          id: "5",
          name: "Pineapple",
          quantity: "1",
          date: "2023-12-31",
        },
      ];

    const handleSubmitAddItem = () => {
        if (isAddFormValid) {
          const newFoodItem = {id: foodInventory.length.toString(), name: addFoodName, quantity: addQuantity, date: addInputDate.toISOString().split("T")[0] };
          setFoodInventory([...foodInventory, newFoodItem ])
          setDoc(doc(db, "users", "foodTest"), {
            foodName: addFoodName,
            quantity: addQuantity,
            dateExpired: addInputDate,
          })
            .then(() => {
              console.log("data submitted");
            })
            .catch((error) => {
              console.log(error);
            });
    
          console.log("item added succesfully!");
          console.log();
          setAddFoodName("");
          setAddQuantity("");
          setAddInputDate(new Date());
          setAddModalVisible(false);
        } else {
          alert("Form has errors. Please correct them.");
        }
      };

    useEffect(() => {
        let newErrors: { [key: string]: string } = {};
    
        const regex = /^[a-zA-Z]*$/;
    
        if (currentItem.foodName.trim() === "") {
          newErrors.foodName = "The name of the food can't be empty!";
        } else if (!regex.test(currentItem.foodName)) {
          newErrors.foodName = "The name of the food must be a string";
        }
    
        if (currentItem.foodQuantity === 0) {
          newErrors.quantity = "Quantity cannot be blank!";
        } else if (!Number.isInteger(Number(currentItem.foodQuantity))) {
          newErrors.quantity = "Quantity must be a number";
        }
    
        setAddErrors(newErrors);
        setIsAddFormValid(Object.keys(newErrors).length === 0);
      }, [currentItem]);

    return (<ModalPage isVisible={prop.modalVisible}>
        <ModalPage.Container>
          <View style={styles.modal}>
            <ModalPage.Header title="Add an item to the list" />
            <ModalPage.Body>
              <TextInput
                style={styles.input}
                placeholder="Enter name of food..."
                value={prop.item.foodName || ""}
                onChangeText={setAddFoodName}
              />
              {addErrors.foodName && (
                <Text style={{ color: "red" }}>{addErrors.foodName}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Enter quantity..."
                value={prop.item.foodQuantity.toString() || "0"}
                onChangeText={setAddQuantity}
                keyboardType="numeric"
              />
              {addErrors.quantity && (
                <Text style={{ color: "red" }}>{addErrors.quantity}</Text>
              )}
              <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <DatePickerInput
                  locale="en"
                  label="Expiration Date"
                  value={prop.item.expirationDate}
                  onChange={setAddInputDate}
                  inputMode="start"
                  mode="outlined"
                />
              </View>
            </ModalPage.Body>
            <ModalPage.Footer>
              <View style={styles.button}>
                <TouchableOpacity
                  style={[
                    styles.customButton,
                    { opacity: isAddFormValid ? 1 : 0.5 },
                  ]}
                  disabled={!isAddFormValid}
                  onPress={handleSubmitAddItem}
                >
                  <Text style={styles.customText}>Submit</Text>
                </TouchableOpacity>
                <ButtonPage title="Cancel" onPress={handleCancelAddItem} />
              </View>
            </ModalPage.Footer>
          </View>
        </ModalPage.Container>
      </ModalPage>);
}