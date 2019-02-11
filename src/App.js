import React, { useState, useRef } from 'react';
import { Heading, Flex, Box, Button } from 'rebass';
import styled from 'styled-components/macro';
import { saveSvgAsPng } from 'save-svg-as-png';

import { Input, GlobalStyle, Meme } from './components';
import { getRandomMeme } from './memes';

const onLabelChange = setter => ({ currentTarget: { value } }) => setter(value);

const onFileInputChange = setter => ({
  currentTarget: {
    files: [file],
  },
}) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = () => setter(reader.result);
    reader.readAsDataURL(file);
  }
};

const MemeContainer = styled(Box)`
  position: relative;
`;

const App = () => {
  const [topLabel, setTopLabel] = useState('One does not simply...');
  const [bottomLabel, setBottomLabel] = useState('One does not simply...');
  const [imageSrc, setImageSrc] = useState(getRandomMeme());
  const ref = useRef(null);

  return (
    <>
      <GlobalStyle />
      <Heading>ST6 Meme Generator</Heading>
      <Heading as="h3">Do the most meaningful meme of your life</Heading>
      <Flex mx={2}>
        <MemeContainer px={2}>
          <Meme {...{ imageSrc, topLabel, bottomLabel, ref }} />
        </MemeContainer>
        <Box width={1 / 2} px={2}>
          <Flex flexDirection="column">
            <Flex>
              <Button onClick={() => setImageSrc(getRandomMeme(imageSrc))}>
                Random meme
              </Button>
              <Input type="file" onChange={onFileInputChange(setImageSrc)} />
            </Flex>
            <Input
              placeholder="Top"
              value={topLabel}
              onChange={onLabelChange(setTopLabel)}
            />
            <Input
              placeholder="Bottom"
              value={bottomLabel}
              onChange={onLabelChange(setBottomLabel)}
            />
          </Flex>
          <Button onClick={() => saveSvgAsPng(ref.current, 'meme.png')}>
            Download
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default App;
