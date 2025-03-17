import React, { createContext, useContext, useState } from "react";

// สร้าง Context ที่เก็บตัวเลขที่สุ่ม
interface NumberContextType {
    numbers: number[];
    generateRandomNumbers: () => void;
}

const NumberContext = createContext<NumberContextType | undefined>(undefined);

interface NumberProviderProps {
    children: React.ReactNode;
}

export const NumberProvider: React.FC<NumberProviderProps> = ({ children }) => {
    const [numbers, setNumbers] = useState<number[]>([]);

    // ฟังก์ชันสุ่มตัวเลขระหว่าง 0-1 จำนวน 10 ตัว
    const generateRandomNumbers = () => {
        const randomNumbers = Array.from({ length: 10 }, () => Math.random());
        setNumbers(randomNumbers);
    };

    return (
        <NumberContext.Provider value={{ numbers, generateRandomNumbers }}>
            {children}
        </NumberContext.Provider>
    );
};

// Hook สำหรับใช้งานค่า numbers และ generateRandomNumbers ในหน้าต่างๆ
export const useNumbers = () => {
    const context = useContext(NumberContext);
    if (!context) {
        throw new Error("useNumbers must be used within a NumberProvider");
    }
    return context;
};
