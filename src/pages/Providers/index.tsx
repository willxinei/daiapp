/* eslint-disable camelcase */
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import {
   Container,
   Header,
   HeaderTitle,
   ListContainer,
   ProviderContainer,
   ProviderName,
   ProviderList,
   ProviderInfo,
   ProviderAvatar,
   ProviderMeta,
   ProviderMetaText,
   Title,
   BackButton,
   HomeContainer,
   Linear,
} from './styles';
import api from '../../services/api';

export interface Provider {
   id: string;
   name: string;
   avatar_url: string;
}

const Prestadores: React.FC = () => {
   const [provider, setProvider] = useState<Provider[]>([]);
   const { navigate, goBack } = useNavigation();

   const navigaeTotCreateAppointment = useCallback(
      (providerId: string) => {
         navigate('SelectService', { providerId });
      },
      [navigate],
   );

   const handleBackToHome = useCallback(() => {
      navigate('Dashboard');
   }, [navigate]);

   useEffect(() => {
      api.get('agendamento/me/prestador/list').then(respose => {
         setProvider(respose.data);
      });
   }, []);
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

         <Title>Prestadores</Title>

         <ListContainer>
            <ProviderList
               showsHorizontalScrollIndicator
               data={provider}
               keyExtractor={provider => provider.id}
               renderItem={({ item: provider }) => (
                  <ProviderContainer
                     onPress={() => navigaeTotCreateAppointment(provider.id)}
                  >
                     <ProviderAvatar
                        source={{ uri: `http://${provider.avatar_url}` }}
                     />
                     <ProviderInfo>
                        <ProviderName>{provider.name}</ProviderName>

                        <ProviderMeta>
                           <Feather name="calendar" size={18} color="#FF31A0" />
                           <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                        </ProviderMeta>

                        <ProviderMeta>
                           <Feather name="clock" size={18} color="#FF31A0" />
                           <ProviderMetaText>13h às 19h</ProviderMetaText>
                        </ProviderMeta>
                     </ProviderInfo>
                  </ProviderContainer>
               )}
            />
         </ListContainer>
      </Container>
   );
};

export default Prestadores;
