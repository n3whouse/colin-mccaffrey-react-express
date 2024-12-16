const sanityClient = require('../src/sanity/client')

const client = sanityClient({
  projectId: 'p3o500d1', // replace with your project ID
  dataset: 'product', // replace with your dataset name
  useCdn: false, // `false` if you want to ensure fresh data
})

async function deleteDocuments() {
  const query = '*[_type == "event"]{_id}'
  const documents = await client.fetch(query)

  const deletePromises = documents.map((doc) => client.delete(doc._id))

  try {
    await Promise.all(deletePromises)
    console.log('Documents deleted successfully')
  } catch (error) {
    console.error('Error deleting documents:', error)
  }
}

deleteDocuments()
