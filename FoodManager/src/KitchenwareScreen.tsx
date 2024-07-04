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
import React, { useState, useEffect, useContext } from "react";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { ButtonPage } from "./Button";
import { ModalPage } from "./Modal";
import { RadioButton } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { db } from "../Firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { UserContext } from "./contexts/UserContext";

const KitchenwareScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [kitchenWareInventory, setKitchenWareInventory] = useState([]); //kitchenWareInventory = foodList
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [checked, setChecked] = useState("first");
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isAddFormValid, setIsAddFormValid] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const user = useContext(UserContext);
  const [user_email, setUserEmail] = useState("");

  const [kitchenWareItemName, setKitchenWareItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [addKitchenWareItemName, setAddKitchenWareItemName] = useState("");
  const [addQuantity, setAddQuantity] = useState("");
  // const [addInputDate, setAddInputDate] = useState(new Date());
  const [addErrors, setAddErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user && user.activeUser) {
      setUserEmail(user.activeUser.email);
    }
  }, [user]);

  useEffect(() => {
    setKitchenWareItemName(selectedItem ? selectedItem.name : "");
    setQuantity(selectedItem ? selectedItem.quantity : "");
  }, [selectedItem]);

  const handlePress = (newChecked) => {
    setChecked(newChecked);
    switch (newChecked) {
      case "first":
        const updatedList = kitchenWareInventory.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        setKitchenWareInventory(updatedList);
        break;
      case "second":
        const updatedList2 = kitchenWareInventory
          .sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          })
          .reverse();
        setKitchenWareInventory(updatedList2);
        break;
      case "third":
        const updatedList3 = kitchenWareInventory.sort(
          (a, b) => parseInt(a.quantity) - parseInt(b.quantity)
        );
        setKitchenWareInventory(updatedList3);
        break;
      case "fourth":
        const updatedList4 = kitchenWareInventory
          .sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity))
          .reverse();
        setKitchenWareInventory(updatedList4);
        break;
      default:
        break;
    }
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const searchFunction = (searchText?: string) => {
    const updatedList = kitchenWareInventory.filter((item) => {
      const item_data = `${item.name.toUpperCase()})`;
      const text_data = searchText.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchText(searchText);
    setKitchenWareInventory(updatedList);
  };

  useEffect(() => {
    let newErrors: { [key: string]: string } = {};

    let foundIndex = -1;
    if (selectedItem) {
      console.log("The selected item is: " + selectedItem);
      foundIndex = kitchenWareInventory.findIndex(
        (food) => food.id === selectedItem.id
      );
      console.log(
        "Within this if statement, the value of foundIndex is: " + foundIndex
      );
    }

    console.log("The index here is: " + foundIndex);

    const regex = /^[a-zA-Z]*$/;

    if (kitchenWareItemName.trim() === "") {
      newErrors.kitchenWareItemName = "The name of the food can't be empty!";
    } else if (!regex.test(kitchenWareItemName)) {
      newErrors.kitchenWareItemName = "The name of the food must be a string";
    }

    if (quantity.trim() === "") {
      newErrors.quantity = "Quantity cannot be blank!";
    } else if (!Number.isInteger(Number(quantity))) {
      newErrors.quantity = "Quantity must be a number";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [kitchenWareItemName, quantity, selectedItem]);

  useEffect(() => {
    let x = async () => {
      const result = await getDocs(
        collection(db, "users", user_email, "kitchenware_inventory")
      );
      let read_inventory = [];
      result.forEach((doc) => {
        let doc2 = doc.data();
        read_inventory.push(doc2);
      });
      setKitchenWareInventory(read_inventory);
      kitchenWareInventory.forEach((item) => {
        console.log(item.name);
      });
    };
    x();
  }, [user_email]);

  const handleSubmitEditItem = () => {
    //useEffect logic first -> editing input -> handleSubmit has the item.id from the render, thus never being passed in useEffect as an actual index or id value
    if (isFormValid) {
      setKitchenWareInventory(
        kitchenWareInventory.map((item) =>
          item.name === selectedItem.name
            ? { ...item, name: kitchenWareItemName, quantity: quantity }
            : item
        )
      );

      deleteDoc(
        doc(db, "users", user_email, "kitchenware_inventory", selectedItem.name)
      );
      setDoc(doc(db, "users", user_email, "kitchenware_inventory", kitchenWareItemName), {
        name: kitchenWareItemName,
        quantity: quantity,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      setKitchenWareItemName("");
      setQuantity("");
      setModalVisible(false);
    } else {
      alert("Form has errors. Please correct them.");
    }
  };

  useEffect(() => {
    let newErrors: { [key: string]: string } = {};

    const regex = /^[a-zA-Z]*$/;

    if (addKitchenWareItemName.trim() === "") {
      newErrors.kitchenWareItemName = "Kitchenware item can't be empty!";
    } else if (!regex.test(addKitchenWareItemName)) {
      newErrors.kitchenWareItemName = "Kitchenware item must be a string";
    }

    if (addQuantity.trim() === "") {
      newErrors.quantity = "Quantity cannot be blank!";
    } else if (!Number.isInteger(Number(addQuantity))) {
      newErrors.quantity = "Quantity must be a number";
    }

    setAddErrors(newErrors);
    setIsAddFormValid(Object.keys(newErrors).length === 0);
  }, [addKitchenWareItemName, addQuantity]);

  const handleSubmitAddItem = () => {
    if (isAddFormValid) {
      const newKitchenWareItem = {
        id: (kitchenWareInventory.length + 1).toString(),
        name: addKitchenWareItemName,
        quantity: addQuantity,
      };
      setKitchenWareInventory([...kitchenWareInventory, newKitchenWareItem]);
      setDoc(doc(db, "users", user_email, "kitchenware_inventory", addKitchenWareItemName),
        {
          name: addKitchenWareItemName,
          quantity: addQuantity,
        }
      )
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      setAddKitchenWareItemName("");
      setAddQuantity("");
      setAddModalVisible(false);
    } else {
      alert("Form has errors. Please correct them.");
    }
  };

  const deleteItem = (item_name) => {
    const updatedList = kitchenWareInventory.filter(
      (kitchenWareItem) => kitchenWareItem.name !== item_name
    );
    setKitchenWareInventory(updatedList);
    deleteDoc(doc(db, "users", user_email, "kitchenware_inventory", item_name));
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const editModalPopUpItem = (selectedItem) => {
    setSelectedItem(selectedItem);
    setKitchenWareItemName(kitchenWareItemName);
    setQuantity(quantity);
    setModalVisible(true);
  };

  const Item = ({ name, quantity }) => (
    <View>
      <Text style={styles.title}>{name}</Text>
      <Text> Quantity: {quantity} </Text>
    </View>
  );

  const addItemManually = () => {
    setAddModalVisible(true);
    setKitchenWareItemName(kitchenWareItemName);
    setQuantity(quantity);
    console.log("adding an item here");
  };

  const handleCancelAddItem = () => {
    setAddModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Item name={item.name} quantity={item.quantity} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 60,
        }}
      >
        <TouchableOpacity onPress={() => editModalPopUpItem(item)}>
          <Icon name="edit" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(item.name)}>
          <Icon name="trash" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ justifyContent: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 4 }}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={searchFunction}
            value={searchText}
            inputContainerStyle={{ width: "100%" }}
            onBlur={undefined}
            onFocus={undefined}
            platform={"default"}
            clearIcon={undefined}
            searchIcon={undefined}
            loadingProps={undefined}
            showLoading={false}
            onClear={undefined}
            onCancel={undefined}
            lightTheme={false}
            round={false}
            cancelButtonTitle={""}
            cancelButtonProps={undefined}
            showCancel={true}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="filter"
            size={50}
            color="black"
            onPress={toggleFilterModal}
          />
        </View>
      </View>
      <View style={styles.pop_up_container}>
        <View style={styles.separator} />
        <ModalPage isVisible={isFilterModalVisible}>
          <ModalPage.Container>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleFilterModal}
            >
              <Icon name="close" size={20} color="#333" />
            </TouchableOpacity>
            <View style={styles.modal}>
              <ModalPage.Header title="Sort by the following" />
              <ModalPage.Body>
                <RadioButton.Group onValueChange={handlePress} value={checked}>
                  <View style={styles.radioButton}>
                    <RadioButton value="first" color="#007BFF" />
                    <Text style={styles.radioLabel}>
                      Sort by name, ascending
                    </Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton value="second" color="#007BFF" />
                    <Text style={styles.radioLabel}>
                      Sort by name, descending
                    </Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton value="third" color="#007BFF" />
                    <Text style={styles.radioLabel}>
                      Sort by quantity, ascending
                    </Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton value="fourth" color="#007BFF" />
                    <Text style={styles.radioLabel}>
                      Sort by quantity, descending
                    </Text>
                  </View>
                </RadioButton.Group>
              </ModalPage.Body>
            </View>
          </ModalPage.Container>
        </ModalPage>
      </View>
      <FlatList
        data={kitchenWareInventory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={addItemManually}>
          <Text style={styles.customText}>Add Kitchenware Item</Text>
        </TouchableOpacity>
        <View style={styles.pop_up_container}>
          <View style={styles.separator} />
          <ModalPage isVisible={isAddModalVisible}>
            <ModalPage.Container>
              <View style={styles.modal}>
                <ModalPage.Header title="Add an item to the list" />
                <ModalPage.Body>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter name of kitchenware..."
                    value={addKitchenWareItemName}
                    onChangeText={setAddKitchenWareItemName}
                  />
                  {addErrors.kitchenWareItemName && (
                    <Text style={{ color: "red" }}>
                      {addErrors.kitchenWareItemName}
                    </Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Enter quantity..."
                    value={addQuantity}
                    onChangeText={setAddQuantity}
                    keyboardType="numeric"
                  />
                  {addErrors.quantity && (
                    <Text style={{ color: "red" }}>{addErrors.quantity}</Text>
                  )}
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
          </ModalPage>
        </View>
        <View style={styles.pop_up_container}>
          <View style={styles.separator} />
          <ModalPage isVisible={isModalVisible}>
            <ModalPage.Container>
              <View style={styles.modal}>
                <ModalPage.Header title="Edit the item in list" />
                <ModalPage.Body>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter name of food..."
                    value={kitchenWareItemName}
                    onChangeText={setKitchenWareItemName}
                  />
                  {errors.kitchenWareItemName && (
                    <Text style={{ color: "red" }}>
                      {errors.kitchenWareItemName}
                    </Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Enter quantity..."
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                  />
                  {errors.quantity && (
                    <Text style={{ color: "red" }}>{errors.quantity}</Text>
                  )}
                </ModalPage.Body>
                <ModalPage.Footer>
                  <View style={styles.button}>
                    <TouchableOpacity
                      style={[
                        styles.customButton,
                        { opacity: isFormValid ? 1 : 0.5 },
                      ]}
                      disabled={!isFormValid}
                      onPress={handleSubmitEditItem}
                    >
                      <Text style={styles.customText}>Submit</Text>
                    </TouchableOpacity>
                    <ButtonPage title="Cancel" onPress={handleCancel} />
                  </View>
                </ModalPage.Footer>
              </View>
            </ModalPage.Container>
          </ModalPage>
        </View>
      </View>
    </View>
  );
};

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

export { KitchenwareScreen };
