bookMarky/
├── client/                             # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                        # API calls with TanStack Query
│   │   │   ├── auth.ts
│   │   │   └── bookmarks.ts
│   │   ├── components/                # Reusable UI components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── BookmarkList.tsx
│   │   │   └── BookmarkItem.tsx
│   │   ├── context/                   # React Context API
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/                     # Custom React hooks
│   │   │   └── useAuth.ts
│   │   ├── pages/                     # Route components
│   │   │   ├── Login.tsx
│   │   │   ├── Home.tsx
│   │   │   └── Bookmarks.tsx
│   │   ├── routes/                    # React Router setup
│   │   │   └── AppRouter.tsx
│   │   ├── types/                     # Shared types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── tsconfig.json
│
├── server/                             # Express Backend
│   ├── src/
│   │   ├── controllers/               # Business logic
│   │   │   ├── authController.ts
│   │   │   └── bookmarkController.ts
│   │   ├── models/                    # Mongoose models
│   │   │   ├── User.ts
│   │   │   └── Bookmark.ts
│   │   ├── routes/                    # Express route handlers
│   │   │   ├── authRoutes.ts
│   │   │   └── bookmarkRoutes.ts
│   │   ├── types/                     # TypeScript interfaces
│   │   │   ├── user.ts
│   │   │   └── bookmark.ts
│   │   ├── utils/                     # Helper utilities
│   │   │   ├── hash.ts
│   │   │   └── db.ts
│   │   ├── app.ts                     # Express app setup
│   │   └── index.ts                   # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── README.md
└── package.json                      # Root (optional monorepo)
