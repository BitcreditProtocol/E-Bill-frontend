#!/bin/bash
 
if [[ "$VERCEL_ENV" == "production"  ]]; then
  npm run build
elif [[ "$VERCEL_ENV" == "crowdin"  ]]; then
  npm run build:crowdin
else 
  npm run build:dev
fi
