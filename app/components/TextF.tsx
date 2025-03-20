import React from 'react';
import { Text } from 'react-native';

interface FoneProps{
    children: any;
    className?: string;
    }
const TextF: React.FC<FoneProps> = ({children,className,  ...rest}) => {
    return (
        <Text 
        style={{fontFamily: 'SarabunRegular'}} 
        className={className}
        {...rest}
        >{children}</Text>
    );
  };

export default TextF;