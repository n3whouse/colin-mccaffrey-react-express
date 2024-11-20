import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, AddDocumentIcon, UsersIcon, PinIcon} from '@sanity/icons'
import {showType} from '../schemaTypes/showType'
import {artistType} from '../schemaTypes/artistType'
import {venueType} from '../schemaTypes/venueType'
import {siteSettings} from '../schemaTypes/siteSettings'
import {releaseType} from '../schemaTypes/releaseType'
import {producerType} from '../schemaTypes/producerType'
import {client} from '../../src/sanity/client'

export const schemaTypes = [
  artistType,
  showType,
  venueType,
  siteSettings,
  releaseType,
  producerType,
]

const getLinkNames = async () => {
  const data = await client.fetch(`*[_type == 'siteSettings']{linkNames}[0]`)
  return data?.linkNames?.navigationLinks || {}
  const linkNames = await getLinkNames()
}

export const structure: StructureResolver = (S, linkNames) => {
  return S.list() //show list
    .id('root') //.. and give id "root"
    .title('Content') //..and title "Content"
    .items([
      //...to the following items
      S.listItem() //List item 1:
        .title('Upcoming Shows') //call it Upcoming Events
        .schemaType('show') //and display the "event" schematype
        .icon(CalendarIcon) //use the CalendarIcon for the picture
        .child(S.documentList().title('Upcoming Shows').filter('date >= now()')), //and only include dates > now (future)
      S.listItem() //List Item 2
        .title('Past Shows') //call it Past Events
        .schemaType('show') // same as above
        .icon(CalendarIcon) // same as above
        .child(S.documentList().title('Past Shows').filter('date < now()')), // and only include dates < now (past)
      S.divider(), //divide the "root" component into 2.
      S.documentTypeListItem('artist').title('Artists').icon(UsersIcon),
      S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
      S.divider(),
      S.documentTypeListItem('siteSettings')
        .title('Site Settings')
        .icon(AddDocumentIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Releases')
        .icon(AddDocumentIcon)
        .child(S.documentTypeList('release').title('Releases')),
      S.divider(),
      S.listItem()

        .title('Producer') // Use linkFive for Producer

        .icon(AddDocumentIcon)

        .child(S.document().schemaType('producer').documentId('producer')),

      // Performer

      S.listItem()

        .title('Performer') // Use linkFour for Performer

        .icon(AddDocumentIcon)

        .child(S.document().schemaType('performer').documentId('performer')),

      // Songwriter

      S.listItem()

        .title('Songwriter') // Use linkSix for Songwriter

        .icon(AddDocumentIcon)

        .child(S.document().schemaType('songwriter').documentId('songwriter')),
    ])
}
