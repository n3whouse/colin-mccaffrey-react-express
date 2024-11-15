import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => { //any time we are rendering a document, if the doctype matches a specific type, then customie the way it's shown. otherwise, show the default
  switch (schemaType) {
    case `artist`: //if it's an artist doc being shown..
      return S.document().views([
        S.view.form(), //show the editing form
        S.view //and also show a view, and also show a view where the component matches reveals docs that match the below GROQ query.
          .component(DocumentsPane)
          .options({
            query: `*[_type == "event" && references($id)]`, //show all events that reference this artist
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'}
          })
          .title('Events'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}