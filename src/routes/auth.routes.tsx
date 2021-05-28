import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';
import SendMail from '../pages/SendEmail';
import Forgot from '../pages/Forgot';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
   <Auth.Navigator
      screenOptions={{
         headerShown: false,
         cardStyle: { backgroundColor: '#F2F2F2' },
      }}
   >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="Send" component={SendMail} />
      <Auth.Screen name="Forgot" component={Forgot} />
   </Auth.Navigator>
);

export default AuthRoutes;
