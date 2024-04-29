import './App.css';
import Navbar from "./Navbar.js";
import Header from "./Header.js"
import Home from "./Home.js"
import PostPage from "./PostPage.jsx"
import Footer from "./Footer.js"
import About from "./About.js"
import Missing from "./Missing.js"
import NewPost from './NewPost';

import {Route,Routes, useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';
import { format } from 'date-fns';
import EditPost from './EditPost.js';


function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
      datetime: "July 01, 2021 11:17:36 AM"
    },
    {
      id: 2,
      title: "My 2nd Post",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
      datetime: "July 01, 2021 11:17:36 AM"
    },
    {
      id: 3,
      title: "My 3rd Post",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
      datetime: "July 01, 2021 11:17:36 AM"
    },
    {
      id: 4,
      title: "My Fourth Post",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
      datetime: "July 01, 2021 11:17:36 AM"
    }
  ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(sessionStorage.getItem("all Posts"));
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);
  
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate("/");
  }

  useEffect(() => {
    sessionStorage.setItem("all Posts", JSON.stringify(posts));
  }, [posts]);

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
  }
  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch} />
      <Header title={"React JS Blog"} />

      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />

        <Route exact path="/post" element={<NewPost 
        handleSubmit={handleSubmit} 
        postTitle={postTitle} 
        postBody={postBody} 
        setPostTitle={setPostTitle}
        setPostBody={setPostBody} 
        /> } 
        />
        
        <Route path="/post/:id" element={<PostPage 
        posts={posts} 
        handleDelete={handleDelete}
        setPosts={setPosts}
         /> }
         />

        <Route  path="/about" element={<About /> } />
        <Route  path="/editPost/:id" element={<EditPost /> } />

        <Route  path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
