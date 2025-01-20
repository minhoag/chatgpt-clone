# ChatGPT-Clone

This is a chat application built with TypeScript, PostgreSQL, and Next.js. It
features a chat interface and can manage multiple conversation sessions.

## Features

- Real-time messaging
- Conversation management
- Responsive design

<div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 5rem">
   <img src="https://i.ibb.co/KmcRmF1/image.png" alt="image">
   <img src="https://i.ibb.co/gTJCg7W/image.png" alt="response_interface">
</div>

## To-Do

- [ ] Create a user profile feature to allow users to change their name,
      password, etc.
- [x] Implement chat interface
- [x] Implement chat session management
- [x] Implement delete chat session
- [x] Implement skeleton for loading chat

## Technologies Used

- Next.js
- NextAuth
- TypeScript
- Prisma (PostgreSQL)

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/minhoag/chat-application.git
   cd chatgpt-clone
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up local variables:

   - Rename `.env.example` file to `.env`
   - Fill in all variables.

4. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `components/`: Contains React components used in the application.
- `lib/`: Contains utility functions and configurations.
- `pages/`: Contains Next.js pages.
- `prisma/`: Contains Prisma schema and migrations.
- `public/`: Contains static assets.
- `styles/`: Contains global styles.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more
details.
