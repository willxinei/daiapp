import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { cores } from '../../utils/ferramentas';

interface HourProps {
   available: boolean;
   select: boolean;
}

export const Container = styled(LinearGradient)`
   flex: 1;
   padding-bottom: 30px;
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
   margin-left: 10%;
`;

export const HeaderTitle = styled.Text`
   color: #f3f3f3;
   font-size: 20px;
   margin-left: 5%;
`;

export const OpenPickerText = styled.Text`
   font-size: 20px;
`;

export const Calendario = styled.View`
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100px;
`;

export const SectionContente = styled.ScrollView.attrs({
   contentContainerStyle: { paddingHorizontal: 24 },
   horizontal: true,
})`
   margin-top: 30px;
`;

export const HourContainer = styled(RectButton)``;

export const Hour = styled.View<HourProps>`
   background: ${props => (props.select ? '#bf4e8a' : '#fdf4eb')};
   padding: 15px;
   margin-right: 8px;
   border-radius: 10px;
   border-width: 1px;

   opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const CreateAppointmentButton = styled(RectButton)`
   height: 50px;
   background: ${cores.roxo};
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   width: 90%;
   margin-left: 5%;
`;

export const Content = styled.View`
   padding: 25px;
   align-items: center;
   flex: 1;
`;

export const HourText = styled.Text``;

export const CreateAppointmentButtonText = styled.Text`
   color: #f3f3f3;
   font-size: 18px;
`;

export const OpenPikerButon = styled(RectButton)`
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 50px;

   background: ${cores.roxo};
   border-radius: 10px;
`;
