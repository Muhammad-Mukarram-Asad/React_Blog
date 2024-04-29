import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function PostPage({ posts, handleDelete, setPosts }) {
  const { id } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const title = searchParams.get("title");
  const body = searchParams.get("body");
  const datetime = searchParams.get("datetime");

  const navigate = useNavigate();

  const updatedPostDetails = { id, title, body, datetime };

  console.log("updatedPostDetails = ", updatedPostDetails);

  let post;

  if (title && body) {
    // Checking if title and body are present in URL params
    post = updatedPostDetails;
  } else {
    post = posts.find((post) => post.id.toString() === id);
  }

  const handleEdit = (editPostId) => {
    const queryParams = new URLSearchParams({
        id: post.id,
        title: post.title,
        body: post.body,
        datetime: post.datetime
    }).toString();

    navigate(`/editPost/${editPostId}? ${queryParams}`);
  };

  const handleUpdate = (editPostId) => {
    console.log("Edit post ID = ", editPostId);
    if (title && body) {
      // If title and body are from URL params, update the post in the posts array
      const updatedPosts = posts.map((post) => {
        if (post.id.toString() === editPostId) {
          return {
            ...post,
            title: title,
            body: body,
            datetime: datetime,
          };
        }
        navigate("/");
        return post;
      });
      console.log("updatedPosts = ", updatedPosts);
      setPosts(updatedPosts);
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            <h2>{post.title}</h2>
            <p className="postBody">{post.body}</p>
            <p className="postDate">{post.datetime}</p>
            <div className="btns_main_div">
            <button id ="deleteBtn" onClick={() => handleDelete(post.id)}>Delete</button>
            {title && body ? (
              <button id="updateBtn" onClick={() => handleUpdate(post.id)}>Update</button>
            ) : (
              <button id="editBtn" onClick={() => handleEdit(post.id)}>
                Edit
              </button>
            )}
            </div>
          </>
        ) : (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
}

export default PostPage;
