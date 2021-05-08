import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Prestadores from '../pages/Providers';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
   <App.Navigator
      screenOptions={{
         headerShown: false,
         cardStyle: { backgroundColor: '#F2F2F2' },
      }}
   >
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Prestador" component={Prestadores} />
   </App.Navigator>
);

export default AppRoutes;
