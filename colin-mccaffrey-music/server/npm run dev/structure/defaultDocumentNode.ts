import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  //this defines a constant 'defaultDocumentNode' that is a function (a DefaultDocumentNodeResolver) which takes params 'S' (structure builder) and 'schemaType' (type of doc being rendered). any time we are rendering a document, if the doctype matches a specific type, then customize the way it's shown. otherwise, show the default

  switch (schemaType) {
    case `artist`: //if it's an artist doc being shown..
      return S.document().views([
        // return a custom doc view for 'artist' type, allowing definition of specific views for it.
        S.view.form(), //show the editing form for 'artist'.
        S.view //and create a new view where the component matches relating docs that match the below GROQ query.
          .component(DocumentsPane)
          .options({
            query: `*[_type == "event" && references($id)]`, //GROQ query retrieves all 'event' docs that reference the current 'artist' doc, allowing users to see related events.
            params: {id: `_id`}, //sets params for the query where $id will be replaced with current artist doc's "_id", ensuring only relevant events are shown.
            options: {perspective: 'previewDrafts'}, //specifies options for 'DocumentsPane', indicating it should show a preview of draft docs (if applicable)
          })
          .title('Events'), //sets title of view to 'events' which will be displayed in Sanity UI
      ]) //closes array of views for 'artist' doc.
    case 'siteSettings':
      return S.document().views([])
    default:
      return S.document().views([S.view.form()]) //default case for switch statement (just the editing form) for any docs that don't match the 'artist' type.
  }
}
