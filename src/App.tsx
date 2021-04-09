/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-lone-blocks */
// eslint-disable array-callback-return
// eslint-disable @typescript-eslint/no-unused-expressions
// eslint-disable no-lone-blocks
import React from 'react';

import AppWrapper from './components/App'
import Header from './components/Header'
import Section from './components/Section';
import Footer from './components/Footer';
import CharacterCard from './components/CharacterCard';
import { useCharactersQuery } from './graphql/types';

const App = () => {

  const graphQuery = useCharactersQuery({
    variables: {
      page: 1
    }
  });

  if (graphQuery.loading) {
    console.log("No Data")
    return null
  } else {
    console.log(graphQuery)

    const { data } = graphQuery;
    return (
      <AppWrapper>
        <Header>
          <span>Rick and Morty Characteropedia</span>
        </Header>
        <Section>
          {data?.characters?.results?.map(result => result && <CharacterCard key={result.id} character={result} />)}
        </Section>
        <Footer />
      </AppWrapper>
    );
  }
  
}

export default App;
