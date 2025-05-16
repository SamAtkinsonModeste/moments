import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import { axiosReq } from "../../api/axiosDefaults";
import { Post } from "./Post";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] }); //2
  const [hasLoaded, setHasLoaded] = useState(false); //3
  const { pathname } = useLocation(); // 4 & 5

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`); // 7 & 8
        setPosts(data); // 9
        setHasLoaded(true); // 10
      } catch (err) {
        console.error(err); //11
      }
    };
    setHasLoaded(false); // 13
    fetchPosts(); // 12
  }, [filter, pathname]); // 6 [filter, message] - 12

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;
