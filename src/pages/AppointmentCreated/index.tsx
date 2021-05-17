import { useNavigation, useRoute } from '@react-navigation/native';
import ptBr, { format } from 'date-fns';

import React, { useCallback, useMemo } from 'react';
import { Feather } from '@expo/vector-icons';
import {
   Container,
   Title,
   Description,
   OkButton,
   OkButtonText,
} from './styled';

interface RouteParams {
   date: number;
}

const AgendamentoCriado: React.FC = () => {
   const { reset } = useNavigation();
   const { params } = useRoute();

   const routeParams = params as RouteParams;

   const handleOkButton = useCallback(() => {
      reset({
         routes: [{ name: 'Home' }],
         index: 0,
      });
   }, [reset]);

   const formattedDate = useMemo(() => {
      return format(
         routeParams.date,
         "EEEE', dia' dd 'de' MMMM 'de' yyyy 'ás' HH:mm'h'",
         { locale: ptBr },
      );
   }, [routeParams]);

   return (
      <Container>
         <Feather name="check" size={80} color="#04d361" />

         <Title>Agendamento concluido</Title>
         <Description>{formattedDate}</Description>

         <OkButton onPress={handleOkButton}>
            <OkButtonText>Ok</OkButtonText>
         </OkButton>
      </Container>
   );
};

export default AgendamentoCriado;
