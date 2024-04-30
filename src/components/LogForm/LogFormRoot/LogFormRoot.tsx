import React, { FC } from 'react';
import cl from './LogFormRoot.module.css';
import classNames from 'classnames';

interface LogFormRootProps extends React.ComponentProps<'div'> {}
interface LogFormInputProps extends React.ComponentProps<'input'> {}
export const LogFormRoot: FC<LogFormRootProps> = ({
  className,
  children,
  ...props
}) => {
  return <div className={cl.container}>{children}</div>;
};

export const LogFormInput: FC<LogFormInputProps> = ({
  className,
  ...props
}) => {
  const parsedClassNames = className?.split(' ').map((val) => cl[val]);

  return <input className={classNames(parsedClassNames)} {...props} />;
};

export const LogFormCompose = {
  Input: LogFormInput,
  Root: LogFormRoot,
};
