import React from 'react'
import styled, { keyframes } from 'styled-components'
import {
  Character
} from '../graphql/types'

type CharacterDetailsSidebarProps={
  character: Character,
  onClose: React.MouseEventHandler
}

const getStatusEmoji = (character: Character) => {
  switch (character.status) {
    case "Dead":
      return "😵"
    case "Alive":
      return "🙂"
    default:
      return "🤔"
  }
}

const openSidebarAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const CharacterInfoWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: calc(100% - 30px);
  border-radius: 10px;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  animation-name: ${openSidebarAnimation};
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  z-index: 2;
  overflow: hidden;
  overflow-y: auto;
`;

const CloseIcon = styled.button`
  position: absolute;
  display: flex;
  place-content: center;
  place-items: center;
  top: 10px;
  width: 40px;
  height: 35px;
  border-radius: 30px 0 0 30px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 3px 35px rgba(0, 0, 0, 0.1), 0 14px 24px rgba(0, 0, 0, 0.1);
  padding-left: 5px;
  cursor: pointer;
  right: 0;
  z-index: 5;
  outline: none;

  svg {
    width: 20px;
  }

  &:hover {
    background: rgba(64, 70, 82, 0.8);
    svg {
      fill: #fff;
    }
  }
`;

const ImageWrap = styled.div`
  position: relative;
  display: flex;
  place-content: center;
`;

const CharacterImage = styled.img`

`;

const StatusIndicator = styled.span`
  position: absolute;
  font-size: 30px;
  bottom: calc(-30px / 2);
  right: 10px;
`;

const DetailsWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CharacterInfoRow = styled.div`
  padding: 10px;
`;

const CharacterHeading = styled.div`
  font-size: 12px;
  font-weight: bolder;
  text-transform: uppercase;
  margin: 10px 0;
  letter-spacing: 1px;
  color: #828282;
`;

const CharacterValue = styled.div`
  font-size: 20px;
  color: #fff;
  font-weight: bolder;
`;

const CharacterAppearances = styled.div`
  .episode {
    margin-bottom: 5px;
    color: #fff;
    font-weight: bolder;
    line-height: 1.5;
  }
`;

const CharacterDetailsSidebar = ({ character, onClose }: CharacterDetailsSidebarProps) => {
  return (
    <CharacterInfoWrapper className="characterInfoWrapper">
      <CloseIcon onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><path d="M25.161,76.274c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l49.37-49.37 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-49.37,49.37C25.672,76.176,25.417,76.274,25.161,76.274z"></path><path d="M74.531,76.274c-0.256,0-0.512-0.098-0.707-0.293l-49.37-49.37c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l49.37,49.37c0.391,0.391,0.391,1.023,0,1.414C75.042,76.176,74.787,76.274,74.531,76.274z"></path></svg>
      </CloseIcon>
      <ImageWrap className="image-wrap">
        <CharacterImage src={character.image || ''} alt={character.name || ""} className="avatar" />
        <StatusIndicator title={character.status || ""}>
          {getStatusEmoji(character)}
        </StatusIndicator>
      </ImageWrap>
      <DetailsWrap>
        <CharacterInfoRow>
          <CharacterHeading>Name</CharacterHeading>
          <CharacterValue>{character.name}</CharacterValue>
        </CharacterInfoRow>
        <CharacterInfoRow>
          <CharacterHeading>Gender</CharacterHeading>
          <CharacterValue>{character.gender}</CharacterValue>
        </CharacterInfoRow>
        <CharacterInfoRow>
          <CharacterHeading>Species</CharacterHeading>
          <CharacterValue>{character.species}</CharacterValue>
        </CharacterInfoRow>
        <CharacterInfoRow>
          <CharacterHeading>Status</CharacterHeading>
          <CharacterValue>{character.status}</CharacterValue>
        </CharacterInfoRow>
        <CharacterInfoRow>
          <CharacterHeading>Origin</CharacterHeading>
          <CharacterValue>{character.origin?.type} - {character.origin?.name}</CharacterValue>
        </CharacterInfoRow>
        <CharacterInfoRow>
          <CharacterHeading>Appearance</CharacterHeading>
          <CharacterAppearances>
            {character.episode?.map(episode => {
              return episode && (
                <div key={episode.id} className="episode">
                  {episode.episode} - {episode.name}
                </div>
              );
            })}
          </CharacterAppearances>
        </CharacterInfoRow>
      </DetailsWrap>
    </CharacterInfoWrapper>
  );
}

export default CharacterDetailsSidebar