/* eslint-disable react-refresh/only-export-components */
import { Link, Text } from '@chakra-ui/react';
import Markdown from 'markdown-to-jsx';
import React from 'react';

export const RenderMarkdownRawText = ({ children }) => {
  const MarkdownOption = {
    overrides: {
      strong: ({ children }) => {
        return (
          <Text color='red' fontWeight='bold' display='inline-block'>
            • {children}
          </Text>
        );
      },
      a: ({ children, ...props }) => {
        // get url in className
        const start = props.className.indexOf('[') + 1;
        const end = props.className.indexOf(']');
        const url = props.className.slice(start, end);

        return (
          <Link
            className='underline'
            color='blue.600'
            target='_blank'
            rel='noreferrer'
            {...props}
            href={url !== '' ? url : null}
          >
            {children}
          </Link>
        );
      },
    },
  };
  return <Markdown options={MarkdownOption}>{children}</Markdown>;
};

export default function MarkdownRender({ children }) {
  const MarkdownOption = {
    overrides: {
      a: ({ children, ...props }) => {
        // get url in className
        const start = props.className.indexOf('[') + 1;
        const end = props.className.indexOf(']');
        const url = props.className.slice(start, end);

        return (
          <Link
            className='underline'
            color='blue.600'
            target='_blank'
            rel='noreferrer'
            {...props}
            href={url !== '' ? url : null}
          >
            {children}
          </Link>
        );
      },
    },
  };
  return <Markdown options={MarkdownOption}>{children}</Markdown>;
}
