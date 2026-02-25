import { Skill } from "@/lib/types";
import Image from "next/image";
export default function CardIcon({ item }: { item: Skill }) {
  return (
    <div
      className="p-4 flex flex-col items-center justify-center w-full h-32"
    >
      <div className="bg-white rounded-xl p-2">
        <Image src={item.icon} alt={item.alt} width={50} height={50} />
      </div>
    
    </div>
  );
}
