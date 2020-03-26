FROM circleci/node:latest-browsers

WORKDIR /usr/src/app/
USER root
COPY ./ ./
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn

RUN npm run fetch:blocks

CMD ["npm", "run", "build"]
