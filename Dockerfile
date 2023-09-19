# Use Debian-based Node image instead of Alpine for apt-get support
FROM oven/bun

# Metadata as before
MAINTAINER Brandon Tom

# Environment variable
ENV PORT=8379

# Copy project files
COPY . /var/www

# Set working directory
WORKDIR /var/www

# Update apt-get and install Yarn
RUN apt-get update && \
    apt-get install -y git

# Install project dependencies
RUN bun install

# Expose port
EXPOSE $PORT

# Run tests
ENTRYPOINT ["bun", "test"]
