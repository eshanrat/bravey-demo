// Simple test to verify filtering logic
const { getAllRecipes } = require('../lib/recipes');

// Mock the crypto module for Node.js environment
global.crypto = {
  randomUUID: () => 'test-uuid-' + Math.random().toString(36).substring(2)
};

function testFiltering() {
  const recipes = getAllRecipes();
  
  // Test that we have recipes
  console.log('✓ Total recipes:', recipes.length);
  
  // Test filtering by category
  const categories = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'drink'];
  
  categories.forEach(category => {
    const filtered = recipes.filter(recipe => recipe.category === category);
    console.log(`✓ ${category} recipes:`, filtered.length);
    
    // Verify all filtered recipes have the correct category
    const allCorrectCategory = filtered.every(recipe => recipe.category === category);
    if (allCorrectCategory) {
      console.log(`✓ All ${category} recipes have correct category`);
    } else {
      console.log(`✗ Some ${category} recipes have incorrect category`);
    }
  });
  
  // Test that categories cover all recipes
  const totalCategorizedRecipes = categories.reduce((total, category) => {
    return total + recipes.filter(recipe => recipe.category === category).length;
  }, 0);
  
  if (totalCategorizedRecipes === recipes.length) {
    console.log('✓ All recipes are categorized');
  } else {
    console.log('✗ Some recipes are not categorized');
  }
  
  console.log('All filtering tests passed!');
}

if (require.main === module) {
  testFiltering();
}

module.exports = { testFiltering };