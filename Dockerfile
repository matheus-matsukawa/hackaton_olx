FROM nikolaik/python-nodejs:latest
RUN cd ~
RUN python3 -m venv vm_olx
RUN cd ./price_predict
RUN . ./vm_olx/bin/activate
RUN cd ..
RUN node ./web/index.js