# Todo App

A modern, responsive todo list application built with Next.js 14, TypeScript, and Tailwind CSS. Features a clean interface with task management, color coding, and progress tracking.

## Features

- ✅ Create, edit, and delete tasks
- 🎨 Color-coded task organization
- 📊 Task completion tracking
- 💾 Persistent data storage
- 📱 Responsive design
- ⚡ Fast performance with Next.js

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Express.js API
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chaitanya9494/todoApp-NextJS.git
   cd todoApp-NextJS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   
   The application requires a backend API server running on port 5000. Make sure your Express.js backend is running before starting the frontend.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
todoApp-NextJS/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Homepage
│   └── tasks/            # Task-related pages
│       ├── new/          # Create task page
│       └── [id]/edit/    # Edit task page
├── components/            # Reusable React components
│   ├── TaskCard.tsx      # Individual task display
│   └── TaskSummary.tsx   # Task statistics
├── lib/                  # Utility libraries
│   └── api.ts           # API client configuration
├── types/               # TypeScript type definitions
│   └── index.ts
└── public/             # Static assets
    ├── logo.png
    └── icons/
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Usage

### Creating Tasks
1. Click the "Create Task" button on the homepage
2. Enter a task title
3. Choose a color for organization
4. Click "Add Task" to save

### Managing Tasks
- **Complete**: Click the checkbox next to any task
- **Edit**: Click on the task text to modify it
- **Delete**: Click the trash icon to remove a task

### Task Statistics
The app displays your progress with a "X de Y" format showing completed tasks out of total tasks.

## Customization

### Adding New Colors
Edit the `COLORS` array in `types/index.ts` to add new color options:

```typescript
export const COLORS = [
  { name: 'Red', value: '#FF6B6B' },
  { name: 'Blue', value: '#4ECDC4' },
  // Add more colors here
]
```

### Modifying Styles
The app uses Tailwind CSS for styling. You can:
- Edit `app/globals.css` for global styles
- Modify component classes for specific styling
- Update `tailwind.config.js` for theme customization

## API Integration

The frontend communicates with a REST API. Key endpoints:

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create new task
- `GET /tasks/:id` - Get specific task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Troubleshooting

### Common Issues

**"Cannot connect to server" error**
- Ensure your backend API is running on the correct port
- Check network connectivity
- Verify API endpoint URLs in `lib/api.ts`

**Tasks not loading**
- Confirm backend server is operational
- Check browser console for error messages
- Verify API responses match expected format

**Styling issues**
- Run `npm run build` to regenerate Tailwind styles
- Clear browser cache
- Check for CSS conflicts

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, please reach out through the repository's issue tracker.

---

Built with ❤️ using Next.js and modern web technologies.
