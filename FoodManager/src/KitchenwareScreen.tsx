import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { db } from '../Firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ModifyKitchenwareItemModal } from './ModifyKitchenwareItemModal';
import { ModalPage } from './Modal';


interface KitchenwareItem {
  id: string;
  name: string;
  quantity: string;
}

const KitchenwareScreen: React.FC = () => {
  const kitchenWareList: KitchenwareItem[] = [
    {
      id: '1',
      name: 'Ladle',
      quantity: '23',
    },
    {
      id: '2',
      name: 'Air fryer',
      quantity: '12',
    },
    {
      id: '3',
      name: 'Pasta Strainer',
      quantity: '5',
    },
    {
      id: '4',
      name: 'Spatula',
      quantity: '7',
    },
    {
      id: '5',
      name: 'Pan',
      quantity: '1',
    },
  ];

  const [searchText, setSearchText] = useState<string>('');
  const [kitchenWareInventory, setKitchenWareInventory] = useState<KitchenwareItem[]>(kitchenWareList);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<string>('first');
  const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<KitchenwareItem | null>(null);
  const [isModifyModalVisible, setIsModifyModalVisible] = useState<boolean>(false);

  const handlePress = (newChecked: string) => {
    setChecked(newChecked);
    let updatedList: KitchenwareItem[];
    switch (newChecked) {
      case 'first':
        updatedList = [...kitchenWareInventory].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'second':
        updatedList = [...kitchenWareInventory].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'third':
        updatedList = [...kitchenWareInventory].sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
        break;
      case 'fourth':
        updatedList = [...kitchenWareInventory].sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity));
        break;
      default:
        return;
    }
    setKitchenWareInventory(updatedList);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const searchFunction = (searchText: string) => {
    const updatedList = kitchenWareInventory.filter((item) => {
      const item_data = `${item.name.toUpperCase()}`;
      const text_data = searchText.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchText(searchText);
    setKitchenWareInventory(updatedList);
  };

  const handleSubmit = (newItem: { name: string; quantity: string; dateExpired: Date }) => {
    if (selectedItem) {
      setKitchenWareInventory(kitchenWareInventory.map(item => item.id === selectedItem.id ? { ...item, ...newItem } : item));
      setDoc(doc(db, 'users', 'foodTest'), {
        kitchenWareItemName: newItem.name,
        quantity: newItem.quantity,
        dateExpired: newItem.dateExpired,
      })
        .then(() => {
          console.log('data submitted');
        })
        .catch((error) => {
          console.log(error);
        });
      console.log('item edited successfully!');
      setIsModifyModalVisible(false);
    }
  };

  const handleSubmitAddItem = (newItem: { name: string; quantity: string; dateExpired: Date }) => {
    const newKitchenWareItem = { id: (kitchenWareInventory.length + 1).toString(), ...newItem };
    setKitchenWareInventory([...kitchenWareInventory, newKitchenWareItem]);
    setDoc(doc(db, 'users', 'foodTest'), {
      kitchenWareItemName: newItem.name,
      quantity: newItem.quantity,
      dateExpired: newItem.dateExpired,
    })
      .then(() => {
        console.log('data submitted');
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('item added successfully!');
    setAddModalVisible(false);
  };

  const deleteItem = (item_id: string) => {
    const updatedList = kitchenWareInventory.filter(
      (kitchenWareItem) => kitchenWareItem.id !== item_id
    );
    setKitchenWareInventory(updatedList);
  };

  const handleCancel = () => {
    setIsModifyModalVisible(false);
  };

  const editModalPopUpItem = (item: KitchenwareItem) => {
    setSelectedItem(item);
    setIsModifyModalVisible(true);
  };

  const Item: React.FC<{ name: string; quantity: string }> = ({ name, quantity }) => (
    <View>
      <Text style={styles.title}>{name}</Text>
      <Text> Quantity: {quantity} </Text>
    </View>
  );

  const addItemManually = () => {
    setAddModalVisible(true);
  };

  const renderItem = ({ item }: { item: KitchenwareItem }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
    >
      <Item name={item.name} quantity={item.quantity} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 60,
        }}
      >
        <TouchableOpacity onPress={() => editModalPopUpItem(item)}>
          <Icon name="edit" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <Icon name="trash" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 4 }}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={searchFunction}
            value={searchText}
            inputContainerStyle={{ width: '100%' }}
            onBlur={undefined}
            onFocus={undefined}
            platform={'default'}
            clearIcon={undefined}
            searchIcon={undefined}
            loadingProps={undefined}
            showLoading={false}
            onClear={undefined}
            onCancel={undefined}
            lightTheme={false}
            round={false}
            cancelButtonTitle={''}
            cancelButtonProps={undefined}
            showCancel={true}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <ModifyKitchenwareItemModal
          isVisible={isModifyModalVisible}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          initialItem={selectedItem || { name: '', quantity: '' }}
        />
        <ModifyKitchenwareItemModal
          isVisible={isAddModalVisible}
          onClose={() => setAddModalVisible(false)}
          onSubmit={handleSubmitAddItem}
          initialItem={{ name: '', quantity: '' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRectangle: {
    width: 200,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    borderWidth: 0,
    marginRight: 10,
    paddingLeft: 10,
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    paddingTop: 10,
    borderColor: 'grey',
    borderBottomWidth: 2,
  },
  pop_up_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
    alignSelf: 'flex-end',
    marginRight: '2%',
    marginTop: '2%',
    backgroundColor: '#ccc',
    borderRadius: 20,
    width: '10%',
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButton: {
    backgroundColor: 'blue',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  customText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { KitchenwareScreen };
