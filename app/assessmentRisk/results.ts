type RiskData = {
  id: number;
  label: string;
  investPercent: number[];
  expectReturn: string[];
  textColor: string;
};

const assessResult: RiskData[] = [
    {
        id: 1,
        label: 'ความเสี่ยงต่ำ',
        investPercent:[40, 30, 20, 10, 0],
        expectReturn: ['4.50%', '2.10%', '0.78%'],
        textColor: '#2C8C3A'
    },
    {
        id: 2,
        label: 'ความเสี่ยงปานกลางค่อนข้างต่ำ',
        investPercent:[20, 30, 30, 20, 0],
        expectReturn: ['6.33%', '2.62%', '0.36%'],
        textColor: '#89A209'
    },
    {
        id: 3,
        label: 'ความเสี่ยงปานกลางค่อนข้างสูง',
        investPercent:[10, 20, 30, 30, 10],
        expectReturn: ['8.47%', '3.94%', '0.27%'],
        textColor: '#ED9A01'
    },
    {
        id: 4,
        label: 'ความเสี่ยงสูง',
        investPercent:[0, 10, 30, 40, 20],
        expectReturn: ['10.60%', '5.25%', '0.18%'],
        textColor: '#EF6B0D'
    },
    {
        id: 5,
        label: 'ความเสี่ยงสูงมาก',
        investPercent:[0, 0, 10, 70, 20],
        expectReturn: ['10.88%', '4.81%', '-2.56%'],
        textColor: '#D4333F',
    }
]

export default assessResult;