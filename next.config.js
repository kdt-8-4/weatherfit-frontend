/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [
      "weatherfit-board-image.s3.amazonaws.com",
      "heesung-s3.s3.ap-northeast-2.amazonaws.com",
      "weatherfit-board-image-copy.s3.amazonaws.com",
    ],
  },
};

//s3에서 이미지 가져오는 것을 허용할려면 위처럼 선언해줘야함
