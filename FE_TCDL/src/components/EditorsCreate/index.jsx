/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Text as ChakraText,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { EditorState, Modifier, convertFromRaw, convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import React, { startTransition, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BsUpload } from 'react-icons/bs';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './EditorsCreate.module.css';

const toolbar = {
  options: ['inline', 'history'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic'],
  },
};

export function InputPure({ data, type, array, title, placeholder }) {
  const handlerChange = (e) => {
    startTransition(() => {
      if (array) {
        data[type] = e.target.value.split(',');
      } else {
        data[type] = e.target.value;
      }
    });
  };
  return (
    <Box my={2}>
      <ChakraText fontWeight='bold' fontSize={16}>
        {title}:
      </ChakraText>
      <Input maxW='400px' variant='outline' placeholder={placeholder} onChange={(e) => handlerChange(e)} />
    </Box>
  );
}

export function EditorsCreate({ data, type, title, placeholder, markdownText }) {
  const [editorState, setEditorState] = useState(
    markdownText
      ? EditorState.createWithContent(convertFromRaw(markdownToDraft(markdownText)))
      : EditorState.createEmpty(),
  );

  const handlePastedText = (text, html, editorState) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const withoutStylesContentState = Modifier.removeInlineStyle(contentState, selectionState, [
      'FONTFAMILY',
      'FONTSIZE',
      'COLOR',
      'BGCOLOR',
    ]);

    // Tạo EditorState mới từ contentState đã loại bỏ định dạng
    const newEditorState = EditorState.push(editorState, withoutStylesContentState, 'remove-formatting');
    setEditorState(newEditorState);
  };

  const rawContent = convertToRaw(editorState.getCurrentContent());
  const textToMarkDown = draftToMarkdown(rawContent);

  startTransition(() => {
    data[type] = textToMarkDown;
  });

  return (
    <Box maxW='400px' my={3}>
      <ChakraText fontWeight='bold' fontSize={16}>
        {title}:
      </ChakraText>
      <Editor
        editorState={editorState}
        toolbar={toolbar}
        placeholder={placeholder}
        toolbarClassName={styles.toolbarClassName}
        wrapperClassName={styles.wrapperClassName}
        editorClassName={styles.editorClassName}
        onEditorStateChange={setEditorState}
        handlePastedText={handlePastedText}
      />
    </Box>
  );
}

export const ArrayEditorsCreate = ({ data, type, title, placeholder, markdownText, objData }) => {
  const [arrState, setArrState] = useState(objData ? [objData] : []);
  const handleAddState = () => {
    setArrState((prev) => [...prev, objData]);
  };

  const handleRemoveState = () => {
    if (arrState.length === 1) return;
    setArrState((prev) => {
      const newArr = [...prev];
      newArr.pop();
      return newArr;
    });
  };

  useEffect(() => {
    startTransition(() => {
      data[type] = arrState;
    });
  }, [arrState]);

  return (
    <>
      <Box mb={16}>
        <ChakraText lineHeight={6} fontWeight='bold' fontSize={16}>
          {title}:
        </ChakraText>
        {arrState.map((item, index) => (
          <>
            <HStack my={2} key={index} alignItems='stretch'>
              <Box flex={2}>
                <InputPureForArray state={arrState} setState={setArrState} indexArr={index} title='Tên' />
                <EditorsCreateForArray setState={setArrState} indexArr={index} title='Nội dung' />
              </Box>
              <UploadImageComponent setState={setArrState} indexArr={index} />
            </HStack>
            <Divider />
          </>
        ))}
        <Button my={2} mx={2} onClick={handleAddState} float='right' variant='outline' color='green.400'>
          +
        </Button>
        {arrState.length > 1 && (
          <Button my={2} onClick={handleRemoveState} float='right' variant='outline' color='red.400'>
            -
          </Button>
        )}
      </Box>
    </>
  );
};

function EditorsCreateForArray({ setState, indexArr, title, markdownText }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handlePastedText = (text, html, editorState) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const withoutStylesContentState = Modifier.removeInlineStyle(contentState, selectionState, [
      'FONTFAMILY',
      'FONTSIZE',
      'COLOR',
      'BGCOLOR',
    ]);

    // Tạo EditorState mới từ contentState đã loại bỏ định dạng
    const newEditorState = EditorState.push(editorState, withoutStylesContentState, 'remove-formatting');
    setEditorState(newEditorState);
  };

  const handleChangeEditor = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const textToMarkDown = draftToMarkdown(rawContent);
    startTransition(() => {
      setState((prev) => {
        const newArr = [...prev];
        newArr[indexArr] = { ...newArr[indexArr], detail: textToMarkDown };
        return newArr;
      });
    });
  };

  return (
    <Box>
      <ChakraText ml={3} fontWeight='bold' fontSize={14}>
        {title}:
      </ChakraText>
      <Editor
        editorState={editorState}
        toolbar={toolbar}
        toolbarClassName={styles.toolbarClassName}
        wrapperClassName={styles.wrapperClassName}
        editorClassName={styles.editorClassName}
        onEditorStateChange={setEditorState}
        onChange={handleChangeEditor}
        handlePastedText={handlePastedText}
      />
    </Box>
  );
}

function InputPureForArray({ state, setState, indexArr, title }) {
  const handlerChangeInput = (text) => {
    startTransition(() => {
      const updateState = [...state];
      updateState[indexArr] = { ...updateState[indexArr], name: text };
      setState(updateState);
    });
  };
  return (
    <Box>
      <ChakraText ml={3} fontWeight='bold' fontSize={14}>
        {title}:
      </ChakraText>
      <Input variant='outline' onChange={(e) => handlerChangeInput(e.target.value)} />
    </Box>
  );
}

export function UploadImageComponent({ setState, indexArr, objData }) {
  const [images, setImages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const updateImage = () => {
      if (setState && !objData) {
        setState((prev) => {
          const newArr = [...prev];
          newArr[indexArr] = { ...newArr[indexArr], images: images };
          return newArr;
        });
      } else {
        const imagesList = images.map((item) => {
          return { ...item, title: '' };
        });
        objData.HinhAnh = imagesList;
      }
    };
    updateImage();
  }, [images]);

  const updateTitleImage = (index, title) => {
    if (objData) {
      startTransition(() => {
        objData.HinhAnh[index].title = title;
      });
    }
  };

  const handleUpImages = (e) => {
    const URLImage = [];
    setImages((prev) => {
      console.log(e.target.files);
      if (e.target.files.length > 0) {
        for (let i = 0; i < e.target.files.length; i++) {
          URLImage.push({ host: true, url: URL.createObjectURL(e.target.files[i]) });
        }
        return [...URLImage];
      } else {
        return prev;
      }
    });
  };
  const handleAddImage = (e) => {
    setImages((prev) => {
      const URLImage = [];
      for (let i = 0; i < e.target.files.length; i++) {
        URLImage.push({ host: true, url: URL.createObjectURL(e.target.files[i]) });
      }
      return [...prev, ...URLImage];
    });
  };
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((item, i) => i !== index));
  };
  const handleRemoveAllImage = () => {
    setImages([]);
  };
  return (
    <Box position='relative' flex={1} style={{ border: '1px dotted #48bb78', borderRadius: '5px' }} cursor='pointer'>
      {images.length <= 0 && (
        <Input
          onChange={(e) => handleUpImages(e)}
          type='file'
          w='full'
          h='full'
          zIndex={2}
          cursor='pointer'
          opacity={0}
          multiple
          accept='image/*'
        />
      )}
      <Box className='boxCenter'>
        <BsUpload className='mr-auto w-full' color='#48bb78' size={22} />
        {images.length <= 0 ? (
          <ChakraText textAlign='center' fontSize={9} lineHeight={4}>
            Cập nhật hình ảnh
          </ChakraText>
        ) : (
          <Box>
            <ChakraText textAlign='center' fontSize={9} lineHeight={4}>
              {images.length} hình ảnh được chọn
            </ChakraText>
            <Box mt={1} zIndex={4}>
              <Flex>
                <Button colorScheme='blue' size='xs' onClick={onOpen}>
                  Preview
                </Button>
                <Button colorScheme='green' size='xs' pos='relative'>
                  <Input
                    onChange={(e) => handleAddImage(e)}
                    type='file'
                    pos='absolute'
                    zIndex={2}
                    cursor='pointer'
                    opacity={0}
                    multiple
                    accept='image/*'
                  />
                  Thêm hình
                </Button>
              </Flex>
              <Button m='auto' colorScheme='red' w='full' size='xs' onClick={handleRemoveAllImage}>
                Xóa toàn bộ
              </Button>
            </Box>
          </Box>
        )}
        <Modal isOpen={isOpen} size='xl' onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader style={{ userSelect: 'none' }}>Image Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Swiper navigation={true} modules={[Navigation]}>
                  {images.map((item, index) => (
                    <SwiperSlide key={index} style={{ userSelect: 'none' }}>
                      <Flex minH='600px' flexDir='column' alignItems='center' justifyContent='space-between'>
                        <Image objectFit='cover' maxH='500px' src={item.url} />
                        {objData && (
                          <Input
                            placeholder='Nhập tiêu đề hình ảnh'
                            mt={3}
                            defaultValue={objData.HinhAnh[index]?.title}
                            onChange={(e) => updateTitleImage(index, e.target.value)}
                          />
                        )}
                      </Flex>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='red' onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
