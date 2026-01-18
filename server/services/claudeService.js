import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Analyze fridge image and identify food items
 */
export async function identifyFridgeItems(imageData) {
  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: imageData.mediaType,
                data: imageData.data,
              },
            },
            {
              type: 'text',
              text: `Analyze this image of a refrigerator and identify all food items you can see.

Return ONLY a JSON array of items, with each item having a name and estimated quantity.
Example format: [{"name": "eggs", "quantity": "6"}, {"name": "milk", "quantity": "1 carton"}]

Be specific and accurate. Only list items you can clearly identify.`
            }
          ],
        },
      ],
    });

    const responseText = message.content[0].text;

    // Extract JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse items from Claude response');
    }

    const items = JSON.parse(jsonMatch[0]);
    return items;
  } catch (error) {
    console.error('Error identifying fridge items:', error);
    throw error;
  }
}

/**
 * Generate recipes based on available ingredients
 */
export async function generateRecipes(ingredients) {
  try {
    const ingredientList = ingredients.map(i => `${i.quantity} ${i.name}`).join(', ');

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `I have the following ingredients in my fridge: ${ingredientList}

Generate 3 delicious recipes I can make using ONLY these ingredients (or a subset of them).
For each recipe, provide:
1. Recipe name
2. List of ingredients needed (from my fridge items)
3. Step-by-step cooking instructions
4. Estimated cooking time
5. Servings
6. Nutritional information per serving (calories, protein, carbs, fat, fiber)

Return the response as a JSON array with this exact structure:
[
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

Be creative and make the recipes practical and delicious!`
        },
      ],
    });

    const responseText = message.content[0].text;

    // Extract JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse recipes from Claude response');
    }

    const recipes = JSON.parse(jsonMatch[0]);
    return recipes;
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw error;
  }
}
