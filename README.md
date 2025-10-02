This is a [Next.js](https://nextjs.org) project [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# The Store

The Store is a modern e-commerce web application built with [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/), [NextAuth](https://next-auth.js.org/), [DaisyUI](https://daisyui.com/) (on top of [Tailwind CSS](https://tailwindcss.com/)), and [TypeScript](https://www.typescriptlang.org/). It features product browsing, shopping cart, Google authentication, and a responsive, animated UI.

---

## Features

- **Product Catalog**: Browse products with images, descriptions, and prices.
- **Shopping Cart**: Add, update, and remove products from your cart. Cart is persisted for guests and linked to users.
- **Authentication**: Sign in with Google using NextAuth. User accounts are managed in the database.
- **Add Products**: Admins can add new products via a form.
- **Responsive UI**: Mobile-friendly, animated interface using DaisyUI and Framer Motion.
- **Dark/Light Theme**: Toggle between light and dark modes.
- **Real-Time Chat Foundation**: (Planned) Architecture and schema extensions for future real-time chat features.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/the-store.git
   cd the-store
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   Google_Client_id=your-google-client-id
   Google_secret=your-google-client-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_CLIENT_ID=your-nextauth-client-id
   ```

4. **Set up the database:**

   Generate the Prisma client and run migrations:

   ```sh
   npx prisma generate
   npx prisma migrate deploy
   ```

5. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open the app:**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
.
├── src/
│   ├── app/                # Next.js app directory (routing, pages, layout)
│   ├── components/         # Reusable UI components (Navbar, ProductCard, etc.)
│   ├── lib/                # Server-side utilities (Prisma, formatting, cart logic)
│   ├── generated/prisma/   # Prisma client (auto-generated)
│   └── types/              # TypeScript type definitions
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets (SVGs, images)
├── .kiro/                  # Kiro agent specs and requirements (for chat foundation)
├── .vscode/                # VSCode settings
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project metadata and scripts
└── README.md               # Project documentation
```

---

## Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production (runs `prisma generate` and `next build`)
- `npm run start` – Start the production server
- `npm run lint` – Run ESLint

---

## Technologies Used

- **Next.js** (App Router, SSR, API routes)
- **Prisma** (ORM for PostgreSQL)
- **NextAuth** (Google OAuth)
- **Tailwind CSS** & **DaisyUI** (UI styling)
- **Framer Motion** (animations)
- **TypeScript** (type safety)
- **Zod** (runtime validation)
- **React** (v19)

---

## Authentication

- Google OAuth via NextAuth
- User sessions are persisted and integrated with Prisma
- Only authenticated users can access certain features (e.g., adding products)

---

## Database

- PostgreSQL schema managed by Prisma
- Models: `Product`, `Cart`, `cartItem`, `User`, `Account`, `Session`, `VerificationToken`
- See [`prisma/schema.prisma`](prisma/schema.prisma) for details

---

## Styling

- Tailwind CSS with DaisyUI for component styling
- Prettier and ESLint for code formatting and linting

---

## Planned Features

- **Real-Time Chat**: The `.kiro/specs/real-time-chat-foundation/` directory contains requirements and design docs for a future real-time chat system, including WebSocket integration, message persistence, and user presence.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
