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
  import React, { useState, useEffect} from "react";
  import { SearchBar, ListItem } from 'react-native-elements';
  import { Ionicons } from '@expo/vector-icons';
  import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";
import { ButtonPage } from "./Button";
import { ModalPage } from "./Modal";
import { RadioButton } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import { CustomRadioButton } from "./RadioButton";
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

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

    const [searchText, setSearchText] = useState("");
    const [foodInventory, setFoodInventory] = useState(foodList);
    const [isModalVisible, setModalVisible] = useState(false);
    const [expirationDate, setExpirationDate] = useState("");
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [checked, setChecked] = useState('first');
    const [errorMessage, setErrorMessage] = useState("");
    const [foodErrorMessage, setFoodErrorMessage] = useState("");
    const [date, setDate] = useState(new Date());
    const [option, setOption] = useState(null);
    const [inputDate, setInputDate] = useState(new Date());
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isFormValid, setIsFormValid] = useState(false); 
    const [item_id, setItem_id] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    
    const filterData = [
      { value: 'Sort by name, ascending' },
      { value: 'Sort by name, descending' },
      { value: 'Sort by quantity, ascending' },
      { value: 'Sort by quantity, descending' },
      { value: 'Sort by expiration date, ascending' },
      { value: 'Sort by expiration date, descending' },
    ];

    const handlePress = (newChecked) => {
      //setChecked(newChecked);
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
      setIsFilterModalVisible(!isFilterModalVisible);
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


    //these 3 functions are left blank in the mean time
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

    useEffect(() => {  
      let newErrors: { [key: string]: string } = {};

      const foundIndex = foodInventory.findIndex(food => food.id === item_id);

      const regex = /^[a-zA-Z]*$/;

      //let foodName = selectedItem?.name;
      //let quantity = selectedItem?.quantity;
      //let date = selectedItem?.date;

      if(foodName.trim() === "")
      {
        newErrors.foodName = "The name of the food can't be empty!";
      }
      else if(!regex.test(foodName))
      {
        newErrors.foodName = 'The name of the food must be a string';
      }

      if(quantity.trim() === "") {
        newErrors.quantity = "Quantity cannot be blank!";
      }
      else if(!Number.isInteger(Number(quantity))) {
        newErrors.quantity = "Quantity must be a number";
      }

      //const formattedFoodName = foodName.charAt(0).toUpperCase() + foodName.slice(1).toLowerCase();
      if (foodInventory[foundIndex]) {
        foodInventory[foundIndex].name = foodName.charAt(0).toUpperCase() + foodName.slice(1).toLowerCase();
        foodInventory[foundIndex].quantity = quantity;
        foodInventory[foundIndex].date = inputDate.toISOString().split('T')[0];
      }

      setFoodName("");
      setQuantity("")
      setInputDate(new Date());
      //setSelectedItem(null);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted');
      }
      
  }, [foodName, quantity, date]); 

    const handleSubmit = (item_id) => {
      setItem_id(item_id);

      if (isFormValid) { 
        alert('Form submitted successfully!'); 
    } else { 
        alert('Form has errors. Please correct them.'); 
    } 

      setModalVisible(false);
    };

    const deleteItem = (item_id) => {
      const updatedList = foodInventory.filter(foodItem => foodItem.id !== item_id);
      setFoodInventory(updatedList);
    };
  
    const handleCancel = () => {
      setModalVisible(false);
    };

    const openEditModal = (item) => {
      //setSelectedItem(item);
      setModalVisible(true);
    };

    const Item = ({ name, date, quantity }) => (
      <View>
        <Text style={styles.title}>
          {name}
        </Text>
        <Text> Quantity: {quantity} </Text>
        <Text> Expiration date: {date} </Text>
      </View>
    );

    const addItemManually = () => {
      console.log('adding an item here');
    };

    const renderItem = ({ item }) => (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Item name={item.name} quantity={item.quantity} date={item.date} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                      {errors.foodName && <Text style={{color: 'red'}}>{errors.foodName}</Text>}
                    <TextInput
                      style = {styles.input}
                      placeholder = "Enter quantity..."
                      value={quantity}
                      onChangeText={setQuantity}
                      keyboardType="numeric"
                    />
                    {errors.quantity && <Text style={{color: 'red'}}>{errors.quantity}</Text>}
                    {/*<TextInput
                      style = {styles.input}
                      placeholder = "Enter expiration date..."
                      value={expirationDate}
                      onChangeText={setExpirationDate}
                    />*/}
                  {/*}  <DatePicker date={date} onDateChange={setDate} /> */}
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                      <DatePickerInput
                        locale="en"
                        label="Expiration Date"
                        value={date}
                        onChange={setDate}
                        inputMode="start"
                        mode="outlined"
                      />
                  </View> 
                  </ModalPage.Body>
                  <ModalPage.Footer>
                    <View style={styles.button}> 
                 {/*}   <ButtonPage title="Cancel" onPress={() => handleSubmit(item.id)} /> */}
                      <TouchableOpacity 
                        style={[styles.customButton, { opacity: isFormValid ? 1 : 0.5 }]} 
                        disabled={!isFormValid} 
                        onPress={() => handleSubmit(item.id)} 
                      > 
                        <Text style={styles.customText}>Submit</Text> 
                      </TouchableOpacity>
                      <ButtonPage title="Cancel" onPress={handleCancel} />
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
              <View style={styles.separator} />
              <ModalPage isVisible={isFilterModalVisible}>
                <ModalPage.Container>
                  <TouchableOpacity style={styles.closeButton} onPress={toggleFilterModal}>
                    <Icon name="close" size={20} color="#333" />
                  </TouchableOpacity>
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
                        {/*<CustomRadioButton data={filterData} onSelect={(value) => handlePress(value)} /> */}
                    </ModalPage.Body>
                  </View>
                </ModalPage.Container>
              </ModalPage>
            </View>
            </View>
            <FlatList
              data={foodInventory}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />  

          <View style={styles.container}>
          {/*}  <TouchableOpacity style={styles.button} onPress={onPressedAddItem}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
    <Button title="Red Button" color="red" onPress={onPressedAddFromReceipt} /> */}
        <TouchableOpacity style={styles.addButton} onPress={addItemManually}>
          <Text style={styles.customText}>Add Food Item</Text>
        </TouchableOpacity>
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
    closeButton2: {
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
    closeButton: {
      alignSelf: "flex-end",
      marginRight: '2%',
      marginTop: '2%',
      backgroundColor: "#ccc",
      borderRadius: 20,
      width: '10%',
      height: '5%',
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
      backgroundColor: 'red',
      width: '70%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
   }
  });

  export { InventoryPage };