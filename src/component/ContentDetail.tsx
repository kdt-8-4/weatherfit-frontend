import { useEffect, useState } from "react";
import "../style/_util.scss";
import { useRouter } from "next/navigation";

interface ContentDetailProps {
  content: string;
  hashTag: string[];
}

const ContentDetail = ({
  content,
  hashTag,
}: ContentDetailProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false); // 더 보기 상태를 저장하는 상태 변수
  const [showButton, setShowButton] = useState(false); // "더 보기" 버튼을 표시할지 여부를 저장하는 상태 변수
  const router = useRouter();

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 실행되는 효과
    const contentElement = document.getElementById("content"); // 글 내용을 감싸는 요소의 ID를 가져옴
    if (contentElement) {
      const { scrollHeight, clientHeight } = contentElement;
      if (scrollHeight > clientHeight) {
        // 스크롤 높이가 클라이언트 높이보다 크면 "더 보기" 버튼을 표시
        setShowButton(true);
      }
    }
  }, []);

  const handleToggleExpand = () => {
    setExpanded(!expanded); // "더 보기" 버튼을 클릭할 때마다 상태를 변경하여 글을 확장 또는 축소
  };

  const handleHashTagClick = (hashTag: string) => {
    console.log("Clicked hashtag:", hashTag);
    // router.push(`/feed?hashtag=${hashTag}`);
  };

  const extractAndStyleHashtags = (content: string) => {
    const hashTagRegex = /#[^\s#]+/g;
    const splitContent = content.split(hashTagRegex);
    const matchedHashTags = content.match(hashTagRegex) || [];

    const result: (string | JSX.Element)[] = [];

    splitContent.forEach((current, index) => {
      const replacedContent = current.replace(/\n/g, "<br />"); // 줄바꿈 문자를 <br /> 태그로 대체

      result.push(
        <span
          key={`content-${index}`}
          dangerouslySetInnerHTML={{ __html: replacedContent }} // HTML 문자열을 설정하여 줄바꿈 인식
        />,
      );

      if (index !== splitContent.length - 1) {
        const currentHashTag = matchedHashTags[index];
        const tagIndex = hashTag.indexOf(currentHashTag.slice(1));

        result.push(
          <span
            key={`hashtag-${index}`}
            className="hash-tag"
            style={{
              color: tagIndex !== -1 ? "#a8bbff" : "#000000",
              cursor: "pointer",
            }}
            onClick={() => handleHashTagClick(currentHashTag)}>
            {currentHashTag}
          </span>,
        );
      }
    });

    return result;
  };

  return (
    <div
      className="content-detail w-full p-3"
      style={{ paddingBottom: "30px", height: "100%" }}>
      <div
        id="content"
        className={`${
          expanded ? "" : "max-h-20 overflow-hidden"
        } transition-max-height duration-300`}>
        {extractAndStyleHashtags(content)}
      </div>
      {showButton && (
        <button className="text-blue-500 mt-2" onClick={handleToggleExpand}>
          {expanded ? "접기" : "더 보기"}
        </button>
      )}
    </div>
  );
};

export default ContentDetail;
