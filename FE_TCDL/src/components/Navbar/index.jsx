import { Box, Flex, Tooltip } from '@chakra-ui/react';
import React from 'react';
import SearchBar from '../SearchBar';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate('/');
  };
  return (
    <Flex
      bg='white'
      zIndex={100}
      pos='fixed'
      w='full'
      h={14}
      dir='row'
      px='10%'
      alignItems='center'
      justifyContent='center'
    >
      <Tooltip label='Back to home'>
        <Box pos='absolute' left={10} border='2px' rounded='full' cursor='pointer' onClick={handleBackHome}>
          <MdOutlineArrowBack size={30} style={{ padding: 3 }} />
        </Box>
      </Tooltip>
      <SearchBar />
    </Flex>
  );
}
