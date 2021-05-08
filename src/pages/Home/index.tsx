/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { format, getHours, intervalToDuration, isToday } from 'date-fns/esm';
import prBr from 'date-fns/locale/pt-BR';
import { useNavigation } from '@react-navigation/core';
import {
   Header,
   TitleName,
   Container,
   Title,
   Avatar,
   Agendar,
   BodyContainer,
   FirstBox,
   UserAvatar,
   ContainerText,
   Description,
   Desmarcar,
   BoxTwo,
   Box,
   AvatarBox,
   Scroll,
   BoxAgenda,
   HorariosContainer,
   HpContainer,
   HoraTitle,
   Hp,
   ButtonDelet,
   ButtonDeletText,
} from './styles';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

export interface Response {
   ano: number;
   mes: number;
   dia: number;
   from: string;
   service: string;
   id: string;
   provider: {
      avatar_url: string;
      name: string;
   };
}

const Home: React.FC = () => {
   function convertHours(time: string) {
      const [hour, minutes] = time.split(':').map(Number);
      const timeInMinutes = hour * 60 + minutes;
      return timeInMinutes;
   }
   const data = new Date(Date.now());
   const dataFormat = format(data, 'EEEE dd/MM/yyyy', { locale: prBr });

   const { user, signOut } = useAuth();
   const { goBack, navigate } = useNavigation();
   const [agendamento, setAgendamento] = useState<Response[]>([]);

   useEffect(() => {
      api.get('agendamento/me').then(h => {
         setAgendamento(h.data);
      });
   }, []);

   const nexAg = useMemo(() => {
      return agendamento.find(h => {
         const hour = convertHours(h.from);
         const hourNow = getHours(new Date()) * 60;
         return hour > hourNow;
      });
   }, [agendamento]);

   const hora = nexAg?.from as string;

   const navigateToSelectProviders = useCallback(() => {
      navigate('Prestador');
   }, [navigate]);

   const afterAgendamentos = useMemo(() => {
      return agendamento.filter(h => {
         const nexHour = convertHours(hora);
         const hour = convertHours(h.from);
         return hour > nexHour;
      });
   }, [agendamento, hora]);

   const handleCancel = useCallback(() => {
      goBack();
   }, [goBack]);

   const handleDelete = useCallback(
      (dia: number, mes: number, ano: number, horario: string, id: string) => {
         async function Delete(): Promise<void> {
            try {
               await api.delete(`appointment/${id}/del`);

               setAgendamento(agendamento.filter(h => h.id !== id));
            } catch (err) {
               console.log(err);
            }
         }

         const dateNow = new Date();
         const horaConver = convertHours(horario);
         const dateAgendada = new Date(ano, mes - 1, dia, 0, horaConver);
         const canpare =
            intervalToDuration({
               end: dateAgendada,
               start: dateNow,
            }).hours + 1;
         console.log(canpare);

         if (canpare <= 2) {
            Alert.alert(
               'Atenção',
               'Você só pode desmarcar com 2 horas de antecedencia',
            );
         } else {
            Alert.alert(
               'Atenção',
               'Tem certeza que seseja desmarcar um horário',
               [
                  {
                     text: 'Cancel',
                     onPress: handleCancel,
                     style: 'cancel',
                  },
                  {
                     text: 'Ok',
                     onPress: () => Delete(),
                  },
               ],
            );
         }
      },
      [agendamento, handleCancel],
   );

   return (
      <>
         <Container>
            <Header>
               <TitleName>
                  Bem vindo (a) {'\n'}
                  <Text>{user.name}</Text>
               </TitleName>
               <Avatar source={{ uri: `${user.avatar_url}` }} />
            </Header>
            <Title style={{ marginTop: 15 }}>{dataFormat}</Title>

            <Agendar onPress={navigateToSelectProviders}>
               <Title style={{ color: '#730067', fontSize: 24 }}>
                  Agendar um horário
               </Title>
            </Agendar>

            <Title style={{ color: '#909090', marginTop: 30 }}>
               Meu horários
            </Title>
            <BodyContainer>
               {/* {nexAg === undefined && (
                  <Title>Sem horarios para hoje</Title>
               )} */}
               {nexAg && (
                  <FirstBox>
                     <UserAvatar
                        source={{
                           uri: `${nexAg.provider.avatar_url}`,
                        }}
                     />
                     <ContainerText>
                        <Title style={{ marginBottom: 10 }}>
                           Proximo horario
                        </Title>
                        <Description>
                           Prestador: {nexAg.provider.name}
                        </Description>
                        <Description>Serviço: {nexAg.service}</Description>
                        <Description>
                           Data: {nexAg.dia}/{nexAg.mes}/{nexAg.ano}
                        </Description>
                        <Description>Horário: {nexAg.from}</Description>
                     </ContainerText>
                  </FirstBox>
               )}
               <BoxAgenda
                  data={afterAgendamentos}
                  keyExtractor={h => h.id}
                  renderItem={({ item: h }) => (
                     <>
                        <HorariosContainer>
                           <HpContainer>
                              <HoraTitle>Horarios Agendados</HoraTitle>
                              <Hp>Prestador: {h.provider.name}</Hp>
                              <Hp>Serviço: {h.service}</Hp>
                              <Hp />
                              <Hp>Horário: {h.from}</Hp>
                           </HpContainer>
                           <ButtonDelet
                              onPress={() => {
                                 handleDelete(
                                    h.dia,
                                    h.mes,
                                    h.ano,
                                    h.from,
                                    h.id,
                                 );
                              }}
                           >
                              <ButtonDeletText>Desmarcar</ButtonDeletText>
                           </ButtonDelet>
                        </HorariosContainer>
                     </>
                  )}
               />
            </BodyContainer>
         </Container>
      </>
   );
};
export default Home;
function navigate(arg0: string) {
   throw new Error('Function not implemented.');
}
