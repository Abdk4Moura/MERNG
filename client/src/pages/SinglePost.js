import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import { FETCH_POST_QUERY } from "../utils/graphql";

function SinglePost(props) {
  const postId = props.match.params.postId;
  console.log(postId);

  const {
    data: { getPost: post },
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let postMarkup;
  if (!post) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = post;

    postMarkup = (
      <Grid>
        <Grid.Row></Grid.Row>
      </Grid>
    );
  }
}

export default SinglePost;
