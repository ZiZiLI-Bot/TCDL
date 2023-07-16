import { Box, Divider, Flex, HStack, Image, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { BoxFrame } from '../FrameMotion';
import MarkdownRender, { RenderMarkdownRawText } from '../MarkDownRender';

const sortIndex = (arr) => _.sortBy(arr, (o) => o.index);

const removeWhiteLine = (text) => {
  const removeWhiteLine = _.replace(text, /\n/g, '<br>');
  return _.replace(removeWhiteLine, /(<br>\s*)+/g, '<br>');
};

const convert = (text, dataReferences) => {
  return _.replace(removeWhiteLine(text), /\{\d+\}/g, (textReplace) => {
    const index = parseInt(textReplace.slice(1, -1));
    return `<div className="relative inline-block tooltip">
    <a className="hover:text-gray-400 text-blue-900 py-1 [${dataReferences[index - 1].link}]">[${index}]</a>
    <div className="flex p-2 bg-gray-300 rounded-md z-20 absolute left-1/2 -translate-x-1/2 invisible tooltip-item">
      <a className="text-white text-sm text-center w-52 [${dataReferences[index - 1].link}]">${
      dataReferences[index - 1].name
    }</a></div></div>`;
  });
};

export function RenderText({ title, text, inherit, thamKhao }) {
  return (
    <Box className='TextInline'>
      <Text fontWeight='bold' color='red' fontStyle={inherit ? 'inherit' : 'unset'}>
        • {title}:{' '}
      </Text>{' '}
      {}
      <MarkdownRender>{text ? convert(text, thamKhao) : 'Không.'}</MarkdownRender>
    </Box>
  );
}

export function RenderTextHide({ title, text, image, dotTitle, noMarginTop, thamKhao }) {
  const [hide, setHide] = useState(false);
  return (
    <Box mt={noMarginTop ? 0 : 3}>
      <Flex
        userSelect='none'
        onClick={() => setHide(text || image ? !hide : false)}
        cursor={text || image ? 'pointer' : 'default'}
        alignItems='center'
        justifyContent='space-between'
        mb={1}
      >
        {title ? (
          <Box className='TextInline'>
            <Text fontSize={19.5} fontWeight='bold' color='red'>
              {dotTitle ?? '•'} {title}
              {text ? ':' : '.'}
            </Text>{' '}
            {hide && (
              <Text color='gray.400' fontSize={13}>
                (More ...)
              </Text>
            )}
          </Box>
        ) : (
          <Divider />
        )}
        {(text || image?.length !== 0) && (
          <BoxFrame
            px={3}
            display='flex'
            alignItems='center'
            justifyContent='center'
            animate={{ rotate: hide ? 180 : 0 }}
          >
            <BsCaretDownFill style={{ marginRight: 10 }} />
          </BoxFrame>
        )}
      </Flex>

      {(text || image?.length !== 0) && (
        <BoxFrame
          layout
          initial={false}
          transition={{ duration: 0.2 }}
          animate={{
            height: 'auto',
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
        >
          {!hide ? (
            <Box
              display={image?.length > 1 ? 'block' : 'flex'}
              justifyContent={!text && image?.length !== 0 ? 'center' : 'space-between'}
            >
              {text && (
                <Box className='indent'>
                  <MarkdownRender>{convert(text, thamKhao)}</MarkdownRender>
                </Box>
              )}
              {image?.length !== 0 && (
                <>
                  {image?.length <= 1 ? (
                    <LazyLoadImage
                      style={{ maxWidth: '500px', maxHeight: '750px' }}
                      alt={text}
                      effect='blur'
                      src={image[0]?.url}
                    />
                  ) : (
                    <HStack wrap='wrap'>
                      {sortIndex(image)?.map((item) => (
                        <Image
                          p={2}
                          style={{ maxWidth: '500px', maxHeight: '750px' }}
                          alt={text}
                          src={item.url}
                          key={item.index}
                        />
                      ))}
                    </HStack>
                  )}
                </>
              )}
            </Box>
          ) : (
            <Divider />
          )}
        </BoxFrame>
      )}
    </Box>
  );
}

export function RenderTextArr({ title, arr, thamKhao }) {
  return (
    <Box my={6}>
      <Text fontSize={19.5} fontWeight='bold' color='red'>
        • {title}:{' '}
      </Text>
      {arr?.map((item, index) => (
        <RenderTextHide
          noMarginTop={true}
          dotTitle={false}
          key={item.name}
          inherit={true}
          title={`${index + 1}. ${item.name}`}
          text={item.detail}
          image={item.image}
          thamKhao={thamKhao}
        />
      ))}
      <Divider mt={4} />
    </Box>
  );
}

export function RenderTextRaw({ thamKhao, text }) {
  return (
    <Box my={6}>
      <Divider my={4} />
      <RenderMarkdownRawText>{convert(text, thamKhao)}</RenderMarkdownRawText>
    </Box>
  );
}
