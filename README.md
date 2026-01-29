# Late Assignment Excuse Voter

A Next.js web app with PostgreSQL backend for collecting and voting on creative excuses for late assignments.

## Features

- Submit excuses for late assignments
- Vote on excuses (upvote/downvote)
- Sort by top voted or most recent
- Real-time data persistence with PostgreSQL
- Responsive design with Tailwind CSS
- Deployed on Vercel

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Vercel Postgres)
- **Deployment**: Vercel

## Local Development

### Prerequisites

- Node.js 18+ (you currently have v12 - you'll need to upgrade)
- A Vercel account with Postgres database

### Setup

1. **Upgrade Node.js** (required):
   ```bash
   # Using nvm (recommended):
   nvm install 18
   nvm use 18

   # Or download from https://nodejs.org/
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Add your Vercel Postgres connection string (see deployment steps)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Deployment to Vercel

### Step-by-Step Instructions:

1. **Install Vercel CLI** (optional but helpful):
   ```bash
   npm install -g vercel
   ```

2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. **Deploy to Vercel**:

   **Option A: Via Vercel Dashboard (Easiest)**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

   **Option B: Via CLI**
   ```bash
   vercel
   ```

4. **Add PostgreSQL Database**:
   - In your Vercel project dashboard, go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose a name and region
   - Click "Create"
   - Vercel will automatically add the environment variables to your project

5. **Initialize the Database**:
   - After deployment, visit your app URL
   - The database table will be created automatically on first API call
   - Or you can run the SQL from `schema.sql` in the Vercel Postgres dashboard

6. **That's it!** Your app is now live.

## What You Need for Vercel Deployment

✅ **GitHub account** - to host your code
✅ **Vercel account** - free tier is fine (sign up at vercel.com)
✅ **Nothing else!** - Vercel provides:
  - Hosting (free)
  - PostgreSQL database (free tier: 256MB storage, 60 hours compute/month)
  - Automatic SSL certificates
  - CI/CD pipeline

## Environment Variables

The following environment variables are automatically set by Vercel when you create a Postgres database:

- `POSTGRES_URL` - Connection string for the database
- `POSTGRES_PRISMA_URL` - Connection string for Prisma
- `POSTGRES_URL_NON_POOLING` - Non-pooling connection string
- `POSTGRES_USER` - Database user
- `POSTGRES_HOST` - Database host
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DATABASE` - Database name

## Project Structure

```
excuse-vote-app/
├── app/
│   ├── api/
│   │   └── excuses/
│   │       ├── route.ts          # GET & POST excuses
│   │       └── [id]/
│   │           └── vote/
│   │               └── route.ts  # POST vote
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Main page
│   └── globals.css                # Global styles
├── lib/
│   └── db.ts                      # Database functions
├── schema.sql                     # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## API Endpoints

- `GET /api/excuses?sort=votes|recent` - Get all excuses
- `POST /api/excuses` - Create new excuse
- `POST /api/excuses/[id]/vote` - Vote on excuse

## Future Enhancements

- User authentication
- Comments on excuses
- Categories for different classes
- Rate limiting
- Moderation features
- Export to CSV
