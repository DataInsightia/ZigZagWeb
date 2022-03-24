npm run build
scp -P 21098 -r build/* dataioit@datainsightia.in:/home/dataioit/chettinadzigzag.in/
firebase deploy