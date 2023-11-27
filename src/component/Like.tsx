import Image from "next/image";

export default function Like(): JSX.Element {
  return (
    <>
      <Image
        src="/images/unlike.svg"
        alt="like"
        width={20}
        height={20}
        className="cursor-pointer"
      />
      {/* <Image src="/images/like.svg" alt="like" width={20} height={20} /> className="cursor-pointer"*/}
    </>
  );
}
