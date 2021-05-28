import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useCallback, useState } from 'react';
import { Feather, Fontisto } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import FontLoading from 'expo-app-loading';
import api from '../../services/api';
import logo from '../../assets/fundo.png';

import {
   ServiceContainer,
   Container,
   Box,
   ServiceText,
   Description,
   Title,
   Header,
   BoxContainer,
   TextDescription,
   BackButton,
   HomeContainer,
} from './styles';
import { Fundo } from '../Home/styles';
import { Fonts } from '../../utils/ferramentas';

interface RouteParams {
   providerId: string;
}

export interface Response {
   service: string;
   providerId: string;
   time: string;
   value: number;
   description: string;
}

const SelectService: React.FC = () => {
   const route = useRoute();
   const { navigate, goBack } = useNavigation();
   const { providerId } = route.params as RouteParams;

   // const [selectService, setService] = useState('');
   const [respost, setRespost] = useState<Response[]>([]);

   const navigateToCreateAppointment = useCallback(
      (service: string, providerId: string) => {
         navigate('CreateAgendamento', { service, providerId });
      },
      [navigate],
   );

   const handleBackToHome = useCallback(() => {
      navigate('Home');
   }, [navigate]);

   useEffect(() => {
      api.get(`/${providerId}/list`).then(response => {
         setRespost(response.data);
      });
   }, [providerId]);

   const styles = StyleSheet.create({
      box: {
         shadowColor: '#8f2d2d',
         shadowOpacity: 0.58,
         shadowOffset: {
            width: 0,
            height: 12,
         },
         shadowRadius: 16,
         elevation: 25,
      },
   });

   const font = Fonts();
   if (!font) {
      return <FontLoading />;
   }

   return (
      <Container>
         <Fundo source={logo} />
         <Header>
            <BackButton onPress={goBack}>
               <Feather name="chevron-left" size={35} color="black" />
            </BackButton>

            <HomeContainer onPress={handleBackToHome}>
               <Fontisto name="home" size={40} color="black" />
            </HomeContainer>
         </Header>

         <Title style={{ fontFamily: 'MontBold' }}>Escolha um serviço</Title>

         <ServiceContainer
            data={respost}
            keyExtractor={service => service.service}
            renderItem={({ item: service }) => (
               <BoxContainer
                  style={styles.box}
                  onPress={() =>
                     navigateToCreateAppointment(service.service, providerId)
                  }
               >
                  <Box>
                     <ServiceText style={{ fontFamily: 'MontBold' }}>
                        {service.service}
                     </ServiceText>
                     <Description style={{ fontFamily: 'MontRegular' }}>
                        {' '}
                        {service.description}
                     </Description>
                     <Description style={{ fontFamily: 'MontBold' }}>
                        Duração: <Text>{service.time}h</Text>
                     </Description>
                     <Description style={{ fontFamily: 'MontBold' }}>
                        R$ {service.value}
                     </Description>
                     <View
                        style={{
                           alignItems: 'flex-end',
                           paddingRight: 20,
                           justifyContent: 'center',
                           width: '100%',
                        }}
                     >
                        <TextDescription style={{ fontFamily: 'MontBold' }}>
                           Agende já um horário!
                        </TextDescription>
                     </View>
                  </Box>
               </BoxContainer>
            )}
         />
      </Container>
   );
};

export default SelectService;
