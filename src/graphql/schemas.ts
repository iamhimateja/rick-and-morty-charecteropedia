import { gql } from "@apollo/client";

export const SINGLE_CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      __typename
      id
      name
      status
      species
      type
      gender
      image
      created
      origin {
        __typename
        id
        name
        type
        dimension
      }
      episode {
        __typename
        id
        episode
        name
        air_date
      }
    }
  }
`

export const CHARACTERS_QUERY = gql`
  query Characters($page: Int, $filters: FilterCharacter) {
    characters(page: $page, filter: $filters) {
      info {
        __typename
        count
        pages
        next
        prev
      }
      results {
        __typename
        id
        name
        status
        species
        type
        gender
        image
        created
        origin {
          __typename
          id
          name
          type
          dimension
        }
        episode {
          __typename
          id
          episode
          name
          air_date
        }
      }
    }
  }
`;