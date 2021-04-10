import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AppWrapper from './components/App'
import Header from './components/Header'
import Section from './components/Section';
import Footer from './components/Footer';
import CharacterCard from './components/CharacterCard';
import { useCharacterQuery, useCharactersQuery, CharactersQuery, Scalars } from './graphql/types';

const App = () => {
  interface DynamicObjectHelper {
    [prop: string]: string;
  }

  const [currentCharacter, setCurrentCharacter] = useState("");
  const [filterProperty, setFilterProperty] = useState<string>("name");
  const [filterValue, setFilterValue] = useState<string>("");
  const searchInput = useRef<HTMLInputElement>(null);

  const getFilters = () => {
    const filters: DynamicObjectHelper = {};
    filters[filterProperty] = filterValue;
    return filters;
  }

  const graphQuery = useCharactersQuery({
    variables: {
      page: 1,
      filters: getFilters()
    }
  });
  
  const characterQuery = useCharacterQuery({
    variables: {
      id: currentCharacter
    }
  });

  console.log(characterQuery.data);
  
  useEffect(() => {
    console.log(currentCharacter);
    
    return () => {};
  }, [currentCharacter]);

  const placeholdersBasedOnCurrentFilter: DynamicObjectHelper = {
    name: "Search by Name of the character",
    status: "Filter by status of the character Ex. alive, dead or unknown",
    species: "Filter by species of the character Ex. Human, Alien",
    gender: "Filter by gender of the character Ex. Male, Female or Unknown"
  }

  const ShowCharacterDetails = (event: any) => {
    event?.preventDefault();
    const targetElement: any = event.target.tagName === "A" ? event.target : event.target.parentElement;
    const identifier: string = targetElement.dataset.id;
    setCurrentCharacter(identifier)
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    const value = event.target.querySelector('input').value;
    if (value !== "") {
      setFilterValue(value)
    }
  };

  const Form = styled.form`
    display: flex;
    position: relative;
    margin-left: auto
  `;

  const SearchInput = styled.input`
    width: 600px;
    padding: 10px;
    background: #333842;
    padding-left: 15px;
    border-radius: 50px;
    border: 0;
    outline: none;
    color: #d2d2d2;
    letter-spacing: 1px;
    transition: all .6s ease;

    &:focus {
      color: #333;
      background: #fff;
    }
  `;

  const Button = styled.button`
    position: absolute;
    height: calc(100% - 10px);
    right: 5px;
    border: 0;
    border-radius: 50px;
    padding: 0 10px;
    top: 5px;
    background: rgba(0, 0, 0, 0.28);
    color: #ffffff;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all .6s ease;
    outline: none;
    cursor: pointer;

    &:hover, &:focus {
      background: #c2c2c2;
      color: #747474;
      font-weight: bold;
    }
  `;

  const FilterDropdown = styled.ul`
    position: absolute;
    display: none;
    top: calc(100% + 10px);
    right: 0;
    z-index: 10;
    min-width: 200px;
    padding: 10px;
    margin: 0;
    border-radius: 15px;
    list-style: none;
    background: #fff;
    box-shadow: 0 3px 35px rgb(0 0 0 / 10%), 0 14px 24px rgb(0 0 0 / 10%);
    overflow: hidden;
  `;

  const FilterDropdownListElement = styled.li`
    display: flex;
  `;

  const FilterButton = styled.button`
    flex: 1 1;
    text-align: left;
    font-size: 13px;
    border: 0;
    background: #fff;
    padding: 10px;
    margin-bottom: 1px;
    border-radius: 5px;
    transition: all .6s ease;
    cursor: pointer;

    &:hover {
      background: #333842;
      color: #fff;
    }
  `;
  
  if (graphQuery.loading) {
    return null
  } else {
    const { data } = graphQuery;
    return (
      <AppWrapper>
        <Header>
          <span>Rick and Morty Characteropedia</span>
          <Form onSubmit={handleSearch}>
            <SearchInput type="search" ref={searchInput} placeholder={ placeholdersBasedOnCurrentFilter[filterProperty]} defaultValue={filterValue || ""}/>
            <Button type="button" onClick={(e) => {
              e.preventDefault();
              document.querySelector(".filterDropdown")?.classList.toggle("show")
            }}>
              Filter By: {filterProperty}
            </Button>
            <FilterDropdown className="filterDropdown">
              <FilterDropdownListElement>
                <FilterButton type='button' onClick={() => setFilterProperty("name")}>Name</FilterButton>
              </FilterDropdownListElement>
              <FilterDropdownListElement>
                <FilterButton type='button' onClick={() => setFilterProperty("status")}>Status</FilterButton>
              </FilterDropdownListElement>
              <FilterDropdownListElement>
                <FilterButton type='button' onClick={() => setFilterProperty("species")}>Species</FilterButton>
              </FilterDropdownListElement>
              <FilterDropdownListElement>
                <FilterButton type='button' onClick={() => setFilterProperty("gender")}>Gender</FilterButton>
              </FilterDropdownListElement>
            </FilterDropdown>
          </Form>
        </Header>
        <Section>
          {data?.characters?.results?.map(result => 
            result && <CharacterCard 
              key={result.id} 
              character={result}
              onClick={ShowCharacterDetails}
          />)}
        </Section>
        <Footer />
      </AppWrapper>
    );
  }
  
}

export default App;
