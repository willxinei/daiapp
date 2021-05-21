import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { cores } from '../../utils/ferramentas';

export const Container = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
   padding: 0 24px;
`;

export const Description = styled.Text`
   font-size: 18px;
   margin-top: 16px;
`;

export const Title = styled.Text`
   font-size: 32px;
   margin-top: 48px;
   text-align: center;
`;

export const OkButton = styled(RectButton)`
   background: ${cores.roxo};
   width: 100%;
   justify-content: center;
   align-items: center;
   border-radius: 10px;
   margin-top: 24px;
   padding: 12px 24px;
`;

export const OkButtonText = styled.Text`
   font-size: 20px;
`;
