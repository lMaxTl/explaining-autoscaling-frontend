docker build -t ba-frontend .
docker tag ba-frontend maximeschwarzer/ba-frontend:latest
docker push maximeschwarzer/ba-frontend:latest