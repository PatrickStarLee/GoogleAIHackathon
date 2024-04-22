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
  import React, { useState } from "react";
  import { SearchBar, ListItem } from 'react-native-elements';
  import { Ionicons } from '@expo/vector-icons';
  import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";
import { ButtonPage } from "./Button";
import { ModalPage } from "./Modal";
import { RadioButton } from "react-native-paper";


//implement rest of functionality in this page, e.g. search, filter etc
  const InventoryPage = () => {
    const foodList = [ 
      { 
        id: "1", 
        name: "Banana", 
        quantity: "23",
        date: "2024-02-23"
      }, 
      { 
        id: "2", 
        name: "Orange", 
        quantity: "12",
        date: "2024-01-01"
      }, 
      { 
        id: "3", 
        name: "Ice Cream",
        quantity: "5",
        date: "2024-03-15" 
      }, 
      { 
        id: "4", 
        name: "Spaghetti",
        quantity: "7",
        date: "2024-04-01"
      }, 
      { 
        id: "5", 
        name: "Pineapple", 
        quantity: "1",
        date: "2023-12-31"
      }, 

      
    ]; 

    const [searchText, setSearchText] = React.useState("");
    const [foodInventory, setFoodInventory] = React.useState(foodList);
    const [isModalVisible, setModalVisible] = useState(false);
    const [expirationDate, setExpirationDate] = useState("");
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [checked, setChecked] = useState('first');

    const handlePress = (newChecked) => {
      setChecked(newChecked);
      switch (newChecked) {
        case 'first':
          //Alert.alert('First button checked');
          const updatedList = foodInventory.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
          setFoodInventory(updatedList);
          break;
        case 'second':
          //Alert.alert('Second button checked');
            const updatedList2 = foodInventory.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          }).reverse();
          setFoodInventory(updatedList2);
          break;
        case 'third':
          //Alert.alert('Third button checked');
          const updatedList3 = foodInventory.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
          setFoodInventory(updatedList3);
          break;
        case 'fourth':
          //Alert.alert('First button checked');
          const updatedList4 = foodInventory.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity)).reverse();
          setFoodInventory(updatedList4);
          break;
        case 'fifth':
          //Alert.alert('Second button checked');
          const updatedList5 = foodInventory.sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()));
          setFoodInventory(updatedList5);
          break;
        case 'sixth':
          //Alert.alert('Third button checked');
          const updatedList6 = foodInventory.sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime())).reverse();
          setFoodInventory(updatedList6);
          break;
        default:
          break;
      }
    };

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const toggleFilterModal = () => {
      setIsFilterModalVisible(isFilterModalVisible);
    }

    const updateSearch = (searchText?: string) => {
      setSearchText(searchText);
    };

    const searchFunction = (searchText?: string) => {
      const updatedList = foodInventory.filter((item) => {
        const item_data = `${item.name.toUpperCase()})`; 
        const text_data = searchText.toUpperCase(); 
        return item_data.indexOf(text_data) > -1; 
      }); 
      setSearchText(searchText);
      setFoodInventory(updatedList);
    }

    const onFilterPress = () => {
      console.log('Filter button pressed');   
    };

    const onPressedAddItem= () => {
      console.log('add button pressed')
    };

    const onPressedAddFromReceipt = () => {
      console.log("an item was pressed from receipt");
        //open scanner page
      //open scanner
    };

    const editItem = (item_id) => {
      const foundIndex = foodInventory.findIndex(food => food.id === item_id);

      toggleModal();

      foodInventory[foundIndex].name = foodName;
      foodInventory[foundIndex].quantity = quantity;
      foodInventory[foundIndex].date = expirationDate;
    };

    const deleteItem = (item_id) => {
      const updatedList = foodInventory.filter(foodItem => foodItem.id !== item_id);
      setFoodInventory(updatedList);
    };

    const renderItem = ({ item }) => (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>{item.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
          <TouchableOpacity onPress={() => editItem(item.id)}>
            <Icon name="edit" size={20} color="#000" />
          </TouchableOpacity>
          <View style={styles.pop_up_container}>
            <View style={styles.separator} />
            <Modal isVisible={isModalVisible}>
              <ModalPage.Container>
                <View style = {styles.modal}>
                  <ModalPage.Header title="Edit the item in list"/>
                  <ModalPage.Body>
                    <TextInput
                      style = {styles.input}
                      placeholder = "Enter name of food..."
                      value={foodName}
                      onChangeText={setFoodName}
                      />
                    <TextInput
                      style = {styles.input}
                      placeholder = "Enter quantity..."
                      value={quantity}
                      onChangeText={setQuantity}
                    />
                    <TextInput
                      style = {styles.input}
                      placeholder = "Enter expiration date..."
                      value={expirationDate}
                      onChangeText={setExpirationDate}
                    />
                  </ModalPage.Body>
                  <ModalPage.Footer>
                    <View style = {styles.button}> 
                      <ButtonPage title="OK" onPress={toggleModal} />
                      <ButtonPage title="Cancel" onPress={toggleModal} />
                    </View>
                  </ModalPage.Footer>
                </View>
              </ModalPage.Container>
            </Modal>
          </View>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Icon name="trash" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );

    //make navigation component bottom bar in own file
    //move it in appdata.tsx

    return (
      
        <View style={{ flex: 1, justifyContent: "center" }}>
            <View style = {styles.container}>
              <SearchBar
                placeholder="Type Here..."
                onChangeText={searchFunction}
                value={searchText}
                 onBlur={undefined} onFocus={undefined} platform={"default"} clearIcon={undefined} searchIcon={undefined} loadingProps={undefined} showLoading={false} onClear={undefined} onCancel={undefined} lightTheme={false} round={false} cancelButtonTitle={""} cancelButtonProps={undefined} showCancel={true}              />
              <Ionicons name="filter" size={50} color="black" onPress={toggleFilterModal} containerFilter = {styles.filter} />
              <View style={styles.pop_up_container}>
                <TouchableOpacity onPress={toggleFilterModal}>
                  <Icon name="md-close" style={styles.closeButton} />
                </TouchableOpacity>
              <View style={styles.separator} />
              <Modal isVisible={isFilterModalVisible}>
                <ModalPage.Container>
                  <View style = {styles.modal}>
                    <ModalPage.Header title="Sort by the following"/>
                    <ModalPage.Body>
                      <RadioButton.Group onValueChange={handlePress} value={checked}>
                        <View style={styles.radioButton}> 
                          <RadioButton
                              value="first"
                              color="#007BFF"
                          /> 
                          <Text style={styles.radioLabel}> 
                              Sort by name, ascending 
                          </Text> 
                        </View> 
                        <View style={styles.radioButton}> 
                          <RadioButton
                              value="second"
                              color="#007BFF"
                          /> 
                          <Text style={styles.radioLabel}> 
                              Sort by name, descending 
                          </Text> 
                        </View> 
                        <View style={styles.radioButton}> 
                          <RadioButton
                              value="third"
                              color="#007BFF"
                          /> 
                          <Text style={styles.radioLabel}> 
                              Sort by quantity, ascending 
                          </Text> 
                        </View> 
                        <View style={styles.radioButton}> 
                          <RadioButton
                              value="fourth"
                              color="#007BFF"
                          /> 
                          <Text style={styles.radioLabel}> 
                              Sort by quantity, descending 
                          </Text> 
                        </View> 
                        <View style={styles.radioButton}> 
                          <RadioButton
                              value="fifth"
                              color="#007BFF"
                          /> 
                          <Text style={styles.radioLabel}> 
                              Sort by expiration date, ascending 
                          </Text> 
                        </View> 
                        <View style={styles.radioButton}> 
                          <RadioButton
                              value="sixth"
                              color="#007BFF"
                          /> 
                          <Text style={styles.radioLabel}> 
                              Sort by expiration date, descending 
                          </Text> 
                        </View> 
 
                      </RadioButton.Group>
                    </ModalPage.Body>
                  </View>
                </ModalPage.Container>
              </Modal>
            </View>
            </View>
            <FlatList
              data={foodInventory}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />  

          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressedAddItem}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <Button title="Red Button" color="red" onPress={onPressedAddFromReceipt} />
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      textAlign: "center",
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //alignItems: 'center',
      //padding: 10,
    },
    searchBar: {
      flex: 1,
      height: '50%',
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      paddingLeft: 10,
    },
    filter: {
      alignItems: 'center'
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
    closeButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    radioButton: { 
      flexDirection: 'row', 
      alignItems: 'center', 
    }, 
    radioLabel: { 
      marginLeft: 8, 
      fontSize: 16, 
      color: '#333', 
    }, 
  });

  export { InventoryPage };