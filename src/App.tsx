import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AppWrapper from './components/App'
import Header from './components/Header'
import Section from './components/Section';
import Footer from './components/Footer';
import CharacterCard from './components/CharacterCard';
import CharacterDetailsSidebar from './components/CharacterDetailsSidebar';
import { useCharacterQuery, useCharactersQuery } from './graphql/types';
import loader from "./images/loader.gif";

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

const LoadingWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  place-content: center;
  place-items: center;
  z-index: 999;
  background: rgba(22, 21, 23, 0.95);
  backdrop-filter: blur(10px);
  
  img {
    opacity: 0.5;
  }
`;

const NoData = styled.h2`
  display: block;
  padding: 5em;
  background: #34404b;
  border-radius: 30px;
  color: #fff;
  letter-spacing: 1px;
  font-size: 20px;
  text-transform: uppercase;
  opacity: 0.5;
`;

const App = () => {
  interface DynamicObjectHelper {
    [prop: string]: string;
  }

  const [currentCharacterID, setCurrentCharacterID] = useState("");
  const [filterProperty, setFilterProperty] = useState<string>("name");
  const [filterValue, setFilterValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchInput = useRef<HTMLInputElement>(null);

  const getFilters = () => {
    const filters: DynamicObjectHelper = {};
    filters[filterProperty] = filterValue;
    return filters;
  }

  const graphQuery = useCharactersQuery({
    variables: {
      page: currentPage,
      filters: getFilters()
    }
  });
  
  const { data: currentCharacterData } = useCharacterQuery({
    variables: {
      id: currentCharacterID
    }
  });
  
  useEffect(() => {
    setCurrentPage(1);
  }, [filterProperty]);

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
    setCurrentCharacterID(identifier)
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    const value = event.target.querySelector('input').value;
    if (filterValue !== value) {
      setCurrentPage(1)
      setCurrentCharacterID("");
      setFilterValue(value)
    }
  };

  const onCharacterInfoClose = (event: any) => {
    event.preventDefault();
    setCurrentCharacterID("");
  }

  const { data } = graphQuery;
  const itemsPerPage: number = 20;
  return (
    <>
      <AppWrapper className="mainDetails">
        <Header>
          <span>Rick and Morty Characteropedia</span>
          <Form onSubmit={handleSearch}>
            <SearchInput type="text" ref={searchInput} placeholder={ placeholdersBasedOnCurrentFilter[filterProperty]} defaultValue={filterValue || ""}/>
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
        {
          graphQuery.loading && 
            <LoadingWrap>
              <img src={loader} alt="Loading"/>
            </LoadingWrap>
        }
        <Section>
          {
            !graphQuery.loading && 
              (data?.characters?.results || [])?.length > 0 ? 
                  data?.characters?.results?.map(result => 
                  result && <CharacterCard 
                    key={result.id} 
                    character={result}
                    onClick={ShowCharacterDetails}
                />) : 
                <NoData>No Data for current filter</NoData>
          }
        </Section>
        {!graphQuery.loading && (data?.characters?.results || [])?.length > 0 &&
          <Footer>
            <div className="page-info">
              {`${((currentPage * itemsPerPage) - itemsPerPage) + 1} - ${(currentPage * itemsPerPage) >= (data?.characters?.info?.count || 0) ? data?.characters?.info?.count : (currentPage * itemsPerPage) } of ${data?.characters?.info?.count}`}
            </div>
            <div className="pagination">
              <button onClick={() => {
                setCurrentCharacterID("");
                setCurrentPage(data?.characters?.info?.prev || (currentPage - 1))
              }}
              disabled={!data?.characters?.info?.prev}
              >
                {`< Prev`}
              </button>
              <span>{currentPage} of {data?.characters?.info?.pages || 1}</span>
              <button onClick={() => {
                setCurrentCharacterID("");
                setCurrentPage(data?.characters?.info?.next || (currentPage + 1))
              }}
              disabled={!data?.characters?.info?.next}
              >
                {`Next >`}
              </button>
            </div>
          </Footer>
        }
      </AppWrapper>

      {currentCharacterData && currentCharacterData.character && <CharacterDetailsSidebar character={currentCharacterData.character} onClose={onCharacterInfoClose}></CharacterDetailsSidebar>}
    </>
  );
}

export default App;
