"use client";
import Image from "next/image";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { ProfileTemperature } from "@/recoilAtom/ProfileTemperature";
import { useRecoilState } from "recoil";

interface ProfileProps {
  nickName: string;
  userImage: string | null;
}

const Profile = ({ nickName, userImage }: ProfileProps): JSX.Element => {

  const [profile_temperature, setProfileTemperature] = useRecoilState(ProfileTemperature);

  return (
    <div className="profile w-full h-20 flex items-center p-3">
      <div className="img relative rounded-full overflow-hidden w-12 h-12 md:w-18 md:h-18 lg:w-18 lg:h-18">
        {userImage == null ? (
          <AccountCircleOutlinedIcon
            className="user_image_icon"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Image
            src={userImage}
            alt="프로필 이미지"
            width={100}
            height={100}
            layout="responsive"
            className="user_image_icon"
          />
        )}
      </div>
      <div className="text flex flex-col ml-2">
        <span>{nickName}</span>
        <span> {profile_temperature} ℃</span>
      </div>
    </div>
  );
};

export default Profile;
