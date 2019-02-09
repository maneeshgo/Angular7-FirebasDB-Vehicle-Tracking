#!/bin/sh
echo "In the diabetic supply build script, about to run npm install"
./ci/npm_install.sh
if [ $? -ne 0 ]; then
  echo "npm-install error, exiting.."
  exit 1
fi

echo "Removing existing bundles.."
rm -rf ./dist


echo "Executing a build"
npm run build:aot:prod

if [ $? -ne 0 ]; then
echo "Build error, exiting.."
 exit 1
fi

chmod -R 755 dist/

# zip for shipment, remove if it exists
rm -f dist.zip
cd dist
zip -r ../dist.zip *
if [ $? -ne 0 ]; then
  echo "Zipping the dist directory resulted in an error"
  exit 1
fi
cd ..

