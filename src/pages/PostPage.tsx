import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { IPost } from "../models/Post";
import { IUser } from "../models/User";
import { useEffect, useState } from "react";
import { API } from "../utils/api/API";
import PostComments from "../components/PostComments";
import withLogger, { ILoggerProps } from "../utils/logger/withLogger";

export interface IPostPageProps {}

const PostPage = (props: IPostPageProps & ILoggerProps) => {
  const { helloMessage, componentName } = props;

  const [post, setPost] = useState<IPost>();
  const [user, setUser] = useState<IUser>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log(`${helloMessage}${componentName}`);
  }, []);

  useEffect(() => {
    API.get(`/posts/${id}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  useEffect(() => {
    if (post && post.userId) {
      API.get(`/users/${post.userId}`).then((response) => {
        setUser(response.data);
      });
    }
  }, [post]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <div onClick={() => navigate(-1)}>{"<- Go back"}</div>
      <Post title={post.title} body={post.body} username={user?.username!} />
      <PostComments postId={Number(id)} />
    </>
  );
};

export default withLogger(PostPage);
