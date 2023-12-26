import Link from "next/link";
import Image from "next/image";

interface CategoryIconProps {
  label: string;
  icon?: string;
  id: string;
  id2?: string;
  id3?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  label,
  icon,
  id,
  id2,
  id3,
}: CategoryIconProps) => {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-4">
      <Link
        href={
          id3
            ? `/category/${id.toLowerCase()}/${id2?.toLowerCase()}/${id3?.toLowerCase()}`
            : id2
            ? `/category/${id.toLowerCase()}/${id2?.toLowerCase()}`
            : `/category/${id.toLowerCase()}`
        }
      >
        <Image
          src={
            icon
              ? (icon as string)
              : "https://res.cloudinary.com/dro3sbdac/image/upload/v1700990358/vfootusii6te7nllvhno.png"
          }
          loading="lazy"
          alt={label}
          height={150}
          width={150}
          className={`${
            !icon && "object-contain p-5"
          } md:w[5rem] flex h-16 w-16 translate-y-0 items-center justify-center rounded-sm bg-primary/20 text-white/40 shadow-md transition duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg hover:transition-transform hover:duration-300 md:h-[5rem] md:w-[5rem]`}
        />
      </Link>
      <p className="text-center text-sm md:text-base">{label}</p>
    </div>
  );
};

export default CategoryIcon;
