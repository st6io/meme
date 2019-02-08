import React, { useState, useRef } from 'react';
import { Heading, Flex, Box, Button, Image } from 'rebass';
import styled from 'styled-components/macro';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import { Input, MemeText, GlobalStyle } from './components';
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

const download = async element => {
  const blob = await domtoimage.toJpeg(element);
  saveAs(blob, 'meme.jpg');
};

const MemeContainer = styled(Box)`
  position: relative;
  max-width: 600px;
`;

const App = () => {
  const [topLabel, setTopLabel] = useState('');
  const [bottomLabel, setBottomLabel] = useState('');
  const [imageSrc, setImageSrc] = useState(getRandomMeme());
  const imageRef = useRef(null);

  return (
    <>
      <GlobalStyle />
      <Heading>ST6 Meme Generator</Heading>
      <Heading as="h3">Do the most meaningful meme of your life</Heading>
      <Flex mx={-2}>
        <MemeContainer px={2} ref={imageRef}>
          <MemeText p={2} verticalAlign="top">
            {topLabel}
          </MemeText>
          <MemeText p={2} verticalAlign="bottom">
            {bottomLabel}
          </MemeText>
          <Image src={imageSrc} />
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
          <Button onClick={() => download(imageRef.current)}>Download</Button>
        </Box>
      </Flex>
    </>
  );
};

export default App;

//fontSize={Math.min(1400 / topLabel.length, 36)}

// What would st6er do when sees this Christmas sign?
// Just turn it around, so it becomes ƛ . ƒλ
