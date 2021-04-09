import { gql } from "@apollo/client";

export const CHARACTER_QUERY = gql`
    query Character($id: ID!) {
        character(id: $id) {
            id
            name
            image
            species
        }
    }
`;

export const CHARACTERS_QUERY = gql`
    query Characters($page: Int) {
        characters(page: $page) {
            results {
                name
                status
                species
                type
                gender
                image
                created
                episode {
                    episode
                    name
                }
                origin {
                    name
                }
                location {
                    name
                }
            }
        }
    }
`;

// 1) ADD A CHARACTERS_QUERY SCHEMA HERE

// 2) RUN `npm run generate` TO GENERATE
// THE NEW HOOKS AND TYPINGS CREATED FOR THE NEW SCHEMA