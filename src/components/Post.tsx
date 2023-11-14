import { useEffect } from "react";
import withLogger, { ILoggerProps } from "../utils/logger/withLogger";
import "./Post.css";

interface IPostProps {
  title: string;
  body: string;
  username: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Post = (props: IPostProps & ILoggerProps) => {
  const { title, body, username, helloMessage, componentName, onClick } = props;

  useEffect(() => {
    console.log(`${helloMessage}${componentName}`);
  }, []);

  return (
    <article className="post" onClick={onClick}>
      <h2>{title}</h2>
      <p>{body}</p>
      <div>{username}</div>
    </article>
  );
};

export default withLogger(Post);
