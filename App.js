import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import store from './store/store';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { RegisterScreen } from './pages/RegisterScreen';
import { NewGroupScreen } from './pages/NewGroupScreen';
import { AuctionScreen } from './pages/AuctionScreen';
import { Transection } from './pages/Transection';
import { Report } from './pages/Report';

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function ErrorHandler() {
  return (
    <View role="alert">
      <Text>An error occurred:</Text>
      {/* <Text>{error.message}</Text> */}

    </View>
  )
}


export default function App() {
  return (
    // <ErrorBoundary FallbackComponent={ErrorHandler}>
    //   <NavigationContainer>
    //     <Tab.Navigator
    //       screenOptions={({ route }) => ({
    //         tabBarIcon: ({ color, size }) => {
    //           let iconName;

    //           if (route.name === 'Home') {
    //             iconName = 'home';
    //           } else if (route.name === 'Form') {
    //             iconName = 'assignment';
    //           } else if (route.name === 'New Group') {
    //             iconName = 'group';
    //           }

    //           return <MaterialIcons name={iconName} size={size} color={color} />;
    //         },
    //       })}
    //     >
    //       <Tab.Screen name="Home" component={MasterForm} />
    //       <Tab.Screen name="Form" component={Form2} />
    //       <Tab.Screen name='New Group' component={NewGroup} />
    //     </Tab.Navigator>
    //   </NavigationContainer>
    // </ErrorBoundary>

    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Dashboard} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Group" component={NewGroupScreen} />
          <Stack.Screen name="Auction" component={AuctionScreen} />
          <Stack.Screen name="Transection" component={Transection} />
          <Stack.Screen name="Report" component={Report} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <AuctionScreen/> */}
      </Provider>
      </ErrorBoundary>
    // <Transection2/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4fc'
  },


});
