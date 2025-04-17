import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import InterestScreen from './screens/InterestScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import MembersScreen from './screens/MembersScreen';
import MPProfileScreen from './screens/MPProfileScreen';
import SessionsScreen from './screens/SessionsScreen';
import NetworkScreen from './screens/NetworkScreen';

// Create Navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
const MembersStack = createNativeStackNavigator();

// Header with logo and dropdown
const Header = ({ selectedGov, setSelectedGov }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Bundestag', value: 'bundestag' },
    { label: 'Landtag', value: 'landtag' },
    { label: 'München', value: 'muenchen' },
  ]);

  return (
    <View style={styles.header}>
      <Image source={require('./assets/1.png')} style={styles.logo} />
      <View style={styles.dropdownWrapper}>
        <DropDownPicker
          open={open}
          value={selectedGov}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedGov}
          setItems={setItems}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={{ fontSize: 14 }}
          arrowIconStyle={{ tintColor: 'gray' }}
          containerStyle={{ zIndex: 9999 }}
        />
      </View>
    </View>
  );
};

// Stack Navigator for Home
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="InterestScreen" component={InterestScreen} />
    </HomeStack.Navigator>
  );
}

// Stack Navigator for Members
function MembersStackNavigator() {
  return (
    <MembersStack.Navigator screenOptions={{ headerShown: false }}>
      <MembersStack.Screen name="Members" component={MembersScreen} />
      <MembersStack.Screen name="Profile" component={MPProfileScreen} />
    </MembersStack.Navigator>
  );
}

// Tab Navigator
const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home-outline'; break;
          case 'Sitzungen':
            iconName = 'calendar-outline'; break;
          case 'Updates':
            iconName = 'alert-circle-outline'; break;
          case 'Abgeordnete':
            iconName = 'people-outline'; break;
          case 'Organigram':
            iconName = 'analytics-outline'; break;
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Sitzungen" component={SessionsScreen} />
    <Tab.Screen name="Updates" component={NotificationsScreen} />
    <Tab.Screen name="Abgeordnete" component={MembersStackNavigator} />
    <Tab.Screen name="Organigram" component={NetworkScreen} />
  </Tab.Navigator>
);

// Main App
export default function App() {
  const [selectedGov, setSelectedGov] = useState('bundestag');

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          header: () => (
            <Header selectedGov={selectedGov} setSelectedGov={setSelectedGov} />
          ),
        }}
      >
        <Drawer.Screen name="Home">
          {() => <HomeTabNavigator />}
        </Drawer.Screen>
        <Drawer.Screen name="Sitzungen" component={SessionsScreen} />
        <Drawer.Screen name="Updates" component={NotificationsScreen} />
        <Drawer.Screen name="Abgeordnete">
          {() => <MembersStackNavigator />}
        </Drawer.Screen>
        <Drawer.Screen name="Organigram" component={NetworkScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  dropdownWrapper: {
    width: 130,
    zIndex: 9999,
  },
  dropdown: {
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    height: 36,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 2,
  },
});
