import React, { createContext, useContext } from "react";

// สร้าง Context
const NumberFormatContext = createContext<{ addCommatoNumber: (num: any) => string } | undefined>(undefined);

// ฟังก์ชันเพิ่มเครื่องหมายจุลภาค (,) ให้ตัวเลข
const addCommatoNumber = (num: any, decimalPlaces: number = 0) => {
  if (num === ''){
    return "";
  }
  if (num === undefined || num === null || isNaN(Number(num))) {
    return "0";
  }

  // แปลงเป็นตัวเลข, ปัดเศษทศนิยม, และแปลงเป็นสตริง
  const roundedNum = Math.floor(Number(num) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

  // เพิ่ม comma คั่นหลักพัน
  return roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const NumberFormatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <NumberFormatContext.Provider value={{ addCommatoNumber }}>
      {children}
    </NumberFormatContext.Provider>
  );
};

// Hook ใช้ดึงค่า Context
export const useNumberFormat = () => {
  const context = useContext(NumberFormatContext);
  if (!context) {
    throw new Error("useNumberFormat must be used within a NumberFormatProvider");
  }
  return context;
};

export default NumberFormatProvider;