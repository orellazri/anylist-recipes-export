# AnyList Recipes Export

This program exports your recipes from AnyList to json files.

Output format:

```json
{
  "name": "Recipe Name",
  "ingredients": ["3 eggs"],
  "preparationSteps": ["Crack the eggs"]
}
```

## Usage

### Docker (Recommended)

```bash
docker run --rm -e "ANYLIST_EMAIL=<email>" -e "ANYLIST_PASSWORD=<password>" -v ./output:/app/output reaperberri/anylist-recipes-export
```

### Locally

```bash
pnpm install
export ANYLIST_EMAIL=<email>
export ANYLIST_PASSWORD=<password>
pnpm start
```

## Environment Variables

- `ANYLIST_EMAIL`: Your AnyList email
- `ANYLIST_PASSWORD`: Your AnyList password
- `OUTPUT_DIR`: **(Optional)** The directory to save the exported json files (default: `./output`)

## Credits

- https://github.com/codetheweb/anylist
