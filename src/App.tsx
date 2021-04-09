import React from 'react';

import AppWrapper from './components/App'
import Header from './components/Header'
import Section from './components/Section';
import Footer from './components/Footer';
import CharacterCard from './components/CharacterCard';
import { useCharactersQuery } from './graphql/types';

const App = () => {

  const { data  } = useCharactersQuery({
    variables: {
      page: 1
    }
  });

  return (
    <AppWrapper>
      <Header>
        <span>Rick and Morty Characteropedia</span>
      </Header>
      <Section>
        {/* 4) ITERATE THROUGH THE NEW CHARACTERS DATA AND DISPLAY CARDS FOR EACH CHARACTER */}
        {/* <CharacterCar d character={data.character} /> */}
      </Section>
      <Footer />
    </AppWrapper>
  );
}

export default App;
