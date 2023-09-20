# Use Debian-based Node image instead of Alpine for apt-get support
FROM node:lts

# Metadata as before
MAINTAINER Brandon Tom

# Environment variable
ENV PORT=6006

# Copy project files
COPY . /var/www

# Set working directory
WORKDIR /var/www

# Update apt-get and install Yarn
RUN apt-get update

# Install project dependencies
RUN corepack prepare yarn@1.22.19 --activate
RUN corepack enable yarn
RUN corepack yarn install

# Expose port
EXPOSE $PORT

ENTRYPOINT ["corepack", "yarn", "storybook"]
