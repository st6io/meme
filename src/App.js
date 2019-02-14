import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { Heading, Card, Flex, Box, Button } from 'rebass';
import { ThemeProvider } from 'styled-components';
import { FaMoon, FaSun, FaUpload, FaRandom } from 'react-icons/fa';

import { saveSvgAsPng } from 'save-svg-as-png';

import { GlobalStyle, Meme, Input, Logo, themes } from './components';
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

const Layout = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: ${props => props.theme.color};
  background: ${props => props.theme.bg};
  overflow-y: auto;
`;

const MemeCard = props => (
  <Card
    {...props}
    my={3}
    py={3}
    border={1}
    borderRadius={3}
    width={602}
    variant="primary"
  />
);

const MemeTitle = props => <Heading {...props} as="h1" fontSize={3} ml={3} />;

const MemeButton = props => (
  <Button {...props} border={1} borderRadius={3} variant="primary" />
);

const MemeInput = props => <Input {...props} variant="primary" />;

const MemeContainer = styled(Box)`
  position: relative;
  text-align: center;
`;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [topLabel, setTopLabel] = useState(
    'Do the most meaningful meme of your life...',
  );
  const [bottomLabel, setBottomLabel] = useState('We are hiring...');
  const [imageSrc, setImageSrc] = useState(getRandomMeme());
  const ref = useRef(null);

  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={themes[theme]}>
        <Layout>
          <Flex justifyContent="center">
            <MemeCard>
              <Flex alignItems="center" px={3}>
                <Logo />
                <MemeTitle>Meme Generator</MemeTitle>
                <Box mx="auto" />
                <MemeInput
                  id="file-upload"
                  type="file"
                  onChange={onFileInputChange(setImageSrc)}
                />
                <MemeButton as="label" for="file-upload">
                  <FaUpload />
                </MemeButton>
                <MemeButton
                  onClick={() => setImageSrc(getRandomMeme(imageSrc))}
                  ml={3}
                >
                  <FaRandom />
                </MemeButton>
              </Flex>

              <Flex flexDirection="column" px={3} pt={3}>
                <MemeInput
                  placeholder="Top text"
                  value={topLabel}
                  onChange={onLabelChange(setTopLabel)}
                />
                <MemeInput
                  placeholder="Bottom text"
                  value={bottomLabel}
                  onChange={onLabelChange(setBottomLabel)}
                />
              </Flex>

              <MemeContainer>
                <Meme {...{ imageSrc, topLabel, bottomLabel, ref }} />
              </MemeContainer>

              <Flex alignItems="center" px={3} pt={3}>
                <MemeButton
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? <FaMoon /> : <FaSun />}
                </MemeButton>

                <Box mx="auto" />

                <MemeButton
                  onClick={() => saveSvgAsPng(ref.current, 'meme.png')}
                >
                  Download
                </MemeButton>
              </Flex>
            </MemeCard>
          </Flex>
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
