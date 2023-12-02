/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['weatherfit-board-image.s3.amazonaws.com'],
  },
};

//s3에서 이미지 가져오는 것을 허용할려면 위처럼 선언해줘야함
