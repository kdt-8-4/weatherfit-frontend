# FROM node:lts as build

# WORKDIR /app

# COPY package.json .

# RUN npm i

# COPY . .

# # RUN npm run build
# RUN npx next build

# FROM nginx:stable-alpine

# # nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
# RUN rm -rf /etc/nginx/conf.d
# COPY conf /etc/nginx

# # 위 스테이지에서 생성한 빌드 결과를 nginx의 샘플 앱이 사용하던 폴더로 이동
# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80

# # nginx 실행
# CMD [ "nginx", "-g", "daemon off;" ] 
FROM node:lts-alpine

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./ ./

RUN yarn build

EXPOSE 80

CMD [ "pm2-runtime", "start", "npm", "--", "run", "serve" ]