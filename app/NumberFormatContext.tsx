import React, { createContext, useContext } from "react";

// สร้าง Context
const NumberFormatContext = createContext<{ addCommatoNumber: (num: any) => string } | undefined>(undefined);

// ฟังก์ชันเพิ่มเครื่องหมายจุลภาค (,) ให้ตัวเลข
const addCommatoNumber = (num: any) => {
  if (num === undefined || num === null) {
    return "0";
  }

return num.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Provider สำหรับใช้ในแอป
export const NumberFormatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
