# Toolbox Fullstack Challenge - React Frontend

A professional, production-ready React application that consumes the backend API and displays CSV file data in a clean, user-friendly interface. Built with modern React best practices and responsive design principles.

## Features

- 📊 Display CSV data in a clean, responsive table format
- 🔄 Loading states with Bootstrap spinners
- ❌ Comprehensive error handling with user-friendly messages
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Professional UI with React Bootstrap components
- ♿ Accessible design following WCAG guidelines
- 🚀 Optimized performance with React Hooks
- 🔢 Number formatting with thousand separators
- 🔄 Refresh functionality

## Technologies Used

- **React:** 19.2.0 (Functional Components + Hooks)
- **React Bootstrap:** 2.10.10
- **Bootstrap:** 5.3.8
- **Axios:** 1.12.2
- **Webpack:** 5.102.1
- **Babel:** 7.x
- **Node.js:** 16.x

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Header.js       # Red navbar component
│   │   └── FileTable.js    # Main table component with data fetching
│   ├── services/
│   │   └── apiService.js   # API integration with error handling
│   ├── App.js              # Root component
│   ├── App.css             # Global styles and responsive design
│   └── index.js            # React entry point
├── package.json            # Dependencies and scripts
├── webpack.config.js       # Webpack configuration
├── .babelrc                # Babel configuration
└── README.md               # This file
```

## Installation

### Prerequisites

- Node.js 16.x or higher
- npm (comes with Node.js)
- Backend API running on port 3000

### Steps

1. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment (optional)**

   Create a `.env` file in the frontend directory if you need to customize the API URL:

   ```
   REACT_APP_API_URL=http://localhost:3000
   ```

## Running the Application

### Development Mode (with hot reload)

```bash
npm start
```

The application will start on **http://localhost:3001** and automatically open in your browser.

The dev server includes:
- Hot module replacement
- Auto-reload on file changes
- Proxy to backend API on port 3000
- Source maps for debugging

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

The build is optimized with:
- Minified JavaScript and CSS
- Content hashing for cache busting
- Dead code elimination
- Production React optimizations

## API Integration

### Backend Endpoints

The frontend consumes the following backend API endpoints:

#### Primary Endpoint
```
GET http://localhost:3000/files/data
```

**Response Format:**
```json
[
  {
    "file": "test1.csv",
    "lines": [
      {
        "text": "RgTya",
        "number": 64075909,
        "hex": "70ad29aacf0b690b0467fe2b2767f765"
      }
    ]
  }
]
```

### API Configuration

The API base URL is configured in `src/services/apiService.js`:
- Default: `http://localhost:3000`
- Can be overridden with `REACT_APP_API_URL` environment variable
- Timeout: 10 seconds
- Headers: `Content-Type: application/json`

## Component Architecture

### App.js
- Root component that composes Header and FileTable
- Provides overall layout structure

### Header.js
- Bootstrap Navbar with red (`bg-danger`) background
- Displays "React Test App" title
- Fully responsive

### FileTable.js
- Main component that handles all data operations
- **States:**
  - `data` - Array of file objects from API
  - `loading` - Boolean for loading state
  - `error` - String for error messages
- **Features:**
  - Fetches data on component mount
  - Loading spinner during data fetch
  - Error handling with retry button
  - Empty state when no data available
  - Refresh button for manual reload
  - Number formatting with thousand separators
  - Responsive table with Bootstrap styling

### apiService.js
- Axios-based API client
- Centralized error handling
- User-friendly error messages
- Timeout configuration
- Request/response interceptors

## UX/UI Features

### Loading States
- Centered spinner with "Loading..." message
- Non-blocking, provides visual feedback
- Accessible with screen reader support

### Error Handling
- User-friendly error messages (no technical jargon)
- Retry button to attempt reload
- Different messages for different error types:
  - Connection errors
  - Timeout errors
  - Server errors
  - Invalid data errors

### Empty States
- Friendly message when no data available
- Refresh button to reload
- Clear visual feedback

### Responsive Design
- **Mobile (320px - 767px):** Horizontal scrolling table, touch-friendly
- **Tablet (768px - 991px):** Optimized spacing and font sizes
- **Desktop (992px+):** Full table view with all features

### Accessibility
- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Focus indicators visible

## Styling

### Color Scheme
- **Header:** Red/Danger (#dc3545)
- **Background:** Light gray (#f8f9fa)
- **Table:** Bootstrap default with hover effects
- **Alerts:** Red for errors, primary for info

### Typography
- System fonts for optimal performance
- Monospace font for hex values
- Proper font sizes and weights for hierarchy

### Table Styling
- Striped rows for better readability
- Bordered design for clear data separation
- Hover effects for interactivity
- Responsive wrapper for mobile devices

## Performance Optimizations

- **React.memo** for component memoization (where appropriate)
- **useCallback** for event handlers to prevent re-renders
- **useMemo** for expensive computations (total rows calculation)
- Proper cleanup in useEffect hooks
- Optimized re-rendering with proper dependency arrays

## Error Scenarios Handled

1. **API Server Not Running**
   - Message: "Unable to connect to server. Make sure the API is running."

2. **Request Timeout**
   - Message: "Request timed out. Please try again."

3. **Network Offline**
   - Message: "No internet connection. Please check your network."

4. **404 Not Found**
   - Message: "Endpoint not found. Please check API configuration."

5. **500 Server Error**
   - Message: "Server error. Please try again later."

6. **Invalid Data Format**
   - Message: "Invalid data received. Please contact support."

7. **Empty Response**
   - Displays empty state with refresh option

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| REACT_APP_API_URL | Backend API base URL | http://localhost:3000 | No |

## Testing the Application

### Manual Testing Steps

1. **Start the Backend API**
   ```bash
   cd api
   npm start
   ```
   Backend should be running on http://localhost:3000

2. **Start the Frontend**
   ```bash
   cd frontend
   npm start
   ```
   Frontend should open at http://localhost:3001

3. **Verify Functionality**
   - [ ] Loading spinner appears initially
   - [ ] Data loads and displays correctly in table
   - [ ] No console errors in browser
   - [ ] Refresh button works
   - [ ] Responsive design works on mobile/tablet/desktop

4. **Test Error Handling**
   - Stop backend API and click Retry
   - Should show error message
   - Start backend and click Retry again
   - Data should load successfully

### Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

**Port 3001 already in use:**
```bash
Error: listen EADDRINUSE: address already in use :::3001
```
Solution: Stop the process using port 3001 or change the port in `webpack.config.js`

**Cannot connect to API:**
```
Unable to connect to server. Make sure the API is running.
```
Solution: Ensure the backend API is running on http://localhost:3000

**Dependencies not found:**
```bash
Error: Cannot find module 'react'
```
Solution: Run `npm install` in the frontend directory

**Webpack compilation errors:**
Solution: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Development Tips

1. **Clear Browser Cache:** If changes don't appear, clear cache or use incognito mode
2. **Check Console:** Always check browser console for errors
3. **Network Tab:** Use browser DevTools Network tab to inspect API calls
4. **React DevTools:** Install React DevTools extension for component debugging

## Development Workflow

1. Make changes to source files
2. Webpack automatically recompiles
3. Browser auto-refreshes with changes
4. Check console for any errors
5. Test in multiple browsers/devices

## Production Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Serve the `dist/` directory** with any static file server:
   ```bash
   npx serve -s dist
   ```

3. **Update API URL** in production environment to point to production backend

## Code Quality

- Clean, readable code with meaningful variable names
- Functional components with React Hooks only
- Proper error handling and loading states
- Responsive design for all devices
- Accessible components following WCAG guidelines
- No console.logs in production code
- DRY principle followed throughout

## License

ISC

## Author

Toolbox Fullstack Challenge Project

---

**Ready to view your CSV data in style!** 🚀
