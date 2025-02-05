import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'
import {media, mediaAssetSource} from 'sanity-plugin-media'

export default defineConfig([
  {
    name: 'default',
    title: 'colin-mccaffrey-music',
    projectId: 'p3o500d1',
    dataset: 'product',
    basePath: '/product',
    // dataset: 'development',
    studioHost: 'colin-mccaffrey-music',

    plugins: [
      structureTool({
        structure,
        defaultDocumentNode,
      }),
      visionTool(),
      media({
        albumArt: {
          enabled: true,
          maximumUploadSize: 1000000,
        },
        creditLine: {
          enabled: true,
          excludeSources: ['unsplash'],
          maximumUploadSize: 10000000,
        },
      }),
    ],
    form: {
      file: {
        assetSources: previousAssetSources => {
          return previousAssetSources.filter(assetSource => assetSource !== mediaAssetSource)
        }
      }
    }, 
    schema: {
      types: schemaTypes,
    },
  },
  {
    name: 'staging',
    title: 'colin-mccaffrey-development',
    projectId: 'p3o500d1',
    dataset: 'development',
    basePath: '/development',
    studioHost: 'colin-mccaffrey-music',
    plugins: [
      structureTool({
        structure,
        defaultDocumentNode,
      }),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
    },
  },
])
