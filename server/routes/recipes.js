import express from 'express';
import { upload } from '../server.js';
import { identifyFridgeItems, generateRecipes } from '../services/claudeService.js';

const router = express.Router();

/**
 * POST /api/recipes/analyze
 * Analyze fridge image and return identified items
 */
router.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageData = {
      mediaType: req.file.mimetype,
      data: req.file.buffer.toString('base64'),
    };

    const items = await identifyFridgeItems(imageData);

    res.json({
      success: true,
      items
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({
      error: 'Failed to analyze image',
      message: error.message
    });
  }
});

/**
 * POST /api/recipes/generate
 * Generate recipes based on ingredients
 */
router.post('/generate', async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients array is required' });
    }

    const recipes = await generateRecipes(ingredients);

    res.json({
      success: true,
      recipes
    });
  } catch (error) {
    console.error('Error generating recipes:', error);
    res.status(500).json({
      error: 'Failed to generate recipes',
      message: error.message
    });
  }
});

export default router;
