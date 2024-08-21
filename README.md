This is a [Next.js](https://nextjs.org/) application bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), Supabase & Clerk

## Requirements
- #### Supabase project
- #### Clerk application

### Connecting Supabase
- Navigate to your Supabase project dashboard.
- Navigate to settings/api.
- Add the Project URL & API key to your .env file.
- Also save JWT secret key as this will be needed to connect clerk.

### Connecting Clerk
- Navigate to your Clerk application.
- Navigate to API Keys page.
- Add clerk NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY & CLERK_SECRET_KEY to your .env file
- Then navigate to JWT templates
- Create a new template & add your supabase JWT secret in the signing key sections

Run npm i and then you're on your own.
