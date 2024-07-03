FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies, including bcrypt
RUN npm install

# Copy all other source code to the working directory
COPY . .

CMD ["npm", "run", "dev"]