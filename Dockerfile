FROM nikolaik/python-nodejs:latest
WORKDIR /app
COPY . /app
RUN apt update && \
  pip install --upgrade pip && \
  cd web && \
  npm install && \
  cd ../price_predict && \
  pip install -r requirements.txt && \
  cd ..
CMD ["node", "./web/index.js"]
