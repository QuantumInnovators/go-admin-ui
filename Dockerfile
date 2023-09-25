# 使用 Node 官方 LTS 版本镜像
FROM node:14.21.3-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g cnpm --registry=https://registry.npmmirror.com
COPY . .
RUN npm run build:prod

ARG GitCommit=unknown
LABEL GitCommit=${GitCommit}

# 切换到生产阶段，使用官方 Nginx 镜像
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
