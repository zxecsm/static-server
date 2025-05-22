```
services:
  static-server:
    image: 'zxecsm/static-server:latest'
    container_name: static-server
    restart: unless-stopped
    volumes:
      - ./files:/root/static
    ports:
      - '33333:33333'
```
