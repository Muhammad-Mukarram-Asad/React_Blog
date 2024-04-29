import React from "react";
import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
        <h2>
          Title: <span style={{ color: "blue" }}>{post.title}</span>
        </h2>
        <p className="postBody">
          <span
            style={{
              color: "black",
              fontSize: "25px",
              fontFamily: "Inter",
              fontWeight: "bold",
            }}
          >
            Description:{" "}
          </span>
          {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
        </p>
        <p className="postDate">
          <span
            style={{
              color: "black",
              fontSize: "25px",
              fontFamily: "Inter",
              fontWeight: "bold",
            }}
          >
            Date:{" "}
          </span>
          {post.datetime}
        </p>
      </Link>
    </article>
  );
}

export default Post;
