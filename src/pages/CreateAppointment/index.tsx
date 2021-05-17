/* eslint-disable camelcase */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert, Text, View } from 'react-native';
import { getDate, getMonth, getYear } from 'date-fns';
import CalendaPiker from '@react-native-community/datetimepicker';
import { convertHours } from './Utils/StateFuncion';
import {
   Container,
   Header,
   BackButton,
   HeaderTitle,
   Calendario,
   Content,
   SectionContente,
   Hour,
   HourText,
   CreateAppointmentButton,
   CreateAppointmentButtonText,
   HourContainer,
   HomeContainer,
   Linear,
   OpenPikerButon,
   OpenPickerText,
} from './styles';

import api from '../../services/api';

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
   const [disponivel, setDisponivel] = useState();

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

         navigate('AgendamentoCriado', { date: time.getTime() });
      } catch (err) {
         Alert.alert('Erro ao criar agendamento', err.message);
      }
   }, [navigate, selectHour, selectedProvider, selectDia, selectService]);

   const availabily = useMemo(() => {
      return availability.map(({ avaliable, hour }) => {
         return {
            hour,
            avaliable,
            hourFormatted: hour,
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
      return availability.find(h => {
         return h.avaliable === false;
      });
   }, [availability]);

   return (
      <Container
         start={{ x: 1, y: 0 }}
         end={{ x: 0, y: 0 }}
         locations={[0.2, 1]}
         colors={['#EAEAEA', '#E4C6D5']}
      >
         <Header>
            <Linear
               start={{ x: 1, y: 1 }}
               end={{ x: 0, y: 1 }}
               colors={['#f4b7b7', '#bf4e8a']}
            >
               <BackButton onPress={goBack}>
                  <Feather name="chevron-left" size={28} color="#f3f3f3" />
               </BackButton>

               <HeaderTitle>Pagina de Serviços</HeaderTitle>
               <HomeContainer onPress={backToHome}>
                  <Feather name="home" size={28} color="#f3f3f3" />
               </HomeContainer>
            </Linear>
         </Header>

         <Content>
            <Calendario>
               <OpenPikerButon onPress={hendleDatePiker}>
                  <OpenPickerText>Escolha uma data</OpenPickerText>
               </OpenPikerButon>
               {showPider && (
                  <CalendaPiker onChange={handleChange} value={selectDia} />
               )}
            </Calendario>

            {!handleDisponivel && (
               <Text style={{ marginTop: 30, fontSize: 20 }}>
                  Horários disponíveis
               </Text>
            )}
            {handleDisponivel && (
               <Text style={{ marginTop: 30, fontSize: 20 }}>
                  {'    '}Nenhum Horário {'\n'} disponível para hoje
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
                  {availabily.map(({ hourFormatted, hour, avaliable }) => (
                     <HourContainer
                        enabled={avaliable}
                        onPress={() => handleSelectHour(hour)}
                        key={hourFormatted}
                     >
                        <Hour
                           available={avaliable}
                           select={selectHour === hour}
                        >
                           <HourText>{hourFormatted}</HourText>
                        </Hour>
                     </HourContainer>
                  ))}
               </SectionContente>
            </View>
         </Content>
         <CreateAppointmentButton onPress={handleCreateAppointment}>
            <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
         </CreateAppointmentButton>
      </Container>
   );
};

export default CreateAppointment;
