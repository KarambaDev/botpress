FROM ubuntu:18.04
# ADD ./graphicsmagick_1.3.35-2_all.deb /gm/
# RUN dpkg -i /gm/graphicsmagick_1.3.35-2_all.deb
RUN apt update && apt install -y wget ca-certificates graphicsmagick && update-ca-certificates && wget -O duckling https://s3.amazonaws.com/botpress-binaries/duckling-example-exe && chmod +x duckling
ADD ./out/binaries/ /botpress
WORKDIR /botpress
RUN chmod +x bp && chgrp -R 0 /botpress && chmod -R g=u /botpress && apt install -y tzdata && ln -fs /usr/share/zoneinfo/Europe/Moscow /etc/localtime && dpkg-reconfigure --frontend noninteractive tzdata && ./bp extract
ENV BP_MODULE_NLU_DUCKLINGURL=http://localhost:8000
ENV BP_IS_DOCKER=true
ENV LANG=C.UTF-8
EXPOSE 3000
CMD ["./bp"]