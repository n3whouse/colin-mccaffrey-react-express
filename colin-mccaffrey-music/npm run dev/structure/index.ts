import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, AddDocumentIcon, UsersIcon, PinIcon} from '@sanity/icons'
import {showType} from '../schemaTypes/showType'
import {artistType} from '../schemaTypes/artistType'
import {venueType} from '../schemaTypes/venueType'
import {siteSettings} from '../schemaTypes/siteSettings'
import {releaseType} from '../schemaTypes/releaseType'
<<<<<<< HEAD
import {producerType} from '../schemaTypes/producerType'
import {client} from '../../src/sanity/client'
=======
import {engineerType} from '../schemaTypes/engineerType'
import {performerType} from '../schemaTypes/performerType'
import {songwriterType} from '../schemaTypes/songwriterType'
>>>>>>> 14236bab68ee23a52e33e463aea92fde5972ae71

export const schemaTypes = [
  artistType,
  showType,
  venueType,
  siteSettings,
  releaseType,
  engineerType,
  performerType,
  songwriterType,
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
      S.listItem()
        .title('Upcoming Shows')
        .schemaType('show')
        .icon(CalendarIcon)
        .child(S.documentList().title('Upcoming Shows').filter('date >= now()')),
      S.listItem()
        .title('Past Shows')
        .schemaType('show')
        .icon(CalendarIcon)
        .child(S.documentList().title('Past Shows').filter('date < now()')),
      S.divider(),
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
<<<<<<< HEAD

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
=======
        .title('Engineer')
        .icon(AddDocumentIcon)
        .child(S.document().schemaType('engineer').documentId('engineer')),
      S.listItem()
        .title('Performer')
        .icon(AddDocumentIcon)
        .child(S.document().schemaType('performer').documentId('performer')),
      S.listItem()
        .title('Songwriter')
        .icon(AddDocumentIcon)
        .child(S.document().schemaType('songwriter').documentId('songwriter')),
    ])
>>>>>>> 14236bab68ee23a52e33e463aea92fde5972ae71
