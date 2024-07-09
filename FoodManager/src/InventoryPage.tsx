import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { ModalPage } from "./Modal";
import { RadioButton } from "react-native-paper";
import { db } from "../Firebase/config";
import { collection, deleteDoc, doc, getDoc, getDocs, getDocsFromServer, setDoc } from "firebase/firestore";
import { UserContext} from "./contexts/UserContext";
import FoodModal from "./FoodModal";

const InventoryPage = () => {
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

  const [searchText, setSearchText] = useState("");
  const [foodInventory, setFoodInventory] = useState([]); //foodInventory = foodList
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [checked, setChecked] = useState("first");
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const user = useContext(UserContext);
  const [user_email, setUserEmail] = useState("");

  useEffect(() => {
    if (user && user.activeUser) {
      setUserEmail(user.activeUser.email);
    }
  }, [user]);

  const handlePress = (newChecked) => {
    setChecked(newChecked);
    switch (newChecked) {
      case "first":
        const updatedList = foodInventory.sort((a, b) => {
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
        setFoodInventory(updatedList);
        break;
      case "second":
        const updatedList2 = foodInventory
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
        setFoodInventory(updatedList2);
        break;
      case "third":
        const updatedList3 = foodInventory.sort(
          (a, b) => parseInt(a.quantity) - parseInt(b.quantity)
        );
        setFoodInventory(updatedList3);
        break;
      case "fourth":
        const updatedList4 = foodInventory
          .sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity))
          .reverse();
        setFoodInventory(updatedList4);
        break;
      case "fifth":
        const updatedList5 = foodInventory.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setFoodInventory(updatedList5);
        break;
      case "sixth":
        const updatedList6 = foodInventory
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .reverse();
        setFoodInventory(updatedList6);
        break;
      default:
        break;
    }
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const searchFunction = (searchText) => {
    const updatedList = foodInventory.filter((item) => {
      const item_data = `${item.name.toUpperCase()})`;
      const text_data = searchText.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchText(searchText);
    setFoodInventory(updatedList);
  };

  //Pull the food inventory from firebase and display it
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        if(!user_email){
          return;
        }
        const userDocRef = doc(db, "users", user_email); // Reference to the user document
        const inventoryCollectionRef = collection(userDocRef, "food_inventory"); // Reference to the food_inventory subcollection
  
        const result = await getDocs(inventoryCollectionRef);
        let read_inventory = [];
        result.forEach((doc) => {
          let docData = doc.data();
          read_inventory.push(docData);
        });
  
        setFoodInventory(read_inventory);
      } catch (error) {
        console.error("Error fetching inventory: ", error);
      }
    };
  
    fetchInventory();
  }, [user_email]);

  const handleSubmitEditItem = (newItem) => {
    setFoodInventory(
      foodInventory.map((item) =>
        item.name === selectedItem.name
          ? { ...item, ...newItem, date: newItem.date }
          : item
      )
    );
    deleteDoc(doc(db, "users", user_email, "food_inventory", selectedItem.name));
    setDoc(doc(db, "users", user_email,"food_inventory",newItem.name), newItem)
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error);
      });
    setModalVisible(false);
  };

  const handleSubmitAddItem = (newItem) => {
    const newFoodItem = {
      id: (foodInventory.length + 1).toString(),
      ...newItem,
    };
    setFoodInventory([...foodInventory, newFoodItem]);
    setDoc(doc(db, "users", user_email, "food_inventory", newItem.name), newItem)
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error);
      });
    setAddModalVisible(false);
  };

  const deleteItem = (item_name) => {
    const updatedList = foodInventory.filter(
      (foodItem) => foodItem.name !== item_name
    );
    setFoodInventory(updatedList);
    deleteDoc(doc(db, "users", user_email, "food_inventory", item_name));
  };

  const editModalPopUpItem = (selectedItem) => {
    setSelectedItem(selectedItem);
    setModalVisible(true);
  };

  const Item = ({ name, date, quantity }) => (
    <View>
      <Text style={styles.title}>{name}</Text>
      <Text> Quantity: {quantity} </Text>
      <Text> Expiration date: {date} </Text>
    </View>
  );

  const addItemManually = () => {
    setAddModalVisible(true);
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
      <Item name={item.name} quantity={item.quantity} date={item.date} />
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
            onChange={searchFunction}
            value={searchText}
            inputContainerStyle={{ width: "100%" }}
            platform={"default"}
            showCancel={true} onBlur={undefined} onChangeText={undefined} onFocus={undefined} clearIcon={undefined} searchIcon={undefined} loadingProps={undefined} showLoading={false} onClear={undefined} onCancel={undefined} lightTheme={false} round={false} cancelButtonTitle={""} cancelButtonProps={undefined}          />
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
                  <View style={styles.radioButton}>
                    <RadioButton value="fifth" color="#007BFF" />
                    <Text style={styles.radioLabel}>
                      Sort by expiration date, ascending
                    </Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton value="sixth" color="#007BFF" />
                    <Text style={styles.radioLabel}>
                      Sort by expiration date, descending
                    </Text>
                  </View>
                </RadioButton.Group>
              </ModalPage.Body>
            </View>
          </ModalPage.Container>
        </ModalPage>
      </View>
      <FlatList
        data={foodInventory}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />

      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={addItemManually}>
          <Text style={styles.customText}>Add Food Item</Text>
        </TouchableOpacity>
        <FoodModal
          isVisible={isAddModalVisible}
          onCancel={() => setAddModalVisible(false)}
          onSubmit={handleSubmitAddItem}
          selectedItem={null}
          title="Add an item to the list"
        />
        <FoodModal
          isVisible={isModalVisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleSubmitEditItem}
          selectedItem={selectedItem}
          title="Edit the item in list"
        />
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
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
});

export { InventoryPage };
