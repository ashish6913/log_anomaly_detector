FROM maven:3.8.1-jdk-11-slim as build

WORKDIR /app
COPY  pom.xml ./
RUN mvn clean package -Dmaven.test.skip -Dmaven.main.skip -Dspring-boot.repackage.skip && rm -r target/
COPY src ./src 
RUN mvn clean package -Dmaven.test.skip=true

FROM openjdk:11-jre-slim
COPY --from=build /app/target/*.jar ./app.jar
ENTRYPOINT ["java", "-jar", "./app.jar"]

