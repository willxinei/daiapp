import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native';
import { Response } from './index';
import { cores } from '../../utils/ferramentas';

export const Container = styled.View`
   flex: 1;
   background: ${cores.branco};
`;

export const Header = styled.View`
   height: 60px;
   align-items: center;
   flex-direction: row;
   justify-content: space-between;
   margin-top: 20px;
`;

export const BackButton = styled.TouchableOpacity`
   margin-left: 30px;
`;

export const HomeContainer = styled.TouchableOpacity`
   margin-right: 30px;
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
   background: #fff;
   margin-top: 18px;
   border-radius: 18px;
   padding: 8px 10px 15px 10px;
`;

export const ServiceText = styled.Text`
   margin-top: 10px;
   font-size: 24px;
   color: ${cores.roxo};
   margin-left: 10px;
`;

export const Description = styled.Text`
   margin-top: 10px;
   font-size: 18px;
   color: #352e2e;
   margin-left: 25px;
`;

export const TextDescription = styled.Text`
   margin-top: 20px;
   font-size: 16px;
   color: ${cores.roxo};
`;
