
rm -rf node_modules/
rm -rf package-lock.json
npm i
npm run build
scp -P 21098 -r build/* dataioit@datainsightia.in:/home/dataioit/chettinadzigzag.in/