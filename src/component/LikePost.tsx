import Image from "next/image";
import { useRouter } from "next/navigation";

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

interface LikePostProps {
  myLikePostData: FEEDATA[];
}

export default function LikePost(props: LikePostProps) {
  const { myLikePostData } = props;

  console.log("myLikePostData 데이터: ", myLikePostData);

  const router = useRouter();

  const goDetail = async (board_id: number) => {
    console.log("게시글 아이디", board_id);
    localStorage.setItem("getBoardId_local", JSON.stringify(board_id));
    router.push("/detail");
  };

  return (
    <div className="post_box">
      {myLikePostData.length > 0 ? (
        myLikePostData.map((item) => (
          <div
            key={item.boardId}
            className="post"
            onClick={() => goDetail(item.boardId)}
          >
            {item.images && (
              <Image
                src={item.images.imageUrl}
                alt="좋아요 게시물 이미지"
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        ))
      ) : (
        <>
          <p className="post_box_p">게시물의 좋아요를 눌러주세요.</p>
        </>
      )}
    </div>
  );
}
