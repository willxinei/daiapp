import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Alert, Platform } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { getDate, getDay, getMonth, getYear } from 'date-fns';
import { useAuth } from '../../hooks/AuthContext';
import { convertHours } from './Utils/StateFuncion';
import {
   Container,
   Header,
   BackButton,
   HeaderTitle,
   Calendario,
   Content,
   Title,
   Schedule,
   SectionContente,
   Hour,
   HourText,
   CreateAppointmentButton,
   CreateAppointmentButtonText,
   HourContainer,
   HomeContainer,
   Linear,
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
   LocaleConfig.locales.ptBr = {
      monthNames: [
         'Janeiro',
         'Fevereiro',
         'Março',
         'Abril',
         'Maio',
         'Junho',
         'Julho',
         'Agosto',
         'Setembro',
         'Outubro',
         'Novembro',
         'Dezembro',
      ],
      monthNamesShort: [
         'Jan',
         'Fev',
         'Mar',
         'Abr',
         'Mai',
         'Jun',
         'Jul',
         'Ago',
         'Set',
         'Out',
         'Nov',
         'Dez',
      ],
      dayNames: [
         'Domingo',
         'segunda',
         'Terça',
         'Quarta',
         'Quinta',
         'Sexta',
         'Sábado',
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Quar', 'Quin', 'Sext', 'Sab'],
   };
   LocaleConfig.defaultLocale = 'ptBr';

   const route = useRoute();
   const routeParams = route.params as RouteParams;
   const { goBack, navigate } = useNavigation();

   const [selectedProvider, setSelectedProvider] = useState(
      routeParams.providerId,
   );

   const [selectService, setService] = useState(routeParams.service);
   const [selected, setSelect] = useState(new Date());
   const [availability, setAvailability] = useState<AvailavilityItem[]>([]);
   const [selectHour, setSelectHour] = useState('');

   const backToHome = useCallback(() => {
      navigate('Dashboard');
   }, [navigate]);

   const handleDate = useCallback(day => {
      setSelect(day.dateString);
   }, []);

   const handleSelectHour = useCallback((hour: string) => {
      setSelectHour(hour);
   }, []);

   const handleHorarios = useCallback(() => {
      const dat = new Date(selected);
      const dia = getDate(dat) + 1;
      const mes = getMonth(dat) + 1;
      const ano = getYear(dat);
      console.log(dia);
      api.get(`provider/${selectedProvider}/dia`, {
         params: {
            mes,
            ano,
            dia,
            service: selectService,
         },
      }).then(response => {
         setAvailability(response.data);
      });
   }, [selected, selectedProvider, selectService]);

   console.log(selectHour);

   const handleCreateAppointment = useCallback(async () => {
      try {
         const tempo = convertHours(selectHour);
         const date = new Date(selected);
         const dia = getDate(date) + 1;
         const mes = getMonth(date) + 1;
         const ano = getYear(date);

         const time = new Date(ano, mes - 1, dia, 0, tempo, 0);
         console.log(time, date, selectHour, tempo);
         await api
            .post('appointment', {
               provider_id: selectedProvider,
               from: selectHour,
               dia,
               mes,
               ano,
               service: selectService,
            })
            .then(h => {
               console.log(h.status, h.statusText);
            });

         navigate('AppointmentCreated', { date: time.getTime() });
      } catch (err) {
         Alert.alert(
            'Erro ao criar agendamento',
            'Ocorreu um erro ao tentar criar o agendamento',
         );
      }
   }, [navigate, selectHour, selectedProvider, selected, selectService]);

   const availabily = useMemo(() => {
      return availability.map(({ avaliable, hour }) => {
         return {
            hour,
            avaliable,
            hourFormatted: hour,
         };
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
                  <Icon name="chevron-left" size={28} color="#f3f3f3" />
               </BackButton>

               <HeaderTitle>Pagina de Serviços</HeaderTitle>
               <HomeContainer onPress={backToHome}>
                  <Icon name="home" size={28} color="#f3f3f3" />
               </HomeContainer>
            </Linear>
         </Header>

         <Content>
            <Calendario onPress={handleHorarios}>
               <Calendar
                  onDayPress={handleDate}
                  markedDates={{
                     [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: '#bf4e8a',
                        selectedTextColor: 'black',
                     },
                  }}
               />
            </Calendario>

            <Schedule>
               <Title>Escolha um horario</Title>

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
            </Schedule>

            <CreateAppointmentButton onPress={handleCreateAppointment}>
               <CreateAppointmentButtonText>
                  Agendar
               </CreateAppointmentButtonText>
            </CreateAppointmentButton>
         </Content>
      </Container>
   );
};

export default CreateAppointment;
