import { ErrorProps } from '../common/types';

const ErrorMessage = (props: ErrorProps) => {
  const { message } = props;
  return <div className="errorClass">${message}</div>;
};

export default ErrorMessage;
