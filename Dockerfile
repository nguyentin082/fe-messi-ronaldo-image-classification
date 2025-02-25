# Sử dụng image node để build app React
FROM node:18 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN npm run build

# Sử dụng Nginx để serve frontend
FROM nginx:1.26.3

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]