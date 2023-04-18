### BLE Advertisements
###### A Cross-Platform App for testing BLE advertisements 
> Tested with Android 6+, Android Chrome on linux/mac/win

###### What is inside?
- [Ionic Framework](https://ionicframework.com/)
- [React JS](https://reactjs.org/)
- [Capacitor JS](https://capacitorjs.com)
- [Capacitor Community Bluetooth LE Plugin](https://github.com/capacitor-community/bluetooth-le)

#### Run & Build

##### Use

- [Android APK](https://github.com/PraveenNale/bleAds/blob/main/apk/bleAds.apk)
<!---
- [BLE Advertiments on web (Needs Updated Desktop Chrome for Linux, Mac or Windows)](https://PraveenNale.github.io/bleAds)

<!---
(https://googlechrome.github.io/samples/web-bluetooth/scan.html)
--->

##### Development
- install node and npm
- install @ionic/cli
- install dependencies
```
npm install -g @ionic/cli
npm install
```
- Web Bluetooth needs secure site to access BLE devices. vite.config.ts includes config for running https server. Include your ssl cert.pem/key.pem in ../ssl foder.
- Scanning is still under development. Needs Chrome 79+ with the chrome://flags/#enable-experimental-web-platform-features flag enabled.
- Run the project in development mode
```
ionic serve --host 0.0.0.0 --no-open
```
- Open the app in chrome: (https://localhost:8100)
- Or on android/chrome: https://\<devIp\>:8100

##### Build for production
###### Web
```
ionic build
```
On success the dist directory will contain a production web build of the app

###### Android
> requires Linux machine & docker installed
```
sh build_android
```
apk directory will contain bleAds.apk
