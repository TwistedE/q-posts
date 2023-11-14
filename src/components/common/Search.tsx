import { ChangeEventHandler, useEffect } from "react";
import withLogger, { ILoggerProps } from "../../utils/logger/withLogger";
import "./Search.css";

interface ISearchProps {
  onSearch: ChangeEventHandler<HTMLInputElement>;
}

const Search = (props: ISearchProps & ILoggerProps) => {
  const { onSearch, componentName, helloMessage } = props;

  useEffect(() => {
    console.log(`${helloMessage}${componentName}`);
  }, []);

  return (
    <input
      className="search"
      type="search"
      placeholder="Type to search..."
      onChange={onSearch}
    />
  );
};

export default withLogger(Search);
