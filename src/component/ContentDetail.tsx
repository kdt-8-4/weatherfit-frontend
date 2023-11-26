interface ContentDetailProps {
  content: string;
}

const ContentDetail = ({ content }: ContentDetailProps): JSX.Element => {
  // 해시태그를 추출하고 색상을 바꾸는 로직 등을 포함하여 구현
  // 추출한 해시태그를 강조하여 표시하는 방식으로 구현
  const extractAndStyleHashtags = (content: string) => {
    // ...해시태그 추출 및 스타일 적용 로직
  };

  return <div className="content-detail">{content}</div>;
};

export default ContentDetail;
