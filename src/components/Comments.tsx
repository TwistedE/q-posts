import React, { ReactNode, useEffect } from "react";
import "./Comment.css";
import withLogger, { ILoggerProps } from "../utils/logger/withLogger";

interface ICommentProps {
  username: string;
  body: string;
}

interface ICommentsProps {
  children: ReactNode[];
}

const Comment = (props: ICommentProps & ILoggerProps) => {
  const { username, body, helloMessage, componentName } = props;

  useEffect(() => {
    console.log(`${helloMessage}${componentName}`);
  }, []);

  return (
    <div className="comment">
      <h4>{username}</h4>
      <p>{body}</p>
    </div>
  );
};

const Comments = (props: ICommentsProps & ILoggerProps) => {
  const { children, helloMessage, componentName } = props;

  useEffect(() => {
    console.log(`${helloMessage}${componentName}`);
  }, []);

  return (
    <div>
      {React.Children.map(children, (child) => {
        return child;
      })}
    </div>
  );
};

const wrappedComment = withLogger(Comment);
export { wrappedComment as Comment };
export default withLogger(Comments);
