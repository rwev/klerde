# Klerde (Klima + Erde) [Demo](https://rwev.github.io/klerde/)
Pure TypeScript application for quick and dirty map measurements useful for outdoor terrain navigation. Relies on public and open sources, including USGS maps and elevation data, Nexrad and NOAA satellite weather, and OSM. Made progressive with Apache Cordova.

## Build 

Packages and tasked are managed with NPM, node package manager. To build, run
```shell
/klerde $ npm i && npm run build
```

This transpiles the TypeScript source and bundles it with JavaScript dependencies using webpack. 

To preview, open the webpage with a web browser. No server necessary - direct from filesystem.
```shell
/klerde $ firefox ./index.html
```

This project is a progressive webapp, simultaneously functional on desktop, mobile, and web platforms from the same codebase.

## Development 

Global installations
```shell
$ sudo npm i -g cordova
```

### For Android 
Install Java and Gradle 
```shell
$ sudo apt-get install openjdk-8-jdk
$ readlink -f $(which javac)
$ readlink -f $(which java)
$ export JDK_HOME=/usr/lib/jvm/java-8-openjdk-amd64/ # found with readlink
$ export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre/
$ sudo apt-get install gradle
$ export PATH=$PATH:/usr/gradle/gradle-5.4/bin # whereis gradle
```
Install [Android Studio](https://developer.android.com/studio/index.html) and create AVD
```shell 
$ tar -xvzf android-studio-ide-183.5452501-linux.tar.gz
$ cd android-studio/bin
$ ./studio.sh
$ export ANDROID_HOME=~/Android/Sdk/
$ export PATH=${PATH}:~/Android/Sdk/tools/bin/:~/Android/Sdk/platform-tools/bin/ # expose avdmanager, sdkmanager
$ sdkmanager "system-images;android-28;google_apis;x86_64"
$ avdmanager create avd --name klerde-avd -k "system-images;android-28;google_apis;x86_64"
```

Run 
```shell
$ cordova run android --target=klerde-avd
```


