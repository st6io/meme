import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { Heading, Card, Flex, Box, Button } from 'rebass';
import styled, { ThemeProvider } from 'styled-components/macro';
import { FaUpload, FaRandom, FaGithub, FaLink } from 'react-icons/fa';
import { saveSvgAsPng } from 'save-svg-as-png';
import { useMedia } from 'use-media';

import {
  GlobalStyle,
  Meme,
  Input,
  Badge,
  Logo,
  themes,
  ImageUrlInput,
} from './components';
import { getRandomMeme } from './memes';
import { websiteUrl, githubUrl } from './utils/links';
import isImageUrl from './utils/is-image-url';

const onTextInputChange = setter => ({ target: { value } }) => setter(value);

const onFileInputChange = setter => ({
  target: {
    files: [file],
  },
}) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = () => setter(reader.result);
    reader.readAsDataURL(file);
  }
};

const MemeContainer = styled(Flex)`
  position: relative;
`;

const DEFAULT_IMG_URL = '';

const bypassCorsUrl = url => `https://meme.st6.io/meme-image?imageUrl=${url}`;

const App = () => {
  const isMobile = useMedia({ maxWidth: '40em' });
  const [theme, setTheme] = useState('light');
  const [urlInputVisible, setUrlInputVisible] = useState(false);
  const [topLabel, setTopLabel] = useState('Do the most meaningful meme...');
  const [bottomLabel, setBottomLabel] = useState('...of your life');
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMG_URL);
  const [imageSrc, setImageSrc] = useState(getRandomMeme());
  const ref = useRef(null);

  const hideUrlInput = useCallback(() => {
    setImageUrl(DEFAULT_IMG_URL);
    setUrlInputVisible(false);
  }, []);

  useLayoutEffect(
    () => {
      if (urlInputVisible && isImageUrl(imageUrl)) {
        const downloadImageUrl = bypassCorsUrl(imageUrl);
        if (imageSrc === downloadImageUrl) {
          hideUrlInput();
        } else {
          setImageSrc(downloadImageUrl);
        }
      }
    },
    // We don't want to invoke this effect
    // if only `imageSrc` changes, because the effect
    // will be executed on the render after image url has been
    // applied as image source which would hide the input
    // even though the image might not be loaded, yet
    /* eslint-disable react-hooks/exhaustive-deps */ [
      urlInputVisible,
      imageUrl,
      hideUrlInput,
    ],
  );

  return (
    <ThemeProvider theme={themes[theme]}>
      <>
        <GlobalStyle />

        <Card variant="primary" width={[352, 602]} mx="auto" my={3} pt={3}>
          <Flex alignItems="center" px={3}>
            <Button
              variant="link"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Logo />
            </Button>

            <Heading mx={2} mb={1} fontSize={[1, 4]}>
              Meme Generator
            </Heading>

            <Button
              variant="link"
              as="a"
              href={githubUrl}
              target="_blank"
              title="View source code"
            >
              <FaGithub />
            </Button>

            <Box mx="auto" />

            <Button
              variant="link"
              as="a"
              href={`${websiteUrl}careers/`}
              target="_blank"
            >
              <Badge variant="primary">We&apos;re hiring</Badge>
            </Button>
          </Flex>
          <Flex flexDirection="column" px={3} pt={3}>
            <Input
              variant="primary"
              placeholder="Top text"
              value={topLabel}
              onChange={onTextInputChange(setTopLabel)}
            />
            <Input
              variant="primary"
              placeholder="Bottom text"
              value={bottomLabel}
              onChange={onTextInputChange(setBottomLabel)}
            />
          </Flex>
          <Flex alignItems="center" px={3} pb={3}>
            <Input
              id="file-upload"
              type="file"
              onChange={onFileInputChange(setImageSrc)}
            />
            <Button
              variant="outline"
              as="label"
              htmlFor="file-upload"
              title="Upload image"
            >
              <FaUpload />
            </Button>
            <Button
              variant="outline"
              title="Image From URL"
              ml={3}
              onClick={() => setUrlInputVisible(!urlInputVisible)}
            >
              <FaLink />
            </Button>
            <Button
              variant="outline"
              onClick={() => setImageSrc(getRandomMeme(imageSrc))}
              ml={3}
              title="Random image"
            >
              <FaRandom />
            </Button>

            <Box mx="auto" />

            <Button
              variant="primary"
              onClick={() => saveSvgAsPng(ref.current, 'meme.png')}
              ml={3}
              title="Download image"
            >
              Download
            </Button>
          </Flex>

          <ImageUrlInput
            visible={urlInputVisible}
            value={imageUrl}
            onChange={useCallback(onTextInputChange(setImageUrl), [
              setImageUrl,
            ])}
          />

          <MemeContainer justifyContent="center">
            <Meme
              {...{ imageSrc, topLabel, bottomLabel, isMobile, ref }}
              onLoad={hideUrlInput}
            />
          </MemeContainer>
        </Card>
      </>
    </ThemeProvider>
  );
};

export default App;
