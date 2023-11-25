import { useEffect, useRef, useState, KeyboardEvent } from "react";
import "../style/textArea.scss";

interface TextAreaProps {
  content: string;
  placeholder: string;
  handleContent: (content: string) => void; // 부모 컴포넌트로 글 데이터 전달
  handleHashtags: (hashtags: string[]) => void; // 부모 컴포넌트로 해시태그 데이터 전달
}

const TextArea: React.FC<TextAreaProps> = ({
  content,
  placeholder,
  handleContent,
  handleHashtags,
}) => {
  const [text, setText] = useState<string>(content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null); //DOM 접근

  // 해시태그 span으로 감쌈
  const handleInputChange = () => {
    if (textAreaRef.current) {
      const content = textAreaRef.current.value || "";
      const hashtags = extractHashtags(content); // 해시태그 추출
      handleHashtags(hashtags); // 추출한 해시태그 부모 컴포넌트로 전달
      setText(content);
      handleContent(content); // 글 내용 부모 컴포넌트로 전달
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const { selectionStart, value } = event.currentTarget;
      const newValue =
        value.substring(0, selectionStart) +
        "\n" +
        value.substring(selectionStart);
      setText(newValue);
      if (textAreaRef.current) {
        textAreaRef.current.value = newValue;
        textAreaRef.current.setSelectionRange(
          selectionStart + 1,
          selectionStart + 1,
        );
      }
    }
  };

  // text 영역에 포커스가 맞춰질 때 placeholder 처리
  const handleFocus = () => {
    if (textAreaRef.current && textAreaRef.current.value === placeholder)
      setText("");
  };

  return (
    <textarea
      ref={textAreaRef}
      rows={5}
      value={text}
      placeholder={placeholder}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      className="text-area"
      onChange={handleInputChange}
    />
  );
};

export default TextArea;
