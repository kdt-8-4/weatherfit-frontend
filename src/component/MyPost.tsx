import { useRouter } from "next/navigation";
import Image from "next/image";

interface IMAGE {
  boardId: number;
  imageId: number;
  imageUrl: string;
}

interface LIKE {
  likeId: number;
  nickName: string;
}

interface FEEDATA {
  boardId: number;
  images: IMAGE;
  likeCount: number;
  likelist: LIKE[];
  nickName: string;
  temperature: number;
  weather: string;
  weatherIcon?: string;
}

interface MyPostProps {
  myPostData: FEEDATA[];
}

export default function MyPost(props: MyPostProps) {
  const { myPostData } = props;

  console.log("mypost 데이터: ", myPostData);

  const router = useRouter();

  const goDetail = async (board_id: number) => {
    console.log("게시글 아이디", board_id);
    localStorage.setItem("getBoardId_local", JSON.stringify(board_id));
    router.push("/detail");
  };

  return (
    <div className="post_box">
      {myPostData.length > 0 ? (
        myPostData.map((item) => (
          <div
            key={item.boardId}
            className="post"
            onClick={() => goDetail(item.boardId)}
          >
            {item.images && (
              <Image
                src={item.images.imageUrl}
                alt="내 게시물 이미지"
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        ))
      ) : (
        <>
          <p>게시물을 등록해주세요.</p>
        </>
      )}
    </div>
  );
}
