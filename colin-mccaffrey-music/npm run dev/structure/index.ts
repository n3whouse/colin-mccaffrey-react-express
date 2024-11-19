import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, AddDocumentIcon, UsersIcon, PinIcon} from '@sanity/icons'
import {eventType} from '../schemaTypes/eventType'
import {artistType} from '../schemaTypes/artistType'
import {venueType} from '../schemaTypes/venueType'
import {siteSettings} from '../schemaTypes/siteSettings'
import {releaseType} from '../schemaTypes/releaseType'
import {engineerType} from '../schemaTypes/engineerType'

export const schemaTypes = [
  artistType,
  eventType,
  venueType,
  siteSettings,
  releaseType,
  engineerType,
]

export const structure: StructureResolver = (
  S, //defines a constant 'structure' that is a function (a StructureResolver) which takes a param 'S' (the structure builder) to create the content structure.
) =>
  S.list() //show list
    .id('root') //.. and give id "root"
    .title('Content') //..and title "Content"
    .items([
      //...to the following items
      S.listItem() //List item 1:
        .title('Upcoming Events') //call it Upcoming Events
        .schemaType('event') //and display the "event" schematype
        .icon(CalendarIcon) //use the CalendarIcon for the picture
        .child(S.documentList().title('Upcoming Events').filter('date >= now()')), //and only include dates > now (future)
      S.listItem() //List Item 2
        .title('Past Events') //call it Past Events
        .schemaType('event') // same as above
        .icon(CalendarIcon) // same as above
        .child(S.documentList().title('Past Events').filter('date < now()')), // and only include dates < now (past)
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
        .title('Engineer')
        .icon(AddDocumentIcon)
        .child(S.document().schemaType('engineer').documentId('engineer')),
    ]) //... and put artists and venues on the other side of the divider with the UsersIcon and PinIcon representing them graphically, respectively
