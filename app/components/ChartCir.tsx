import React from 'react';
import { View } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

interface ChartCirProps {
  series: { value: number; color: string }[];
  series2: { value: number; color: string }[];
}

const ChartCir: React.FC<ChartCirProps> = ({ series, series2 }) => {
  const widthAndHeight = 240;
  const widthAndHeight2 = 160;
  const innerRadius = widthAndHeight2 / 2 + 2;
  const innerRadius2 = widthAndHeight2 / 2 - 30;



  const totalValue = series.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const totalValue2 = series2.reduce((acc, item) => acc + item.value, 0);

  const radius = widthAndHeight / 2;
  const radius2 = widthAndHeight2 / 2;
  const strokeWidth = 2;

  // ตรวจสอบว่ามีค่าเดียวที่ไม่ใช่ 0 หรือไม่
  const nonZeroSlices = series.filter(slice => slice.value > 0);
  const nonZeroSlices2 = series2.filter(slice => slice.value > 0);

  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      {/* วงกลมใหญ่ */}
      <Svg width={widthAndHeight} height={widthAndHeight}>
        {nonZeroSlices.length === 1 ? (
          <Path
            d={`M ${radius},0 A ${radius},${radius} 0 1,1 ${radius - 0.1},0 Z`}
            fill={nonZeroSlices[0].color}
            stroke="white"
            strokeWidth={strokeWidth}
          />
        ) : (
          (() => {
            let startAngle = -90;
            return series.map((slice, index) => {
              if (slice.value === 0) return null;
              const angle = (slice.value / totalValue) * 360;
              const x1 = radius + radius * Math.cos((startAngle * Math.PI) / 180);
              const y1 = radius + radius * Math.sin((startAngle * Math.PI) / 180);
              const x2 = radius + radius * Math.cos(((startAngle + angle) * Math.PI) / 180);
              const y2 = radius + radius * Math.sin(((startAngle + angle) * Math.PI) / 180);

              const pathData = [
                `M${radius},${radius}`,
                `L${x1},${y1}`,
                `A${radius},${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x2},${y2}`,
                'Z',
              ].join(' ');

              startAngle += angle;
              return <Path key={index} d={pathData} fill={slice.color} stroke="white" strokeWidth={strokeWidth} />;
            });
          })()
        )}
        <Circle cx={radius} cy={radius} r={innerRadius} fill="white" />
      </Svg>

      {/* วงกลมเล็ก */}
      <View style={{ position: 'absolute' }}>
        <Svg width={widthAndHeight2} height={widthAndHeight2}>
          {nonZeroSlices2.length === 1 ? (
            <Path
              d={`M ${radius2},0 A ${radius2},${radius2} 0 1,1 ${radius2 - 0.1},0 Z`}
              fill={nonZeroSlices2[0].color}
              stroke="white"
              strokeWidth={strokeWidth}
            />
          ) : (
            (() => {
              let startAngle2 = -90;
              return series2.map((slice, index) => {
                if (slice.value === 0) return null;
                const angle = (slice.value / totalValue2) * 360;
                const x1 = radius2 + radius2 * Math.cos((startAngle2 * Math.PI) / 180);
                const y1 = radius2 + radius2 * Math.sin((startAngle2 * Math.PI) / 180);
                const x2 = radius2 + radius2 * Math.cos(((startAngle2 + angle) * Math.PI) / 180);
                const y2 = radius2 + radius2 * Math.sin(((startAngle2 + angle) * Math.PI) / 180);

                const pathData = [
                  `M${radius2},${radius2}`,
                  `L${x1},${y1}`,
                  `A${radius2},${radius2} 0 ${angle > 180 ? 1 : 0} 1 ${x2},${y2}`,
                  'Z',
                ].join(' ');

                startAngle2 += angle;
                return <Path key={index} d={pathData} fill={slice.color} stroke="white" strokeWidth={strokeWidth} />;
              });
            })()
          )}
          <Circle cx={radius2} cy={radius2} r={innerRadius2} fill="white" />
        </Svg>
      </View>
    </View>
  );
};

export default ChartCir;
