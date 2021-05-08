/* eslint-disable camelcase */
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { cores } from '../../utils/ferramentas';
import { Response } from './index';

export const Container = styled.View`
   flex: 1;
   align-items: center;
   background: #d1b6be;
`;

export const Header = styled.View`
   width: 102%;
   height: 130px;
   top: -30px;

   /* fundo vriar conta */

   background: rgba(253, 242, 237, 0.63);
   border-radius: 89.8522px;
   padding: 15px 30px 0 30px;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const TitleName = styled.Text`
   font-size: 20px;
`;

export const Avatar = styled.Image`
   width: 75px;
   height: 75px;
   border-radius: 40px;
   background: #863aaa;
`;

export const Title = styled.Text`
   font-size: 20px;
`;

export const Agendar = styled(RectButton)`
   width: 60%;
   border-radius: 12px;
   height: 60px;
   background: #df8989;
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
   background: #e9dfe2;
   border-radius: 15px;
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
export const BoxAgenda = styled(FlatList as new () => FlatList<Response>)`
   padding: 0 5px 25px 5px;
   width: 100%;
   margin-top: 20px;
`;

export const HorariosContainer = styled.View`
   margin-top: 12px;
   background: #f4f4f4;
   height: 210px;
   border-radius: 16px;
   width: 100%;

   padding: 14px 26px 10px 16px;
`;

export const HoraTitle = styled.Text`
   font-size: 20px;
   color: #352e2e;
   align-self: center;
`;

export const HpContainer = styled.View`
   flex: 1;
`;

export const Hp = styled.Text`
   font-size: 16px;
   color: #352e2e;
   margin-left: 10px;
   margin-top: 10px;
`;

export const ButtonDelet = styled(RectButton)`
   align-self: flex-end;
   height: 40px;
   width: 100px;
   border-radius: 10px;
   background: #bf4e8a;
   justify-content: center;
   align-items: center;
   margin-bottom: 15px;
`;

export const ButtonDeletText = styled.Text`
   color: #f3f3f3;
   font-size: 14px;
`;

export const BoxTwo = styled.View`
   flex: 1;
`;
export const Box = styled.View`
   padding: 0 10px;
   height: 60px;
   background: #f2f2f2;
   width: 30%;
   flex-direction: row;
   border-radius: 12px;
   align-items: center;
   margin-right: 17%;
`;

export const AvatarBox = styled.Image`
   width: 40px;
   height: 40px;
   border-radius: 20px;

   background: #909099;
   margin-right: 10px;
`;

export const Desmarcar = styled.View``;
