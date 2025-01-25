import {
    ChartColumnBigIcon,
    DatabaseIcon,
    TrendingUpIcon,
    WandSparklesIcon,
    ZapIcon
} from "lucide-react";

export const FEATURES = [
    {
        title: "ความปลอดภัยระบบออมทอง",
        description: "ระบบออมทองของเรามีฟังก์ชั่นการป้องกันเเบบยืดหยุ่น ด้วยระบบ 2FA",
        icon: WandSparklesIcon,
        image: "/images/feature-two.svg",
    },
    {
        title: "อัพเดทราคาทองเเบบเรียลไทม์",
        description: "ระบบออมทอง ซื้อขายทองสามารถดูกราฟได้เเบบเรียลไทม์ด้วย Indicator ครบครัน",
        icon: ChartColumnBigIcon,
        image: "/images/feature-one.svg",
    },
    {
        title: "จัดการราคาทอง",
        description: "ระบบออมทองสามารถตั้งราคา Bid Offer ได้ทุกสินค้า",
        icon: DatabaseIcon,
        image: "/images/feature-three.svg",
    },
    {
        title: "รู้รายละเอียดต้นทุนรวม ต้นทุนเฉลี่ย เเละอื่นๆได้ครบ",
        description: "ระบบออมทอง ซื้อขายทองของเรา สามารถดูตัวเลขต้นทุนเฉลี่ย ต้นทุนรวม เเละตัวเลขอื่นๆได้อย่างละเอียด",
        icon: TrendingUpIcon,
        image: "/images/feature-four.svg",
    },
    {
        title: "รู้ทุก Transection",
        description: "ระบบออมทองของเรา track ทุก การซื้อขายทอง การออมทอง",
        icon: ZapIcon,
        image: "/images/feature-five.svg",
    }
]