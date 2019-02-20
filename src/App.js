import React, { useState, useRef } from 'react';
import 'styled-components/macro';
import styled from 'styled-components/macro';
import { Heading, Card, Flex, Box, Button, Link } from 'rebass';
import { ThemeProvider } from 'styled-components';
import { FaMoon, FaSun, FaUpload, FaRandom, FaGithub } from 'react-icons/fa';

import { saveSvgAsPng } from 'save-svg-as-png';

import { GlobalStyle, Meme, Input, Logo, themes } from './components';
import { getRandomMeme } from './memes';

const websiteUrl = 'https://st6.io/';
const githubUrl = 'https://github.com/st6io/meme';

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

const MemeTooltip = styled(Box)`
  position: relative;
  color: #fff;
  background-color: #ff7849;
  border-radius: 3px;
  font-size: small;
  padding: 2px 5px;
  margin: 0 12px;
  text-decoration: none;

  &:before {
    content: '';
    position: absolute;
    top: 4px;
    left: -10px;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right: 5px solid #ff7849;
  }
`;

const MemeCard = props => (
  <Card
    {...props}
    my={3}
    border={1}
    borderRadius={3}
    width={602}
    variant="primary"
  />
);

const MemeTitle = props => <Heading {...props} as="h1" fontSize={3} ml={3} />;

const MemeLink = props => (
  <Link {...props} css={{ color: 'inherit', textDecoration: 'none' }} />
);

const MemeButton = props => (
  <Button
    {...props}
    border={1}
    borderRadius={3}
    css={{
      cursor: 'pointer',
    }}
  />
);
MemeButton.defaultProps = {
  variant: 'primary',
};

const MemeInput = props => <Input {...props} variant="primary" />;

const MemeContainer = props => (
  <Flex
    {...props}
    css={{
      position: 'relative',
    }}
  />
);

const App = () => {
  const [theme, setTheme] = useState('light');
  const [topLabel, setTopLabel] = useState('Do the most meaningful meme...');
  const [bottomLabel, setBottomLabel] = useState('Of your life...');
  const [imageSrc, setImageSrc] = useState(getRandomMeme());
  const ref = useRef(null);

  return (
    <ThemeProvider theme={themes[theme]}>
      <>
        <GlobalStyle />
        <MemeCard mx="auto">
          <Flex alignItems="center" px={3} pt={3}>
            <MemeLink href={websiteUrl} target="_blank">
              <Logo />
            </MemeLink>
            <MemeTitle>Meme Generator</MemeTitle>
            <MemeLink href={`${websiteUrl}careers/`} target="_blank">
              <MemeTooltip>We&apos;re hiring</MemeTooltip>
            </MemeLink>
            <Box mx="auto" />
            <MemeButton
              variant="outline"
              title="Change theme"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </MemeButton>
            <MemeButton
              as={MemeLink}
              href={githubUrl}
              target="_blank"
              variant="outline"
              title="View source code"
            >
              <FaGithub />
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

          <Flex alignItems="center" px={3} pb={3}>
            <MemeInput
              id="file-upload"
              type="file"
              onChange={onFileInputChange(setImageSrc)}
            />
            <MemeButton as="label" for="file-upload" title="Upload image">
              <FaUpload />
            </MemeButton>
            <MemeButton
              onClick={() => setImageSrc(getRandomMeme(imageSrc))}
              ml={3}
              title="Random image"
            >
              <FaRandom />
            </MemeButton>
            <Box mx="auto" />
            <MemeButton
              onClick={() => saveSvgAsPng(ref.current, 'meme.png')}
              title="Download image"
            >
              Download
            </MemeButton>
          </Flex>

          <MemeContainer justifyContent="center">
            <Meme {...{ imageSrc, topLabel, bottomLabel, ref }} />
          </MemeContainer>
        </MemeCard>
      </>
    </ThemeProvider>
  );
};

export default App;
