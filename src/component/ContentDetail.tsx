interface ContentDetailProps {
  content: string;
  hashTag: string[];
}

const ContentDetail = ({
  content,
  hashTag,
}: ContentDetailProps): JSX.Element => {
  const extractAndStyleHashtags = (content: string) => {};

  return (
    <div className="content-detail">
      {content}+ {hashTag}
    </div>
  );
  // 해시태그가 content 내부에 포함 -> 글과 같이 해시태그 나와야 되고 해시태그는 #해시태그 이런 식으로 보여야 되며 색 달라야되고, 클릭 되야되며 클릭되면 그 해시태그로 검색하는 페이지로 이동하게 해야함
};

export default ContentDetail;
