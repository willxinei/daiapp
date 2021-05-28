/* eslint-disable camelcase */
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, {
   useCallback,
   useEffect,
   useState,
   useMemo,
   useRef,
} from 'react';
import { Feather, Fontisto } from '@expo/vector-icons';
import { Alert, Platform, Text, View } from 'react-native';
import { format, getDate, getMonth, getYear } from 'date-fns';
import CalendaPiker from '@react-native-community/datetimepicker';
import * as Notificatons from 'expo-notifications';
import { differenceInSeconds } from 'date-fns/esm';
import Londing from 'expo-app-loading';
import { convertHours } from './Utils/StateFuncion';
import {
   Container,
   Header,
   BackButton,
   Calendario,
   Content,
   SectionContente,
   Hour,
   HourText,
   CreateAppointmentButton,
   CreateAppointmentButtonText,
   HourContainer,
   HomeContainer,
   OpenPikerButon,
   OpenPickerText,
} from './styles';

import api from '../../services/api';
import { Fonts } from '../../utils/ferramentas';

interface RouteParams {
   providerId: string;
   service: string;
}

export interface Provider {
   id: string;
   name: string;
   avatar_url: string;
}

interface AvailavilityItem {
   hour: string;
   avaliable: boolean;
}

Notificatons.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
   }),
});

const CreateAppointment: React.FC = () => {
   const route = useRoute();
   const routeParams = route.params as RouteParams;
   const { goBack, navigate } = useNavigation();

   const [selectedProvider] = useState(routeParams.providerId);

   const [selectService] = useState(routeParams.service);
   const [selectDia, setSelectDia] = useState(new Date());
   const [availability, setAvailability] = useState<AvailavilityItem[]>([]);
   const [selectHour, setSelectHour] = useState('');
   const [showPider, setShowPiker] = useState(false);

   const Notification = useCallback(
      async (hora: string) => {
         const data = new Date();
         const conver = convertHours(selectHour);
         const dataAgendada = new Date(
            getYear(selectDia),
            getMonth(selectDia),
            getDate(selectDia),
            0,
            conver,
         );
         const sec = differenceInSeconds(dataAgendada, data);
         console.log(sec);

         const notifica = await Notificatons.scheduleNotificationAsync({
            content: {
               title: 'Meu agendamento',
               body: `Você tem um horario agendado pra ${selectHour}`,
               sound: true,
               priority: Notificatons.AndroidNotificationPriority.HIGH,
               data: {
                  hora,
               },
            },
            trigger: { seconds: 5 },
         });

         return notifica;
      },
      [selectDia, selectHour],
   );

   const backToHome = useCallback(() => {
      navigate('Home');
   }, [navigate]);

   const handleSelectHour = useCallback((hour: string) => {
      setSelectHour(hour);
   }, []);

   const handleCreateAppointment = useCallback(async () => {
      try {
         const tempo = convertHours(selectHour);
         const date = new Date(selectDia);
         const dia = getDate(date);
         const mes = getMonth(date) + 1;
         const ano = getYear(date);

         const time = new Date(ano, mes - 1, dia, 0, tempo, 0);
         await api.post('agendamento', {
            provider_id: selectedProvider,
            from: selectHour,
            dia,
            mes,
            ano,
            service: selectService,
         });

         Notification(selectHour);

         navigate('AgendamentoCriado', { date: time.getTime() });
      } catch (err) {
         Alert.alert('Erro ao criar agendamento', err.message);
      }
   }, [
      selectHour,
      selectDia,
      selectedProvider,
      selectService,
      Notification,
      navigate,
   ]);

   const availabily = useMemo(() => {
      return availability.map(({ avaliable, hour }) => {
         return {
            hour,
            avaliable,
         };
      });
   }, [availability]);

   const hendleDatePiker = useCallback(() => {
      function show() {
         setShowPiker(state => !state);
      }
      show();
   }, []);

   const handleChange = useCallback((event: any, date: Date | undefined) => {
      setShowPiker(false);
      if (date) {
         setSelectDia(date);
      }
   }, []);

   useEffect(() => {
      const dat = new Date(selectDia);
      const dia = getDate(dat);
      const mes = getMonth(dat) + 1;
      const ano = getYear(dat);

      api.get(`agendamento/h/horarios`, {
         params: {
            provider_id: selectedProvider,
            mes,
            ano,
            dia,
            service: selectService,
         },
      }).then(response => {
         setAvailability(response.data);
      });
   }, [selectDia, selectService, selectedProvider]);

   const handleDisponivel = useMemo(() => {
      return availability.filter(h => {
         return h.avaliable !== false;
      });
   }, [availability]);

   const font = Fonts();
   if (!font) {
      return <Londing />;
   }

   return (
      <Container>
         <Header>
            <BackButton onPress={goBack}>
               <Feather name="chevron-left" size={35} color="black" />
            </BackButton>

            <HomeContainer onPress={backToHome}>
               <Fontisto name="home" size={40} color="black" />
            </HomeContainer>
         </Header>

         <View
            style={{
               paddingLeft: 35,
            }}
         >
            <Text style={{ fontSize: 20, fontFamily: 'MontBold' }}>
               Data: {format(new Date(selectDia), 'dd/MM/yyyy')}
            </Text>
         </View>

         <Content>
            <Calendario>
               <OpenPikerButon onPress={hendleDatePiker}>
                  <OpenPickerText style={{ fontFamily: 'MontBlack' }}>
                     Escolha uma data
                  </OpenPickerText>
               </OpenPikerButon>
               {showPider && (
                  <CalendaPiker onChange={handleChange} value={selectDia} />
               )}
            </Calendario>

            {handleDisponivel.length > 0 && (
               <Text
                  style={{
                     marginTop: 30,
                     fontSize: 20,
                     fontFamily: 'MontBold',
                  }}
               >
                  Horários disponíveis
               </Text>
            )}
            {handleDisponivel.length === 0 && (
               <Text
                  style={{
                     marginTop: 30,
                     fontSize: 20,
                     fontFamily: 'MontBold',
                  }}
               >
                  {'         '}Nenhum Horário {'\n'} disponível para esse dia
               </Text>
            )}

            <View
               style={{
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               <SectionContente>
                  {availabily.map(({ hour, avaliable }) => (
                     <HourContainer
                        enabled={avaliable}
                        onPress={() => handleSelectHour(hour)}
                        key={hour}
                     >
                        <Hour
                           available={avaliable}
                           select={selectHour === hour}
                        >
                           <HourText style={{ fontFamily: 'MontBold' }}>
                              {hour}
                           </HourText>
                        </Hour>
                     </HourContainer>
                  ))}
               </SectionContente>
            </View>
         </Content>
         <CreateAppointmentButton onPress={handleCreateAppointment}>
            <CreateAppointmentButtonText style={{ fontFamily: 'MontBold' }}>
               Agendar
            </CreateAppointmentButtonText>
         </CreateAppointmentButton>
      </Container>
   );
};

export default CreateAppointment;
