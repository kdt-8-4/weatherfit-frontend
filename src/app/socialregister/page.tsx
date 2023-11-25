"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CompleteProfile() {
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  // 닉네임 설정 완료 후 다음 단계로 이동
  const handleNicknameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "",
        data: {
          name,
          nickname,
        },
      });
      router.push("/");
    } catch (error) {
      console.error("닉네임 저장 오류:", error);
    }
  };

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1>닉네임 설정</h1>
      <form onSubmit={handleNicknameSubmit}>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
