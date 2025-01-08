#!/bin/bash
 
if [[ "$VERCEL_ENV" == "production"  ]]; then
  npm run build:dev # run dev build in prod till demo backend is running
elif [[ "$VERCEL_ENV" == "crowdin"  ]]; then
  npm run build:crowdin
else 
  npm run build:dev
fi
