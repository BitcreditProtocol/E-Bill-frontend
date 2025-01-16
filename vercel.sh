#!/bin/bash
 
if [[ "$VERCEL_URL" == "e-bill-frontend-crowdin.vercel.app"  ]]; then
  npm run build:crowdin
else 
  npm run build:dev
fi
