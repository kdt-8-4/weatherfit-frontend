import "../style/_util.scss";

interface ContentDetailProps {
  content: string;
  hashTag: string[];
}

const ContentDetail = ({
  content,
  hashTag,
}: ContentDetailProps): JSX.Element => {
  const extractAndStyleHashtags = (content: string) => {
    const hashTagRegex = /#[^\s#]+/g;
    const splitContent = content.split(hashTagRegex);

    return splitContent.map((text, index) => {
      if (index === splitContent.length - 1) return text;

      const currentHashTag = content.match(hashTagRegex)![index];
      const tagIndex = hashTag.indexOf(currentHashTag.slice(1));

      return (
        <span
          key={index}
          className="hash-tag"
          style={{
            color: tagIndex !== -1 ? "#a8bbff" : "#000000",
            cursor: "pointer",
          }}
          onClick={() => handleHashTagClick(currentHashTag)}
        >
          {currentHashTag}
        </span>
      );
    });
  };

  const handleHashTagClick = (hashTag: string) => {
    console.log("Clicked hashtag:", hashTag);
  };

  return (
    <div className="content-detail">
      {extractAndStyleHashtags(content)}
      <br />
      {content} [해시태그: {hashTag.map((tag) => `#${tag}`).join(" ")}]
    </div>
  );
};

export default ContentDetail;
