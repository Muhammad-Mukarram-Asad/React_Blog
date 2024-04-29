// EditPost.js
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

function EditPost() {
    const { search, post } = useLocation();
    const searchParams = new URLSearchParams(search);
    const title = searchParams.get("title");
    const body = searchParams.get("body");
    const datetime = searchParams.get("datetime");

    const { id } = useParams();
    const navigate = useNavigate();

    const [editTitle, setEditTitle] = useState(title || '');
    const [editBody, setEditBody] = useState(body || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post]);

    const handleEdit = () => {
        setLoading(true); // Start loading indicator
        const updatedDatetime = format(new Date(), 'MMMM dd, yyyy pp');
        const editedPost = { id, title: editTitle, body: editBody, datetime: updatedDatetime };
        console.log("Edited Post = ", editedPost);
       // Constructing URL parameters
    const queryParams = new URLSearchParams({
        id: editedPost.id,
        title: editedPost.title,
        body: editedPost.body,
        datetime: editedPost.datetime
    }).toString();

    setTimeout(() => {
        setLoading(false); 
        navigate(`/post/${id}?${queryParams}`); // Navigate with URL parameters
    }, 2000); 

    };

    return (
        <main className="NewPost">
            <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
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
                <button type="submit">
                    {loading ? 'Editing...' : 'Confirm Edit'}
                </button>
            </form>
        </main>
    );
}

export default EditPost;
