import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { Svg, Path, Circle } from 'react-native-svg'
import  TextF  from './TextF';

export default class TestChart extends Component {
  render() {
    const widthAndHeight = 240 // 120
    const widthAndHeight2 = 160 // 80
    const innerRadius = (widthAndHeight2 / 2) + 2 // Inner radius for the hole in the middle
    const innerRadius2 = (widthAndHeight2 / 2) - 30 // Inner radius for the hole in the middle
    const series = [
      { value: 321, color: '#2A4296' },
      { value: 3240, color: '#6780D6' },
      { value: 663, color: '#C9C9C9' },
    ]
    const series2 = [
        { value: 321, color: '#F68D2B' },
        { value: 40, color: '#FFB36C' },
        { value: 663, color: '#FCE49E' },
      ]

    const totalValue = series.reduce((acc, item) => acc + item.value, 0)
    const totalValue2 = series2.reduce((acc, item) => acc + item.value, 0)
    const radius = widthAndHeight / 2
    const radius2 = widthAndHeight2 / 2
    const strokeWidth = 3 // Adjust stroke width for the gap
    let startAngle = -90

    return (
      <View 
      id='CirChartContainer'
      className = 'flex items-center justify-center' style={{position: 'relative'}}>
        <View className='flex flex-row'>
            <Svg width={widthAndHeight} height={widthAndHeight} >
            
            
            {/* Draw the slices with gaps */}
            {series.map((slice, index) => {
                const angle = (slice.value / totalValue) * 360
                const x1 = radius + radius * Math.cos((startAngle * Math.PI) / 180)
                const y1 = radius + radius * Math.sin((startAngle * Math.PI) / 180)
                const x2 = radius + radius * Math.cos(((startAngle + angle) * Math.PI) / 180)
                const y2 = radius + radius * Math.sin(((startAngle + angle) * Math.PI) / 180)

                const pathData = [
                `M${radius},${radius}`,
                `L${x1},${y1}`,
                `A${radius},${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x2},${y2}`,
                'Z',
                ].join(' ')

                startAngle += angle  // Add a small offset to create the gap

                return (
                <Path
                    key={index}
                    d={pathData}
                    fill={slice.color}
                    stroke="white" // This creates the gap
                    strokeWidth={strokeWidth}
                />
                )
            })}
            <Circle cx={radius} cy={radius} r={innerRadius} fill="white" />
            
            </Svg> 
        </View>
        <View style={{position: 'absolute'}}> 
        <Svg width={widthAndHeight2} height={widthAndHeight2} >
          {series2.map((slice, index) => {
            const angle = (slice.value / totalValue2) * 360
            const x1 = radius2 + radius2 * Math.cos((startAngle * Math.PI) / 180)
            const y1 = radius2 + radius2 * Math.sin((startAngle * Math.PI) / 180)
            const x2 = radius2 + radius2 * Math.cos(((startAngle + angle) * Math.PI) / 180)
            const y2 = radius2 + radius2 * Math.sin(((startAngle + angle) * Math.PI) / 180)

            const pathData = [
              `M${radius2},${radius2}`,
              `L${x1},${y1}`,
              `A${radius2},${radius2} 0 ${angle > 180 ? 1 : 0} 1 ${x2},${y2}`,
              'Z',
            ].join(' ')

            startAngle += angle  // Add a small offset to create the gap

            return (
              <Path
                key={index}
                d={pathData}
                fill={slice.color}
                stroke="white" // This creates the gap
                strokeWidth={strokeWidth}
              />
            )
          })}
          {/* Draw the hole in the middle */}
         <Circle cx={radius2} cy={radius2} r={innerRadius2} fill="white" />
        </Svg> 
        </View>
        
      </View>
    )
  }
}


