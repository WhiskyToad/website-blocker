import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set your default base path for components
const BASE_PATH = path.resolve(__dirname, '../src/components');

const componentTemplate = (componentName) => 
`export interface ${componentName}Props {

}

const ${componentName} = ({}: ${componentName}Props) => {
  return (
    <div>${componentName}</div>
  );
};

export default ${componentName};
`;

const storyTemplate = (componentName) => 
`import { Meta, StoryObj } from '@storybook/react';
import ${componentName}, { type ${componentName}Props } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'components/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

const defaultProps: ${componentName}Props = {

};

export const Default: Story = {
  args: defaultProps,
};
`;

// Get the component path from command line arguments
const [, , inputPath] = process.argv;

if (!inputPath) {
  console.error('Error: Please provide a component path (e.g., npm run new-story Header/Button).');
  process.exit(1);
}

const componentPath = path.join(BASE_PATH, inputPath);
const componentName = path.basename(componentPath);

// Create the folder structure if it doesn't exist
fs.mkdirSync(componentPath, { recursive: true });

// Create the component file
const componentFilePath = path.join(componentPath, `${componentName}.tsx`);
if (!fs.existsSync(componentFilePath)) {
  fs.writeFileSync(componentFilePath, componentTemplate(componentName));
  console.log(`Created: ${componentFilePath}`);
} else {
  console.log(`Skipped: ${componentFilePath} (already exists)`);
}

// Create the story file
const storyFilePath = path.join(componentPath, `${componentName}.stories.tsx`);
if (!fs.existsSync(storyFilePath)) {
  fs.writeFileSync(storyFilePath, storyTemplate(componentName));
  console.log(`Created: ${storyFilePath}`);
} else {
  console.log(`Skipped: ${storyFilePath} (already exists)`);
}
