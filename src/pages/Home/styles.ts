import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background: #d1b6be;
`;

export const Header = styled.View`
    padding: 0 20px;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #999999;
    justify-content: space-between;
`;

export const TitleName = styled.Text`
    font-size: 20px;
`;

export const Avatar = styled.Image`
    width: 55px;
    height: 55px;
    border-radius: 30px;
    background: #f2f2f2;
`;

export const Title = styled.Text`
    font-size: 20px;
`;

export const Agendar = styled(RectButton)`
    width: 60%;
    border-radius: 12px;
    height: 50px;
    background: #203685;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

export const BodyContainer = styled.View`
    flex: 1;
    align-items: center;
    width: 100%;
    padding: 20px;
`;

export const FirstBox = styled.View`
    height: 140px;
    width: 100%;
    padding: 10px;
    flex-direction: row;
    background: #f2f2f2;
    border-radius: 12px;
`;

export const UserAvatar = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background: #909090;
    margin-top: 15px;
`;

export const ContainerText = styled.View`
    margin-left: 15px;
`;
export const Description = styled.Text`
    margin-right: 20px;
`;

export const Scroll = styled.ScrollView`
    margin-top: 30px;
    width: 100%;
`;

export const BoxTwo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;
`;
export const Box = styled.View`
    padding: 0 10px;
    height: 60px;
    background: #f2f2f2;
    width: 70%;
    flex-direction: row;
    border-radius: 12px;
    align-items: center;
`;

export const AvatarBox = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;

    background: #909099;
    margin-right: 10px;
`;

export const Desmarcar = styled.View``;
