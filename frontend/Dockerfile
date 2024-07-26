FROM node:18 AS build
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /frontend
COPY --from=build /frontend/build /frontend/build
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
