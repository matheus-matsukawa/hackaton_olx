FROM nikolaik/python-nodejs:latest
WORKDIR /app
COPY . /app
RUN apt update && \
  apt install -y python3-venv && \
  cd web && \
  npm install && \
  pip install -r /app/price_predict/requirements.txt && \
  cd ..
EXPOSE 8000
CMD ["node", "./web/index.js"]
