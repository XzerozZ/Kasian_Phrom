import React from 'react';
import { Text, View, Image } from 'react-native';

// import M_mooSitdown from '../../assets/Mascot/mooSitdown.png';
const Logo = require('../../assets/images/logo.png');
const Logo2 = require('../../assets/Mascot/M_mooSitdown.png');
const Logo3 = require('../../assets/Mascot/M_mooStandup.png');



interface MascotProps{
    children: any;
    className?: string;
    }
const Mascot: React.FC<MascotProps> = ({children,className,  ...rest}) => {
    return (
        <View 
        className={className}
        {...rest}
        >{children}
        <Image
            source={Logo}
            className="w-full h-full object-cover rounded-md"
        />
        </View>
    );
  };

export default Mascot;