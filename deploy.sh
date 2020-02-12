# This is a script used to deploy assuming the server repo is one directory up

yarn build
cd ../saloon
rm -rf react-build
mv ../saloon-client/build ./react-build
git add -A
git commit -m "update build"
git push origin master
cd ../saloon-client
