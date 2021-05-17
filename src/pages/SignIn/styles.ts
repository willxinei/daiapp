import { Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { cores } from '../../utils/ferramentas';

export const Container = styled.KeyboardAvoidingView`
   flex: 1;
   justify-content: center;
   align-items: center;
   background: ${cores.fundo};
`;

export const LogText = styled.Text`
   font-size: 60px;
   color: ${cores.texto.cinza_Escuro};
`;

export const ImageLogo = styled.Image`
   width: 100%;
   height: 60%;
   position: absolute;
   left: 0%;
   top: -40px;
`;

export const Tilte = styled.Text`
   font-size: 26px;
   margin-top: 90%;
   margin-bottom: 5px;
   font-size: 20px;
`;

export const TextBotton = styled.Text`
   font-size: 16px;
`;

export const BackContainer = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
   justify-content: center;
   border-top-width: 2px;
   border-color: #d0d0d0;
   padding: 10px;
`;

export const CriarContaText = styled.Text`
   font-size: 18px;
`;

export const Forgot = styled.TouchableOpacity`
   align-items: flex-end;
   width: 100%;
   padding: 25px;
   margin-top: 20px;
`;

export const ForgotText = styled.Text`
   font-size: 16px;
`;
