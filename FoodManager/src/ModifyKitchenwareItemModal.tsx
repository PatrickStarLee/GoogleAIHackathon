import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { ModalPage } from './Modal';
import { ButtonPage } from './Button';
import { DatePickerInput } from 'react-native-paper-dates';

interface ModifyKitchenwareItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (item: { name: string; quantity: string; dateExpired: Date }) => void;
  initialItem?: { name: string; quantity: string };
}

const ModifyKitchenwareItemModal: React.FC<ModifyKitchenwareItemModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  initialItem = { name: '', quantity: '' },
}) => {
  const [kitchenWareItemName, setKitchenWareItemName] = useState(initialItem.name);
  const [quantity, setQuantity] = useState(initialItem.quantity);
  const [inputDate, setInputDate] = useState(new Date());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    let newErrors: { [key: string]: string } = {};
    const regex = /^[a-zA-Z]*$/;

    if (kitchenWareItemName.trim() === '') {
      newErrors.kitchenWareItemName = "The name of the kitchenware item can't be empty!";
    } else if (!regex.test(kitchenWareItemName)) {
      newErrors.kitchenWareItemName = 'The name of the kitchenware item must be a string';
    }

    if (quantity.trim() === '') {
      newErrors.quantity = 'Quantity cannot be blank!';
    } else if (!Number.isInteger(Number(quantity))) {
      newErrors.quantity = 'Quantity must be a number';
    }

    setErrors(newErrors);
  }, [kitchenWareItemName, quantity]);

  const handleSubmit = () => {
    if (Object.keys(errors).length === 0) {
      onSubmit({ name: kitchenWareItemName, quantity, dateExpired: inputDate });
      setKitchenWareItemName('');
      setQuantity('');
      onClose();
    } else {
      alert('Form has errors. Please correct them.');
    }
  };

  return (
    <ModalPage isVisible={isVisible}>
      <ModalPage.Container>
        <View style={styles.modal}>
          <ModalPage.Header title="Modify Kitchenware Item" />
          <ModalPage.Body>
            <TextInput
              style={styles.input}
              placeholder="Enter name of kitchenware item..."
              value={kitchenWareItemName}
              onChangeText={setKitchenWareItemName}
            />
            {errors.kitchenWareItemName && (
              <Text style={{ color: 'red' }}>{errors.kitchenWareItemName}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter quantity..."
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            {errors.quantity && (
              <Text style={{ color: 'red' }}>{errors.quantity}</Text>
            )}
            <View style={styles.datePicker}>
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
                style={[
                  styles.customButton,
                  { opacity: Object.keys(errors).length === 0 ? 1 : 0.5 },
                ]}
                disabled={Object.keys(errors).length !== 0}
                onPress={handleSubmit}
              >
                <Text style={styles.customText}>Submit</Text>
              </TouchableOpacity>
              <ButtonPage title="Cancel" onPress={onClose} />
            </View>
          </ModalPage.Footer>
        </View>
      </ModalPage.Container>
    </ModalPage>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingTop: 10,
    borderColor: 'grey',
    borderBottomWidth: 2,
    width: '80%',
    marginBottom: 20,
  },
  datePicker: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    flex: 1,
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
});

export { ModifyKitchenwareItemModal };
