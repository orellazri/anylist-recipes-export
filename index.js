const winston = require("winston");
const AnyList = require("anylist");
const fs = require("node:fs/promises");

const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console({ format: winston.format.simple() })],
});

if (!process.env.ANYLIST_EMAIL || !process.env.ANYLIST_PASSWORD) {
  logger.error("ANYLIST_EMAIL and ANYLIST_PASSWORD environment variables are required");
  process.exit(1);
}

const any = new AnyList({
  email: process.env.ANYLIST_EMAIL,
  password: process.env.ANYLIST_PASSWORD,
  credentialsFile: null,
});

const outputDir = process.env.OUTPUT_DIR || "output";

logger.info("Logging in");
any.login().then(async () => {
  try {
    await fs.access(outputDir);
  } catch {
    logger.info("Creating output directory");
    fs.mkdir(outputDir);
  }

  logger.info("Fetching recipes");
  const recipes = await any.getRecipes();
  for (const recipe of recipes) {
    logger.info(`Saving recipe: ${recipe.name}`);
    const name = recipe.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.rawIngredient);
    const preparationSteps = recipe.preparationSteps;

    await fs.writeFile(
      `${outputDir}/${name}.json`,
      JSON.stringify({ name: recipe.name, ingredients, preparationSteps }, null, 2)
    );
  }

  any.teardown();
  process.exit(0);
});
