import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  //this defines a constant 'defaultDocumentNode' that is a function (a DefaultDocumentNodeResolver) which takes params 'S' (structure builder) and 'schemaType' (type of doc being rendered). any time we are rendering a document, if the doctype matches a specific type, then customize the way it's shown. otherwise, show the default

  switch (schemaType) {
    case `artist`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "event" && references($id)]`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'},
          })
          .title('Events'),
      ])
    case 'siteSettings':
      return S.document().views([])
    case 'release':
      return S.document().views([])
    default:
      return S.document().views([S.view.form()])
  }
}
