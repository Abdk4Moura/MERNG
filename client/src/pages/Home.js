import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

function Home() {
  console.log(useQuery(FETCH_POSTS_QUERY));
  const { loading, data: { getPosts: posts } = false } =
    useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;

// query {
//     getPosts {
//     id body createdAt username likeCount
//     likes {
//         username
//     }
//     commentCount
//     comments {
//         id username createdAt body
//     }
// }
//  }
//  ** The above also works in place of the value of the template string of FETCH_POSTS_QUERY
