# Install dependencies only when needed
FROM node:16-alpine AS deps
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
RUN npm install react-scripts@3.4.1 -g --force

# add app
COPY . ./

# start app
CMD ["npm", "start"]
