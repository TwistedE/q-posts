import { ComponentType } from "react";

export interface ILoggerProps {
  helloMessage?: string;
  componentName?: string;
}

const withLogger = <T extends object>(WrappedComponent: ComponentType<T>) => {
  const WithLogger = (props: T) => {
    return (
      <WrappedComponent
        helloMessage={"Hello from "}
        componentName={WrappedComponent.name}
        {...props}
      />
    );
  };

  return WithLogger;
};

export default withLogger;
