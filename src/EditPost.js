import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "./loading.svg";
import "./index.css";

function EditPost({
  posts,
  editTitle,
  editBody,
  setEditTitle,
  setEditBody,
  handleEdit,
  loading,
  setLoading,
}) {
  console.log("type of post_array is = ", typeof(posts));
  const { id } = useParams();
  const post = posts.find((inner_post) => inner_post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  let form_div = document.querySelector(".newPostForm");
  const navigate = useNavigate();

  const editLoading = () => {
    form_div.style.display = "none";
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, [4000]);
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2> Edit Post</h2>
          {loading && (
            <img src={Loading} width={100} height={100} alt="loading_svg" />
          )}
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button
              type="submit"
              onClick={() => {
                handleEdit(post.id);
                editLoading();
              }}
            >
              Confirm Edit
            </button>
          </form>
        </>
      )}

      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
}

export default EditPost;
