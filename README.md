# PED Monitor App: backend + frontend (Java & SpringBoot + React JS)


The project uses the Maven build system and contains the parent POM and 2 modules (frontend and backend).

*What is doing Maven?*

- parent pom.xml - It declares the 2 modules to build. frontend for React and backend for Java.
- install the missing libraries (node) and dependencies
- build the frontend using *frontend-maven-plugin* and the frontend *static/public* directory of Spring Boot
- build the final fat JAR that can be started or deployed in a container OR locally

The 2 modules can be started separately during the development. The React app will use the port 3000, the Java application will use the port 8080.

#
### Build
Both backend and frontend are packed together into a JAR file, the HTML & JS resources being served by the embedded SpringBoot Tomcat application server.

### Create Deliverables
- Build the APP and create a ZIP file
  - build the fat JAR by running the Maven **package** command on the parent POM file
  - Download JRE v21 from https://adoptium.net/en-GB/temurin/releases/?os=windows&arch=x64&package=jre
  - rename the downloaded JRE directory to **'jre'**
  - Create a new directory called **'ped_monitor' and ** copy the **'jre'** directory, the fat JAR and all the files from the **executables** folder
- Host the ZIP file somewhere so it can be downloaded by the **installer.cmd** (i.e. Google Drive)
- On a Windows host run the **installer.cmd**

#
##### How To resources:
- https://dev.to/arpan_banerjee7/run-react-frontend-and-springboot-backend-on-the-same-port-and-package-them-as-a-single-artifact-14pa
- https://stackoverflow.com/questions/64058885/how-to-integrate-a-react-webapp-inside-a-spring-boot-application-with-jar-packag
- https://marco.dev/deploy-java-react-one