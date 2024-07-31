FROM node:20

WORKDIR /usr/src/app

# Error message when building suggested to not copy node_modules folder
# Copy package.json first
COPY package.json ./

# Install dependencies inside the Docker container
RUN npm install

# Copy remainder of the application code
COPY . .

CMD ["npm", "run", "dev"]