FROM node:18 AS build
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .

FROM node:18
WORKDIR /backend
COPY --from=build /backend /backend
EXPOSE 5001
CMD ["npm", "start"]
