import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import TextF from './TextF';

type WideBtnProps = TouchableOpacityProps & {
  text: string;
  disabled?: boolean;
};

const WideBtn: React.FC<WideBtnProps> = ({ text, disabled, ...props }) => {
  const buttonStyle = `px-2 py-1 mb-20 mx-6 mt-5 rounded-lg ${
    disabled ? 'bg-label' : 'bg-primary'
  }`;
  const textStyle = `text-base text-center text-lg p-3 text-neutral`;

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled} // กำหนด disabled
      className={buttonStyle}
    >
      <TextF className={textStyle}>{text}</TextF>
    </TouchableOpacity>
  );
};

export default WideBtn;