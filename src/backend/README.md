This `src/backend` folder contains lightweight, framework-agnostic backend helpers for local development and prototyping.

Structure
- `auth/` - authentication logic (authService.ts)
- `controllers/` - controller-like wrappers that produce { status, body } for API routes
- `services/` - simple services (e.g. `userService` with in-memory store)

How to wire into Next.js API routes
1. For the App Router (recommended in this repo) create route handlers under `src/app/api`:

```ts
// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { handleSignUp } from '@/backend/controllers/authController';

export async function POST(req: Request) {
  const body = await req.json();
  const result = await handleSignUp(body);
  return NextResponse.json(result.body, { status: result.status });
}
```

2. If you're using the Pages Router you can create `src/pages/api/auth/signup.ts` and call the controller helpers similarly.

Notes
- The current auth implementation is intentionally minimal (in-memory store and placeholder hashing). Replace with secure implementations for production: bcrypt, proper session/JWT handling, and a real database.
- Feel free to move these files to a separate package or server runtime as you separate frontend and backend.
 
Setup
- Install required packages for hashing and JWTs:

```powershell
npm install bcryptjs jsonwebtoken
# (optional) add types for better TS experience:
npm install -D @types/jsonwebtoken
```

- Set a secure `JWT_SECRET` environment variable in your hosting environment or `.env` file. Example `.env` entry:

```
JWT_SECRET=your-very-secret-key
```

The backend will sign tokens on sign-in/sign-up and the `GET /api/auth/profile` endpoint will accept `Authorization: Bearer <token>` or a `token` cookie to return the currently-authenticated user's profile.
