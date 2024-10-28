import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanScreen from './screens/ScanScreen';
// Intro Slides Data
const slides = [
  {
    key: 1,
    image: require('./assets/splash_image.png'),
    title: 'Scan, Pay & Enjoy!',
    text: 'scan products you want to buy at your favorite store and pay by your phone & enjoy happy, friendly Shopping!',
    backgroundColor: '#ffe6f2',
  },
];

// Home Screen Component
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello 👋</Text>
      <Text style={styles.userName}>Thuy Huong Do</Text>
      <Text style={styles.insightsTitle}>Your Insights</Text>
      <View style={styles.insightsContainer}>
        {insights.map((insight, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(insight.navigate)}
          >
            <Icon name={insight.icon} size={50} color={insight.color} />
            <Text style={styles.cardTitle}>{insight.title}</Text>
            <Text style={styles.cardSubtitle}>{insight.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.exploreMore}>Explore More</Text>
    </View>
  );
};

// Insights Data
const insights = [
  {
    title: 'Scan New',
    subtitle: 'Scanned 483',
    icon: 'scan-outline',
    color: 'purple',
    navigate: 'Scan',
  },
  {
    title: 'Counterfeits',
    subtitle: 'Counterfeited 32',
    icon: 'alert-circle',
    color: 'orange',
    navigate: 'Notify',
  },
  {
    title: 'Success',
    subtitle: 'Checkouts 8',
    icon: 'checkmark-circle',
    color: 'green',
    navigate: 'HomeStack',
  },
  {
    title: 'Directory',
    subtitle: 'History 26',
    icon: 'clipboard',
    color: 'blue',
    navigate: 'HomeStack', 
  },
  {
    title: 'Notify',
    subtitle: 'Check Notifications',
    icon: 'notifications',
    color: 'orange',
    navigate: 'Notify',
  },
  {
    title: 'Settings',
    subtitle: 'Configure App',
    icon: 'settings',
    color: 'blue',
    navigate: 'Settings',
  },
];

const NotifyScreen = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text>Notify Screen!</Text>
    </View>
  );
};


const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text>Settings Screen!</Text>
    </View>
  );
};


const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: true }}>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('User Profile')}>
              <Image source={require('./assets/avarta.jpg')} style={styles.userAvatar} />
            </TouchableOpacity>
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};


const Tab = createBottomTabNavigator();

const App = () => {
  const [showRealApp, setShowRealApp] = React.useState(false);

  const _onDone = () => {
    setShowRealApp(true);
  };

  const _renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Image source={item.image} style={styles.splashImage} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _renderDoneButton = () => (
    <View style={styles.buttonCircle}>
      <Icon name="checkmark" color="rgba(255, 255, 255, .9)" size={24} />
    </View>
  );

  const _renderNextButton = () => (
    <View style={styles.buttonCircle}>
      <Icon name="arrow-forward" color="rgba(255, 255, 255, .9)" size={24} />
    </View>
  );

  if (showRealApp) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Home':
                  iconName = 'home';
                  break;
                case 'Notify':
                  iconName = 'notifications';
                  break;
                case 'Settings':
                  iconName = focused
                    ? require('./assets/setting_orange.png')
                    : require('./assets/settings.png');
                  return <Image style={styles.image} source={iconName} />;
                case 'Scan':
                  iconName = 'scan-outline';
                  break;
                default:
                  iconName = 'home';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Scan" component={ScanScreen} />
          <Tab.Screen name="Notify" component={NotifyScreen} options={{ tabBarBadge: 3 }} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        onDone={_onDone}
      />
    );
  }
};

// Styles
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    color: 'gray',
  },
  insightsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
  exploreMore: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  splashImage:{
    width: 300,
    height: 300,
    borderRadius: 500, 
    marginTop: -200,  
    marginBottom: 50,   
  }

});

// Export App Component
export default App;