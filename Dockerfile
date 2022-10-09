FROM nikolaik/python-nodejs:latest
COPY . /app
WORKDIR /app
RUN cd web && \
  npm install && \
  cd ../price_predict && \
  pip install -r requirements.txt && \
  cd ..
CMD ["node", "./web/index.js"]
