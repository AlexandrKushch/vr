
FROM maven:3.8.4-jdk-11-slim AS build
RUN mkdir -p /home/app/src/main
COPY src/main /home/app/src/main
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM openjdk:11-jre-slim
RUN mkdir -p /usr/local/lib
COPY --from=build /home/app/target/vr-1.0-SNAPSHOT.jar /usr/local/lib/vr-1.0-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/local/lib/vr-1.0-SNAPSHOT.jar"]