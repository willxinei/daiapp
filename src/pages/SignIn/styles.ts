import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { cores } from '../../utils/ferramentas';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background: #dfc5c5;
    padding: 25px;
`;

export const LogText = styled.Text`
    font-size: 60px;
    color: ${cores.texto.cinza_Escuro};
`;

export const ImageLogo = styled.Image`
    width: 70%;
    height: 70%;
    position: absolute;
    left: 48%;
    top: 0px;
`;

export const Tilte = styled.Text`
    font-size: 26px;
    margin-top: 30px;
`;

export const Buttoncontainer = styled(RectButton)`
    width: 70%;
    height: 40px;
    margin-top: 15px;
    background: #6a7dc1;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
`;

export const TextBotton = styled.Text`
    font-size: 16px;
`;

export const BackContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f2f2f2;
    border-top-width: 2px;
    border-color: #d0d0d0;
    padding: 10px;
`;
