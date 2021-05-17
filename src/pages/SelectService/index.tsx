import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useCallback, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

import {
   ServiceContainer,
   Container,
   Box,
   ServiceText,
   Description,
   Title,
   Header,
   HeaderTitle,
   BoxContainer,
   TextDescription,
   BackButton,
   HomeContainer,
   Linear,
} from './styles';

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
      navigate('Dashboard');
   }, [navigate]);

   useEffect(() => {
      api.get(`/${providerId}/list`).then(response => {
         setRespost(response.data);
      });
   }, [providerId]);

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
               <HomeContainer onPress={handleBackToHome}>
                  <Feather name="home" size={28} color="#f3f3f3" />
               </HomeContainer>
            </Linear>
         </Header>

         <Title>Escolha um serviço</Title>

         <ServiceContainer
            data={respost}
            keyExtractor={service => service.service}
            renderItem={({ item: service }) => (
               <BoxContainer
                  onPress={() =>
                     navigateToCreateAppointment(service.service, providerId)
                  }
               >
                  <Box>
                     <ServiceText>{service.service}</ServiceText>
                     <Description>Descrição: {service.description}</Description>
                     <TextDescription>Duração: {service.time}</TextDescription>
                     <Description>R$ {service.value}</Description>
                  </Box>
               </BoxContainer>
            )}
         />
      </Container>
   );
};

export default SelectService;
