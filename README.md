# peak-app

## Getting started

1. In `apps/backend` is located `.env.example`, which describes structure of `.env` file. In mentioned folder create `.env` file and fill in all empty values.
2. In root folder run `docker compose up -d` to run a DB.
3. In `apps/backend` run `npm i`, `npm run migrate` and `npm run dev`
4. For initializing mock data, run `npm run init-data`
