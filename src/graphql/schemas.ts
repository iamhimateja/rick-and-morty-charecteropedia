import { gql } from "@apollo/client";

export const CHARACTERS_QUERY = gql`
  query Characters($page: Int) {
    characters(page: $page) {
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