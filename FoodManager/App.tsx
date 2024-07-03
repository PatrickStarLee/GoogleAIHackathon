import { StatusBar } from 'expo-status-bar';
//import { AddData } from './src/addData';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  Button,
  FlatList
} from "react-native";
import React, { useState } from "react";
import { SearchBar, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginPage } from './src/Pages/LoginPage';
import { UserContext } from './src/contexts/UserContext';
import { FindRecipesPage } from './src/FindRecipesPage';
import { CreateAndEditRecipes } from './src/CreateAndEditRecipes';
import { CompareRecipes } from './src/CompareRecipes';
import { TabNavigation } from './src/TabNavigation';

export default function App() {
  const [activeUser, setActiveUser] = useState(null);

  const Stack = createNativeStackNavigator();

  const getTabBarLabel = (route) => {
    
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'CreateAndEditRecipes':
        return 'Create And Edit Recipes';
      case 'CompareRecipes':
        return 'Compare Recipes';
      case 'FindRecipesPage':
        return 'Find Recipes';
    }
  };

  let context_val = {"activeUser": activeUser, "setActiveUser":setActiveUser};

  return (
    <UserContext.Provider value={context_val}>
      <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginPage'> 
          <Stack.Screen 
            name="HomeScreen" 
            component={TabNavigation} 
            options={({ route }) => ({
              headerTitle: getTabBarLabel(route)
            })}
          />
          <Stack.Screen name="CreateAndEditRecipes" component={CreateAndEditRecipes} />
          <Stack.Screen name="CompareRecipes" component={CompareRecipes} />
          <Stack.Screen name="FindRecipesPage" component={FindRecipesPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width
  },
});
