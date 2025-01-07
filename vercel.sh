#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  npm run build
else if [[ $VERCEL_ENV == "crowdin"  ]] ; then 
  npm run build:crowdin
else 
  npm run build:dev
fi