import { useEffect, useState } from "react";
import { IComment } from "../models/Comment";
import withLogger, { ILoggerProps } from "../utils/logger/withLogger";
import Comments, { Comment } from "./Comments";
import { API } from "../utils/api/API";

interface IPostCommentsProps {
  postId?: number;
}

const PostComments = (props: IPostCommentsProps & ILoggerProps) => {
  const { postId, helloMessage, componentName } = props;
  const [comments, setComments] = useState<IComment[]>();

  useEffect(() => {
    console.log(`${helloMessage}${componentName}`);
  }, []);

  useEffect(() => {
    API.get(`/posts/${postId}/comments`).then((response) => {
      setComments(response.data);
    });
  }, []);

  if (!comments) return <div>Loading...</div>;

  return (
    <Comments>
      {comments?.map((comment) => {
        return (
          <Comment
            key={comment.id}
            username={comment.email}
            body={comment.body}
          />
        );
      })}
    </Comments>
  );
};

export default withLogger(PostComments);
