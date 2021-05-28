/* eslint-disable array-callback-return */
/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Image, Text } from 'react-native';
import { Feather, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { format, intervalToDuration, isAfter } from 'date-fns';
import prBr from 'date-fns/locale/pt-BR';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/core';
import { isToday } from 'date-fns/esm';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
   BoxAgenda,
   HorariosContainer,
   HpContainer,
   Hp,
   ButtonDelet,
   ButtonDeletText,
   NexContainer,
   Fundo,
   Deteles,
   BoxOne,
   BoxT,
} from './styles';
import { useAuth } from '../../hooks/AuthContext';
import fundo from '../../assets/fundo.png';
import api from '../../services/api';
import { cores, Fonts } from '../../utils/ferramentas';

export interface Response {
   ano: number;
   mes: number;
   dia: number;
   from: number;
   service: string;
   id: string;
   provider: {
      avatar_url: string;
      name: string;
   };
}

const Home: React.FC = () => {
   const { user } = useAuth();
   const { goBack, navigate } = useNavigation();
   const [agendamento, setAgendamento] = useState<Response[]>([]);

   const data = new Date(Date.now());
   const dataFormat = format(data, 'iiii dd/MM/yyyy', { locale: prBr });

   useEffect(() => {
      try {
         api.get('agendamento/me').then(h => {
            setAgendamento(h.data);
         });
      } catch (err) {
         console.log(err);
      }
   }, []);

   const nexAg = useMemo(() => {
      return agendamento.find(h => {
         const dia = new Date(h.ano, h.mes - 1, h.dia, 0, h.from);

         if (isAfter(dia, new Date())) {
            console.log(dia, new Date());
            return h;
         }
      });
   }, [agendamento]);

   const navigateToSelectProviders = useCallback(() => {
      navigate('Prestador');
   }, [navigate]);

   const afterAgendamentos = useMemo(() => {
      return agendamento.filter(h => {
         if (nexAg) {
            const dia = new Date(h.ano, h.mes, h.dia, 0, h.from, 0);
            const nxdia = new Date(
               nexAg.ano,
               nexAg.mes,
               nexAg.dia,
               0,
               nexAg.from,
               0,
            );

            if (isAfter(dia, nxdia)) {
               return h;
            }
         }
         // return h;
      });
   }, [agendamento, nexAg]);

   const navigateProfile = useCallback(() => {
      navigate('Profile');
   }, [navigate]);

   const handleDelete = useCallback(
      (dia: number, mes: number, ano: number, horario: number, id: string) => {
         async function Delete(): Promise<void> {
            try {
               await api.delete(`agendamento/${id}/agendamento`);

               setAgendamento(agendamento.filter(h => h.id !== id));
            } catch (err) {
               console.log(err);
            }
         }

         const dateNow = new Date();
         const dateAgendada = new Date(ano, mes - 1, dia, 0, horario);
         const canpare: any =
            intervalToDuration({
               start: dateNow,
               end: dateAgendada,
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
      [agendamento],
   );

   function formatd(ano: number, mes: number, dia: number, from: number) {
      return format(new Date(ano, mes, dia, 0, from), 'HH:mm');
   }

   const fonstsLoadd = Fonts();
   if (!fonstsLoadd) {
      return <AppLoading />;
   }

   return (
      <>
         <Container>
            <Fundo source={fundo} />
            <Header>
               <TitleName style={{ fontFamily: 'MontBold' }}>
                  Ola...{'\n'}
                  <Text style={{ fontFamily: 'MontRegular' }}>{user.name}</Text>
               </TitleName>
               <TouchableOpacity onPress={navigateProfile}>
                  <Avatar source={{ uri: `${user.avatar_url}` }} />
               </TouchableOpacity>
            </Header>

            <Title
               style={{
                  color: 'black',
                  marginTop: 15,
                  fontFamily: 'MontRegular',
               }}
            >
               {dataFormat}
            </Title>

            <Agendar onPress={navigateToSelectProviders}>
               <Title
                  style={{
                     fontFamily: 'MontRegular',
                     fontSize: 20,
                  }}
               >
                  Agendar um horário
               </Title>
            </Agendar>

            <NexContainer>
               <Text style={{ fontSize: 20, fontFamily: 'MontBold' }}>
                  Horário a seguir
               </Text>
            </NexContainer>

            <BodyContainer>
               {nexAg === undefined && (
                  <Title style={{ color: 'black', fontFamily: 'MontRegular' }}>
                     Sem horarios para hoje
                  </Title>
               )}
               {isToday(data) && nexAg && (
                  <FirstBox>
                     <BoxOne>
                        <UserAvatar
                           source={{ uri: nexAg.provider.avatar_url }}
                        />
                     </BoxOne>

                     <BoxT>
                        <Deteles>
                           <SimpleLineIcons name="note" size={24} />

                           <Hp style={{ fontFamily: 'MontRegular' }}>
                              {nexAg.service}
                           </Hp>
                        </Deteles>

                        <Deteles>
                           <MaterialIcons name="alarm" size={24} />
                           <Hp style={{ fontFamily: 'MontRegular' }}>
                              {formatd(
                                 nexAg.ano,
                                 nexAg.mes - 1,
                                 nexAg.dia,
                                 nexAg.from,
                              )}
                           </Hp>
                        </Deteles>

                        <Deteles>
                           <Feather name="trash-2" size={24} />
                           <ButtonDelet
                              onPress={() => {
                                 handleDelete(
                                    nexAg.dia,
                                    nexAg.mes,
                                    nexAg.ano,
                                    nexAg.from,
                                    nexAg.id,
                                 );
                              }}
                           >
                              <ButtonDeletText
                                 style={{
                                    color: `${cores.branco}`,
                                    fontFamily: 'MontBold',
                                 }}
                              >
                                 Desmarcar
                              </ButtonDeletText>
                           </ButtonDelet>
                        </Deteles>
                     </BoxT>
                  </FirstBox>
               )}
               <BoxAgenda
                  data={afterAgendamentos}
                  keyExtractor={h => h.id}
                  renderItem={({ item: h }) => (
                     <>
                        <HorariosContainer>
                           <HpContainer>
                              <Deteles>
                                 <SimpleLineIcons name="note" size={24} />

                                 <Hp style={{ fontFamily: 'MontBold' }}>
                                    {h.service}
                                 </Hp>
                              </Deteles>

                              <Deteles>
                                 <MaterialIcons name="alarm" size={24} />
                                 <Hp>
                                    {format(
                                       new Date(
                                          h.ano,
                                          h.mes - 1,
                                          h.dia,
                                          0,
                                          h.from,
                                          0,
                                       ),
                                       `dd/MM/yyyy 'as' HH:mm 'hs'`,
                                    )}
                                 </Hp>
                              </Deteles>

                              <Deteles>
                                 <Feather name="trash-2" size={24} />
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
                                    <ButtonDeletText
                                       style={{ fontFamily: 'MontBold' }}
                                    >
                                       Desmarcar
                                    </ButtonDeletText>
                                 </ButtonDelet>
                              </Deteles>
                           </HpContainer>
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
