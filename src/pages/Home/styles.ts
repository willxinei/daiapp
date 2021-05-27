/* eslint-disable camelcase */
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { cores } from '../../utils/ferramentas';
import { Response } from './index';

export const Container = styled.View`
   flex: 1;
   align-items: center;
   background: ${cores.branco};
`;

export const Header = styled.View`
   width: 102%;
   height: 130px;
   top: -30px;

   /* fundo vriar conta */

   background: ${cores.fundo};
   border-radius: 89.8522px;
   padding: 15px 30px 0 35px;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const TitleName = styled.Text`
   font-size: 24px;
`;

export const Avatar = styled.Image`
   width: 75px;
   height: 75px;
   border-radius: 40px;
   background: ${cores.branco};
`;

export const Title = styled.Text`
   font-size: 20px;
`;

export const Agendar = styled(RectButton)`
   width: 90%;
   border-radius: 12px;
   height: 60px;
   background: ${cores.rosa};
   align-items: center;
   justify-content: center;
   margin-top: 30px;
`;

export const NexContainer = styled.View`
   margin-top: 30px;
   align-items: flex-start;
   width: 90%;
`;

export const BodyContainer = styled.View`
   flex: 1;
   align-items: center;
   width: 100%;
   padding: 7px 20px 20px 20px;
`;

export const FirstBox = styled.View`
   height: 160px;
   width: 100%;
   padding: 10px;
   flex-direction: row;
   background: ${cores.roxo};
   border-radius: 15px;
`;

export const ContainerAvatarHeader = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
   width: 100px;
   height: 100px;
   border-radius: 50px;
   background: ${cores.rosa};
`;

export const ContainerText = styled.View`
   margin-left: 35px;
   width: 250px;
`;
export const Description = styled.Text`
   margin-right: 20px;
   font-size: 16px;
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
   margin-top: 18px;
   background: #f4f4f4;
   height: 150px;
   border-radius: 16px;
   width: 100%;
   background: #fff;
   flex-direction: row;

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

export const Deteles = styled.View`
   flex-direction: row;
   align-items: center;
   margin-top: 13px;
`;

export const Hp = styled.Text`
   font-size: 16px;
   color: #352e2e;
   margin-left: 10px;
`;

export const ButtonDelet = styled(RectButton)`
   border-radius: 10px;
   justify-content: center;
   align-items: center;
   flex-direction: row;
`;

export const ButtonDeletText = styled.Text`
   color: black;
   font-size: 20px;
   margin-left: 10px;
   color: ${cores.roxo};
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

export const Fundo = styled.Image`
   position: absolute;
   right: 0;
   left: 0;
   width: 100%;
   height: 100%;
`;

export const BoxOne = styled.View`
   width: 50%;
   justify-content: center;
   padding: 10px;
`;
export const BoxT = styled.View``;
