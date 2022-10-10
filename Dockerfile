FROM nikolaik/python-nodejs:latest
WORKDIR /app
COPY . /app
RUN apt update && \
  apt install -y python3-venv && \
  cd web && \
  npm install && \
  python3 -m venv vm-olx && \
  . ./vm-olx/bin/activate && \
  pip install -r /app/price_predict/requirements.txt && \
  cd ..
CMD ["node", "./web/index.js"]
