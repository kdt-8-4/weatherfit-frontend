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
    const matchedHashTags = content.match(hashTagRegex) || [];

    return splitContent.reduce(
      (prev: (string | JSX.Element)[], current, index) => {
        if (index !== splitContent.length - 1) {
          const currentHashTag = matchedHashTags[index];
          const tagIndex = hashTag.indexOf(currentHashTag.slice(1));

          return prev.concat(
            current,
            <span
              key={index}
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

        return prev.concat(current);
      },
      [],
    );
  };

  const handleHashTagClick = (hashTag: string) => {
    console.log("Clicked hashtag:", hashTag);
  };

  return (
    <div className="content-detail">{extractAndStyleHashtags(content)}</div>
  );
};

export default ContentDetail;
