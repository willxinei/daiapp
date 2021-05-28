import { useNavigation } from '@react-navigation/core';
import AppLoading from 'expo-app-loading';
import React, { useCallback, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import api from '../../services/api';
import { Fonts } from '../../utils/ferramentas';
import { Button, Container, ContainerInput, TextButoon, Title } from './styles';

const SendMail: React.FC = () => {
   const [mail, setMail] = useState('');

   const { navigate } = useNavigation();

   const handleSubmit = useCallback(async () => {
      try {
         await api.post('/forgot', {
            email: mail,
         });

         Alert.alert('Email envidao com sucesso');

         navigate('Forgot');
      } catch (err) {
         Alert.alert('Email incorreto');
      }
   }, [mail]);

   console.log(mail);

   const font = Fonts();
   if (!font) {
      return <AppLoading />;
   }
   return (
      <Container>
         <Title style={{ fontFamily: 'MontBold' }}>Esqueceu sua senha?</Title>
         <Title>
            Não se preocupe, basta vocẽ enviar seu email para recuperar-la
         </Title>

         <ContainerInput>
            <TextInput
               placeholder="Email"
               value={mail}
               onChangeText={setMail}
               keyboardType="email-address"
            />
         </ContainerInput>

         <Button onPress={handleSubmit}>
            <TextButoon style={{ fontFamily: 'MontBlack' }}>Enviar</TextButoon>
         </Button>
      </Container>
   );
};
export default SendMail;
