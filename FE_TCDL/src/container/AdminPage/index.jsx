import { Box, Button } from '@chakra-ui/react';
import _ from 'lodash';
import React, { startTransition, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TurndownService from 'turndown';
import axiosClient from '../../helpers/axiosClient';
import DataTestCoYemLaBong from '../../constants/TestAPI';

const turndownService = new TurndownService();

export default function AdminPage() {
  const quillRef = useRef(null);
  const [value, setValue] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [testRen, setTestRen] = useState('');
  const handlerChance = (e) => {
    startTransition(() => {
      setValue(e);
      // setMarkdown(turndownService.turndown(e));
      console.log(e);
      console.log(turndownService.turndown(e));
    });
  };
  const convert = (value) => {
    function insertFootnotes(text, dataReferences) {
      return _.replace(text, /\{\d+\}/g, (index) => {
        const references = parseInt(index.slice(1, -1));
        return `<div className='group relative inline-block'><p className='bg-primary inline-flex rounded py-2 text-base font-semibold text-blue-800'>[${references}]</p><a className='absolute w-72 bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 rounded bg-gray-700 py-2 px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100  [${
          dataReferences[references - 1].link
        }]'><span className='absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-gray-700'></span>${
          dataReferences[references - 1].name
        }</a></div>`;
      });
    }
    // console.log(insertFootnotes(value, dataReferences));
    setTestRen(insertFootnotes(value, dataReferences));
  };

  const testCreateData = async () => {
    const url = '/medicine';
    const res = await axiosClient.post(url, DataTestCoYemLaBong);
    console.log(res);
  };
  return (
    <Box>
      <Box w='500px' h='500px'>
        <ReactQuill
          theme='snow'
          ref={quillRef}
          style={{ height: '100%' }}
          value={value}
          onChange={(e) => handlerChance(e)}
          // onBlur={(e) => handlerChance(e)}
        />
        {/* <Button onClick={() => convert(value)}>Convert</Button> */}

        {/* <Box mt={10}>
        <QuillEditor />
      </Box> */}
      </Box>
      <Button mt={10} variant='solid' onClick={testCreateData}>
        Test API
      </Button>
    </Box>
  );
}
