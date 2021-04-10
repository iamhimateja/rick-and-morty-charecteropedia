import React from 'react'
import styled from 'styled-components'
import {
  Character
} from '../graphql/types'

type CharacterCardProps={
  character: Character,
  onClick: React.MouseEventHandler
}

const getStatusEmoji = (character: Character) => {
  switch (character.status) {
    case "Dead":
      return "😵"
    case "Alive":
      return "🙂"
    case "unknown":
      return "🤔"
  }
}

const getSpeciesEmoji = (character: Character) => {
  switch (character.species) {
    case "Human":
      return "👤"
    case "Alien":
      return "👽"
    case "unknown":
      return "🤔"
  }
}

const getGenderEmoji = (character: Character) => {
  switch (character.gender) {
    case "Male":
      return "🧒"
    case "Female":
      return "👩"
    case "unknown":
      return "🤔"
  }
}

const Anchor = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  transition: all .6s cubic-bezier(.68,-.55,.27,1.55);
  box-shadow: 0 0 0 1px rgba(9, 30, 66, 0.08), 0 2px 4px 1px rgba(9, 30, 66, 0.08);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 3px 35px rgba(0, 0, 0, 0.1), 0 14px 24px rgba(0, 0, 0, 0.1)
  }
`

const Image = styled.img`

`

const DetailsWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  display: flex;
  place-items: center;
  padding-left: 20px;
  bottom: 0;
  left: 0;
  color: #000;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(5px);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
`;

const EmojiWrap = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  right: 35px;
  top: -25px;

  .emojiWrap {
    position: relative;
    width: 35px;
    height: 35px;
    background-color: #fff;
    border-radius: 50%;

    span {
      position: absolute;
      font-size: 25px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const CharacterCard = ({ character, onClick: showCharacterInfo }: CharacterCardProps) => {
    return  (
      <Anchor href="#0" data-id={character.id} onClick={showCharacterInfo}>
        <Image src={character.image || ''} alt="icon" className="avatar" />
        <DetailsWrap className="details">
          {character.name}
          <EmojiWrap>
            <div className="emojiWrap">
              <span title={character.status || ""}>{getStatusEmoji(character)}</span>
            </div>
            <div className="emojiWrap">
              <span title={character.species || ""}>{getSpeciesEmoji(character)}</span>
            </div>
            <div className="emojiWrap">
              <span title={character.gender || ""}>{getGenderEmoji(character)}</span>
            </div>
          </EmojiWrap>
        </DetailsWrap>
      </Anchor>
    );
}

export default CharacterCard