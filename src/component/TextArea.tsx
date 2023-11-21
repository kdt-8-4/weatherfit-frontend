import { useEffect, useRef, useState, KeyboardEvent } from "react";
import "../style/textArea.scss";

interface TextAreaProps {
  content: string;
  placeholder: string;
  handleHashtags: (hashtags: string[]) => void; // 부모 컴포넌트로 해시태그 데이터 전달
}

const TextArea: React.FC<TextAreaProps> = ({
  content,
  placeholder,
  handleHashtags,
}) => {
  const [text, setText] = useState<string>(content);
  const textAreaRef = useRef<HTMLDivElement>(null); //DOM 접근

  // 처음 렌더링될 때만 placeholder 나오게 실행
  useEffect(() => {
    handleInputChange();
  }, [content]);

  // 해시태그 span으로 감쌈
  const handleInputChange = () => {
    if (textAreaRef.current) {
      const content = textAreaRef.current.textContent || "";
      const hashtags = extractHashtags(content); // 해시태그 추출
      handleHashtags(hashtags); // 추출한 해시태그 부모 컴포넌트로 전달
      setText(content);
    }
  };

  const extractHashtags = (content: string): string[] => {
    const regex = /#(\S+)/g; // # 다음에 공백이 아닌 모든 문자를 해시태그로 간주하는 정규식
    const matches = content.match(regex);
    if (matches) {
      // 매칭된 해시태그들을 반환
      return matches.map((match) => match.substring(1)); // #을 제외한 문자열 반환
    }
    return [];
  };
  // 엔터키 인식해서 줄바꿈 가능하게
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.execCommand("insertLineBreak");
    }
  };

  // text 영역에 포커스가 맞춰질 때 placeholder 처리
  const handleFocus = () => {
    if (textAreaRef.current && textAreaRef.current.textContent === placeholder)
      textAreaRef.current.textContent = "";
  };

  // focus 해제될 때
  const handleBlur = () => {
    handleInputChange();
  };

  return (
    <div
      ref={textAreaRef}
      contentEditable //div 글 작성 ok
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="text-area"
      suppressContentEditableWarning // ContentEditable 경고 제거
      dangerouslySetInnerHTML={{ __html: text || placeholder }} // text가 없으면 placeholder 나오게
    />
  );
};

export default TextArea;
