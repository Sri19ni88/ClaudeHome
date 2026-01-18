# 🍳 Fridge Recipe Maker

An AI-powered web application that analyzes photos of your refrigerator contents and suggests personalized recipes complete with cooking instructions and nutritional information.

## ✨ Features

- **📸 Image Recognition**: Upload a photo of your fridge and let AI identify the ingredients
- **🤖 AI-Powered Recipe Generation**: Get creative recipe suggestions based on available ingredients
- **👨‍🍳 Step-by-Step Instructions**: Clear, easy-to-follow cooking instructions
- **🥗 Nutritional Information**: Complete nutrition facts for each recipe (calories, protein, carbs, fat, fiber)
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Beautiful UI**: Modern, intuitive interface with smooth animations

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Claude AI (Anthropic)** - Vision and text generation
- **Multer** - File upload handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Claude API Key** from Anthropic ([Get one here](https://console.anthropic.com/))

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ClaudeHome
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Claude API key:

```env
ANTHROPIC_API_KEY=your_actual_api_key_here
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 🎮 Running the Application

You'll need to run both the backend and frontend servers.

### Start the Backend Server

```bash
cd server
npm run dev
```

The backend will start on `http://localhost:3001`

### Start the Frontend Development Server

In a new terminal:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to: `http://localhost:5173`

## 📖 How to Use

1. **Upload Image**: Click the upload area or drag and drop a photo of your fridge
2. **Analyze Ingredients**: Click "Analyze Ingredients" to let AI identify items
3. **Review Items**: Check the identified ingredients (they'll be displayed as cards)
4. **Generate Recipes**: Click "Generate Recipes" to get personalized suggestions
5. **Explore Recipes**: Browse through 3 AI-generated recipes with:
   - Complete ingredient lists
   - Step-by-step cooking instructions
   - Nutritional information per serving
   - Cooking time and servings

## 🔑 API Endpoints

### POST `/api/recipes/analyze`
Analyzes an uploaded image and identifies food items.

**Request**: multipart/form-data with image file
**Response**:
```json
{
  "success": true,
  "items": [
    {"name": "eggs", "quantity": "6"},
    {"name": "milk", "quantity": "1 carton"}
  ]
}
```

### POST `/api/recipes/generate`
Generates recipes based on ingredients.

**Request**:
```json
{
  "ingredients": [
    {"name": "eggs", "quantity": "6"},
    {"name": "milk", "quantity": "1 carton"}
  ]
}
```

**Response**:
```json
{
  "success": true,
  "recipes": [
    {
      "name": "Recipe Name",
      "description": "Brief description",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "instructions": ["Step 1", "Step 2"],
      "cookingTime": "30 minutes",
      "servings": 4,
      "nutrition": {
        "calories": 350,
        "protein": "25g",
        "carbs": "40g",
        "fat": "10g",
        "fiber": "5g"
      }
    }
  ]
}
```

## 📁 Project Structure

```
ClaudeHome/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── RecipeList.jsx
│   │   │   └── RecipeCard.jsx
│   │   ├── services/          # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx            # Main App component
│   │   ├── App.css            # Styles
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                     # Node.js backend
│   ├── routes/                # API routes
│   │   └── recipes.js
│   ├── services/              # Business logic
│   │   └── claudeService.js   # Claude AI integration
│   ├── server.js              # Express server
│   └── package.json
├── .env.example               # Environment variables template
├── .gitignore
└── README.md
```

## 🛠️ Development

### Build for Production

Frontend:
```bash
cd client
npm run build
```

This creates optimized production files in `client/dist/`

### Preview Production Build

```bash
cd client
npm run preview
```

## 🔧 Troubleshooting

### Issue: "Failed to analyze image"
- **Solution**: Check that your `ANTHROPIC_API_KEY` is correctly set in `.env`
- Ensure you have API credits available in your Anthropic account

### Issue: "CORS errors"
- **Solution**: Verify that `CLIENT_URL` in `.env` matches your frontend URL
- Make sure both servers are running

### Issue: "Cannot connect to server"
- **Solution**: Ensure the backend server is running on port 3001
- Check that no other application is using port 3001

### Issue: "Image upload fails"
- **Solution**: Check that the image is under 10MB
- Ensure the file is a valid image format (JPG, PNG, WEBP)

## 🌟 Features in Detail

### AI Vision Analysis
The app uses Claude's vision capabilities to:
- Identify individual food items
- Estimate quantities
- Recognize packaged goods
- Detect fresh produce

### Recipe Generation
Claude AI creates recipes that:
- Use only your available ingredients
- Include creative combinations
- Provide accurate cooking times
- Calculate nutritional information

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes
- Camera support on mobile devices

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 🙏 Acknowledgments

- Powered by [Claude AI](https://www.anthropic.com/) by Anthropic
- Built with [React](https://react.dev/)
- Bundled with [Vite](https://vitejs.dev/)

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ and AI
