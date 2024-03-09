package com.simplypositive.pedmonitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// https://github.com/eugenp/tutorials/tree/master/spring-web-modules/spring-thymeleaf
// https://dev.to/arpan_banerjee7/run-react-frontend-and-springboot-backend-on-the-same-port-and-package-them-as-a-single-artifact-14pa
// https://stackoverflow.com/questions/64058885/how-to-integrate-a-react-webapp-inside-a-spring-boot-application-with-jar-packag
// https://marco.dev/deploy-java-react-one
@SpringBootApplication
public class PedMonitorApplication {

  public static void main(String[] args) {
    SpringApplication.run(PedMonitorApplication.class, args);
  }
}