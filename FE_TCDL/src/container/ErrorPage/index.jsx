import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <VStack alignItems='center' spacing={16} justifyContent='center' h='100vh'>
      <Text fontWeight='bold' fontSize={100}>
        404
      </Text>
      <Box alignItems='flex-end'>
        <Text fontSize={90} lineHeight='70px'>
          Nothing
        </Text>
        <Text float='right' mt={6} lineHeight={5} fontSize={30}>
          in here!
        </Text>
      </Box>
      <Link to='/'>
        <Button colorScheme='green'>Back to Home</Button>
      </Link>
    </VStack>
  );
}
