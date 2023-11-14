import { ChangeEvent, useEffect, useState } from "react";
import Post from "../components/Post";
import { IPost } from "../models/Post";
import { IUser } from "../models/User";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/api/API";
import PostComments from "../components/PostComments";
import withLogger, { ILoggerProps } from "../utils/logger/withLogger";
import Search from "../components/common/Search";

export interface IPostsPageProps {}

const PostsPage = (props: IPostsPageProps & ILoggerProps) => {
  const { helloMessage, componentName } = props;
  const [posts, setPosts] = useState<IPost[]>();
  const [users, setUsers] = useState<IUser[]>();
  const [filteredUserIds, setFilteredUserIds] = useState<number[]>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`${helloMessage}${componentName}`);
  }, []);

  useEffect(() => {
    API.get("/posts").then((response) => {
      setPosts(response.data);
    });
    API.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const searchString = event.target.value;
    const filteredUsers = users?.filter((user) =>
      user.username
        .toLocaleLowerCase()
        .includes(searchString.toLocaleLowerCase())
    );

    const filteredUserIds = filteredUsers?.map((user) => user.id);

    setFilteredUserIds(filteredUserIds);
  }

  function handlePostClick(postId: number) {
    navigate(`/posts/${postId}`);
  }

  const filteredPosts = posts?.filter(
    (post) => !filteredUserIds || filteredUserIds?.includes(post.userId)
  );

  if (!posts) return <div>Loading...</div>;

  return (
    <>
      <Search onSearch={handleSearch} />
      {filteredPosts?.map((post) => (
        <div key={post.id}>
          <Post
            onClick={() => handlePostClick(post.id)}
            title={post.title}
            body={post.body}
            username={users?.find((user) => user.id === post.userId)?.username!}
            componentName="Custom name"
          />
          <PostComments postId={post.id} />
        </div>
      ))}
    </>
  );
};

export default withLogger(PostsPage);
