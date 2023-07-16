/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import _ from 'lodash';
import Markdown from 'markdown-to-jsx';
import React, { startTransition, useRef, useState } from 'react';
import { BsArrowReturnRight, BsSearch, BsXCircle } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../helpers/API/axiosClient';
import { BoxFrame } from '../FrameMotion';

function convertToUnsigned(str) {
  const from = 'àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ';
  const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeediiiiiooooooooooooooooouuuuuuuuuuuyyyyy';
  let result = '';
  for (let i = 0; i < str.length; i++) {
    let charIndex = from.indexOf(str[i]);
    if (charIndex !== -1) {
      result += to[charIndex];
    } else {
      result += str[i];
    }
  }
  return result;
}

export default function SearchBar({ size }) {
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  const navigation = useNavigate();

  const clearSearch = () => {
    inputRef.current.value = '';
    setInputValue('');
    setDataSearch([]);
  };

  const redirect = (slug) => {
    inputRef.current.value = '';
    setInputValue('');
    setDataSearch([]);
    navigation(`/medicine/${slug}`);
  };

  const handlerSearch = _.debounce((e) => {
    startTransition(() => {
      setInputValue(e.target.value);
      const fetchData = async () => {
        setLoading(true);
        if (e.target.value !== '') {
          const url = `/search/${convertToUnsigned(e.target.value.toLowerCase())}?limit=10`;
          const res = await axiosClient.get(url);
          setDataSearch(res.data);
        } else {
          setDataSearch([]);
        }
        setLoading(false);
      };
      fetchData();
    });
  }, 500);

  return (
    <Box zIndex={10} pos='relative' minW='680px'>
      <InputGroup size='md'>
        <Input
          ref={inputRef}
          pr='4.5rem'
          pl='2.5rem'
          placeholder='Tìm kiếm: ... (VD: Bạch chỉ, Angelica dahurica, ...)'
          onChange={(e) => handlerSearch(e)}
          autoComplete='off'
          size={size}
          _placeholder={size ? { opacity: 1, color: 'gray.500' } : { opacity: 0.5, color: 'gray.500' }}
          borderColor={size ? 'gray.500' : 'gray.400'}
        />
        {inputValue !== '' && (
          <InputLeftElement
            mt={size ? 1 : 0}
            cursor='pointer'
            onClick={clearSearch}
            children={<BsXCircle color='gray.300' />}
          />
        )}
        <InputRightElement mt={size ? 1 : 0} width='4.5rem' cursor='pointer' onClick={() => console.log(dataSearch)}>
          <BsSearch />
        </InputRightElement>
      </InputGroup>
      {loading && <Progress mt={1} size='xs' isIndeterminate />}
      <BoxFrame
        pos='absolute'
        rounded='md'
        zIndex={100}
        overflow='auto'
        maxH={620}
        mt={6}
        w='full'
        h={28}
        layout
        boxShadow='0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
        bg='#FBFBFB'
        initial={{
          height: 0,
          opacity: 0,
        }}
        animate={{
          height: 'auto',
          opacity: 1,
        }}
        exit={{
          height: 0,
          opacity: 0,
        }}
      >
        {dataSearch.length !== 0 &&
          dataSearch.map((item) => <ItemSearch redirect={redirect} key={item.id} data={item} />)}
      </BoxFrame>
    </Box>
  );
}

const ItemSearch = ({ data, redirect }) => {
  const { DuocLieu, HinhAnh, Slug, TenKhoaHoc } = data;
  return (
    <Card onClick={() => redirect(Slug)} mx={2} my={3} minH='128px' direction='row' overflow='hidden' cursor='pointer'>
      <LazyLoadImage
        
        style={{ borderRadius: 10, width: '25%', objectFit: 'cover', maxHeight: '165px' }}
        src={HinhAnh[0].image}
      />
      <Stack ml='10px'>
        <CardBody>
          <Text fontSize='3xl' fontWeight='bold'>
            {DuocLieu}
          </Text>
          <Text fontStyle='italic' maxW='400px' noOfLines={2}>
            <Markdown>{TenKhoaHoc}</Markdown>
          </Text>
        </CardBody>
      </Stack>
      <Box pos='absolute' right={8} bottom='38%'>
        <BsArrowReturnRight size={22} />
      </Box>
    </Card>
  );
};
