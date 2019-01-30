# First we'll setup the base image - from DockerHub usually
FROM node:8.10.0-alpine

# Change the working directory (one of many ways to orchestrate image setup)
WORKDIR /app/

ENV PATH /app/node_modules/.bin:$PATH

# Copy our app files into the container
COPY . /app/

# We can run abstract commands using the RUN command
RUN npm install

# By default a docker container is completely shut off from the ourside world,
# so we need to expose any ports/networking that our app needs
EXPOSE 3000

# Finally we specify our startup command, which runs AFTER the images is built
CMD ["npm", "start"]