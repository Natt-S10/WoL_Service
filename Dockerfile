FROM node:hydrogen as builder
ARG TARGETPLATFORM
ARG BUILDPLATFORM
ENV PORT=3000
ENV TARGET_MAC_ADDRESS = "00:00:00:00:00:00"
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app/
CMD npm run start
# minimize image size

