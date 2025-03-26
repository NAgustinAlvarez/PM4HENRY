FROM node:20-alpine as development 
WORKDIR /usr/src/app
COPY packag*.json ./
RUN npm ci
COPY . . 
FROM node:20-alpine as build 
WORKDIR /usr/src/app
COPY packag*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . . 
RUN npm run build 
RUN npm ci --only=production && npm cache clean --force
FROM node:20-alpine as production 
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD [ "node", "dist/main.js" ]