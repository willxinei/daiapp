import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Provider } from './index';
import { cores } from '../../utils/ferramentas';

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
   margin-top: 35px;

   font-size: 20px;
`;

export const ProviderList = styled(FlatList as new () => FlatList<Provider>)`
   padding: 22px 25px 16px;
`;

export const ListContainer = styled.View``;

export const ProviderContainer = styled(RectButton)`
   background: #f3f3f3;
   border-radius: 16px;
   padding: 25px;
   flex-direction: row;
   align-items: center;
   margin-top: 20px;
`;

export const ProviderAvatar = styled.Image`
   width: 132px;
   height: 132px;
   border-radius: 76px;
   background: ${cores.rosa};
`;

export const ProviderInfo = styled.View`
   flex: 1;
   margin-left: 26px;
`;

export const ProviderName = styled.Text`
   font-size: 24px;
   color: #352e2e;
   /* margin-left: 50px; */
   align-items: center;
   margin-bottom: 20px;
`;

export const ProviderMeta = styled.View`
   margin-left: 8px;
   align-items: center;
   flex-direction: row;
`;

export const ProviderMetaText = styled.Text`
   margin-left: 8px;
`;

export const ButtonContainer = styled.View`
   padding: 25px;
   align-content: center;
`;

export const ButtonNext = styled(RectButton)`
   align-items: center;
   height: 58px;
   border-radius: 15px;
   margin-top: 50px;

   background: #fe676e;
`;

export const ButtonNextTitle = styled.Text`
   margin-top: 15px;
   font-size: 16px;
`;
