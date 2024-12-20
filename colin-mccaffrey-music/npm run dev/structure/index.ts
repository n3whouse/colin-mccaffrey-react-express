import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, AddDocumentIcon, UsersIcon, PinIcon} from '@sanity/icons'
import {showType} from '../schemaTypes/showType'
import {artistType} from '../schemaTypes/artistType'
import {venueType} from '../schemaTypes/venueType'
import {siteSettings} from '../schemaTypes/siteSettings'
import {releaseType} from '../schemaTypes/releaseType'
import {engineerType} from '../schemaTypes/engineerType'
import {performerType} from '../schemaTypes/performerType'
import {songwriterType} from '../schemaTypes/songwriterType'
import {UploadIcon} from '@sanity/icons'
import {audioFile} from '../schemaTypes/audioFile'
import {testReleaseType} from '../schemaTypes/_tests_/releaseType.test'

export const schemaTypes = [
  artistType,
  showType,
  venueType,
  siteSettings,
  releaseType,
  engineerType,
  performerType,
  songwriterType,
  audioFile,
  testReleaseType,
]

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
        .title('Producer')
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
      S.divider(),
      S.listItem()
        .title('Audio Files')
        .icon(UploadIcon)
        .child(S.document().schemaType('audioFile')),
      S.divider(),
      S.listItem()
        .title('TEST Releases')
        .icon()
        .child(S.document().schemaType('testRelease').documentId('testRelease')),
    ])
}
