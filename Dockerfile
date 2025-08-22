# 공식 Node.js 이미지를 기본 이미지로 사용
FROM node:14

# 컨테이너 내 작업 디렉토리를 설정
WORKDIR /usr/src/app

# package.json 및 package-lock.json 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 애플리케이션 소스 코드 복사
COPY . .

# 컨테이너에서 열 포트 지정 (Node.js 앱은 3000번 포트에서 실행됨)
EXPOSE 3000

# 컨테이너 실행 시 실행할 명령
CMD ["npm", "start"]
