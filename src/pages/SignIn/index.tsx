/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Tilte, BackContainer, ImageLogo, LogText } from './styles';
import Input from '../../components/Input';
import Logo from '../../assets/Lg.png';
import { useAuth } from '../../hooks/AuthContext';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationsErrors';

interface SignInFormData {
   email: string;
   password: string;
}

const SingIn: React.FC = () => {
   const { signIn } = useAuth();
   const { navigate } = useNavigation();
   const formRef = useRef<FormHandles>(null);

   const handleSignIn = useCallback(
      async (data: SignInFormData) => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               email: Yup.string()
                  .required('E-mail obrigatório')
                  .email('E-mail invalido'),
               password: Yup.string().min(6, 'Senha no minimo 6 digitos'),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            await signIn({
               email: data.email,
               password: data.password,
            });
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);
            }

            Alert.alert(
               'Erro na autenticação',
               'Ocorreu um erro ao fazer login',
            );
         }
      },
      [signIn],
   );

   const navigateToSingUp = useCallback(() => {
      navigate('SignUp');
   }, [navigate]);

   return (
      <>
         <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
         >
            <Container>
               <ImageLogo source={Logo} />

               <LogText>DESIGNER</LogText>
               <LogText>DE UNHAS</LogText>

               <Tilte>Faça o login</Tilte>

               <Form ref={formRef} onSubmit={handleSignIn}>
                  <Input
                     name="email"
                     icon="mail"
                     placeholder="E-mail"
                     keyboardType="email-address"
                     autoCapitalize="none"
                  />
                  <Input
                     name="password"
                     icon="lock"
                     placeholder="Senha"
                     secureTextEntry
                  />

                  <Button
                     onPress={() => {
                        formRef.current?.submitForm();
                     }}
                  >
                     Entrar
                  </Button>
               </Form>
            </Container>
         </ScrollView>
         <BackContainer onPress={navigateToSingUp}>
            <Feather name="log-out" size={20} />
            <Tilte style={{ marginLeft: 15, marginTop: 0 }}>
               Criar uma conta
            </Tilte>
         </BackContainer>
      </>
   );
};

export default SingIn;
