import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { cores } from '../../utils/ferramentas';

export const Container = styled.View`
   flex: 1;
   padding: 25px;
   justify-content: center;
   align-items: center;
   background: #d1b6be;
`;

export const Tilte = styled.Text`
   font-size: 20px;
`;

export const BackContainer = styled.TouchableOpacity`
   flex-direction: row;
   height: 7%;
   align-items: center;
   justify-content: center;
   background: ${cores.rosaClaro};
   border-top-width: 2px;
   border-color: ${cores.roxo};
   opacity: 0.1;
`;
