import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native';
import { Response } from './index';

export const Container = styled(LinearGradient)`
   flex: 1;
`;

export const Header = styled.View`
   width: 105%;

   align-self: center;
   margin-top: -25px;
`;

export const Linear = styled(LinearGradient)`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   border-radius: 60px;

   height: 121px;
   overflow: hidden;
   padding: 37.6px 30px;
`;

export const BackButton = styled.TouchableOpacity``;

export const HomeContainer = styled.TouchableOpacity`
   margin-left: 8%;
`;

export const HeaderTitle = styled.Text`
   color: #f3f3f3;
   font-size: 24px;
   margin-left: 12%;
`;

export const Title = styled.Text`
   align-items: center;
   align-self: center;
   margin-top: 50px;

   font-size: 26px;
`;

export const ServiceContainer = styled(
   FlatList as new () => FlatList<Response>,
)`
   padding: 25px;
`;

export const BoxContainer = styled(RectButton)``;

export const Box = styled.View`
   background: #f3f3f3;
   margin-top: 18px;
   height: 200px;

   border-radius: 18px;
`;

export const ServiceText = styled.Text`
   align-self: center;
   margin-top: 10px;
   font-size: 20px;
   color: #ce34d9;
`;

export const Description = styled.Text`
   margin-top: 20px;
   font-size: 18px;
   color: #352e2e;
   margin-left: 15px;
`;

export const TextDescription = styled.Text`
   margin-top: 20px;
   font-size: 16px;
   color: #352e2e;
   margin-left: 15px;
`;
