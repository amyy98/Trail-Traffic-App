import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
import MapView, { PROVIDER_GOOGLE, Heatmap, Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";

function MapPage() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.197:5001/api/getData")
      .then((res) => res.json())
      .then((res) => setTrails(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 34.052235,
          longitude: -118.243683,
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121,
        }}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
      >
        {trails.map((marker, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Test Hello</Text>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
            </Marker>
        ))}
        <Heatmap
          points={trails}
          radius={50}
          gradient={{
            colors: ["#0DE5FF", "#0D14FF", "#980DFF", "#FF0DED", "#E50000"],
            startPoints: [0.01, 0.25, 0.5, 0.75, 1],
            colorMapSize: 256,
          }}
        />
      </MapView>
    </View>
  );
}

function Splash({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("./assets/logo.png")} />
      {/* <Text>Splash page</Text> */}
      <Icon.Button name="facebook" backgroundColor="#3b5998">
        Login with Facebook
      </Icon.Button>
    </View>
  );
}

function Favorites({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Favorites go here!</Text>
      <Button title="Back to Map" onPress={() => navigation.navigate("Map")} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={Splash}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-heart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  map: {
    flex: 1,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
});
