type Article = {
  id: number;
  title: string;
  date: string;
  imgUrl: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: 'วิเคราะห์การสร้างเข็มทิศการลงทุนด้วย Goal Based Investing',
    date: '12/10/2567',
    imgUrl: 'https://www.bam.co.th/uploads/images/241011113820rJjr.png'
  },
  {
    id: 2,
    title: 'วิเคราะห์วิธีการคัดเลือกกองทุนรวมผสม',
    date: '10/09/2567',
    imgUrl: 'https://www.bam.co.th/uploads/images/241011112945CGjd.png'
  },
  {
    id: 3,
    title: 'วิเคราะห์แนวทางการประเมินมูลค่าหุ้น',
    date: '03/09/2567',
    imgUrl: 'https://www.bam.co.th/uploads/images/2410111103296Axh.png'
  },
];

export default articles;