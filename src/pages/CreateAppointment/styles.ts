import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

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
  font-family: 'Tienne-Bold';
  margin-left: 5%;
`;

export const Title = styled.Text`
  align-items: center;
  align-self: center;
  margin-top: 50px;

  font-family: 'Tienne-Regular';
  font-size: 26px;
`;

export const OpenDataContainer = styled.View`
  padding: 25px;
`;

export const OpenDAtePickButton = styled(RectButton)`
  height: 58px;
  border-radius: 15px;
  margin-top: 10px;

  background: #fe676e;
`;

export const OpenPickerText = styled.Text`
  margin-top: 15px;
  align-self: center;
  font-family: 'Tienne-Bold';
  font-size: 20px;
`;

export const Calendario = styled(RectButton)``;

export const Schedule = styled.View`
  padding: 5px 0 16px;
`;

export const SectionContente = styled.ScrollView.attrs({
  contentContainerStyle: {paddingHorizontal: 24},
  horizontal: true,
})`
  margin-top: 15px;
`;

export const HourContainer = styled(RectButton)``;

export const Hour = styled.View<HourProps>`
  background: ${(props) => (props.select ? '#bf4e8a' : '#fdf4eb')};
  padding: 15px;
  margin-right: 8px;
  border-radius: 10px;
  border-width: 1px;

  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: #bf4e8a;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;

  margin-top: 50px;
`;

export const Content = styled.ScrollView`
  padding: 25px;
`;

export const HourText = styled.Text`
  font-family: 'Tienne-Bold';
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'Tienne-Black';
  color: #f3f3f3;
  font-size: 18px;
`;
