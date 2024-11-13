import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'colin-mccaffrey-music',

  projectId: 'p3o500d1',
  dataset: 'product',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
