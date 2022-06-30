import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export interface Link {
  _id?: string
  title: string
  url: string
  createdAt?: Date
}

export const LinksCollection = new Mongo.Collection<Link>('links')

Meteor.methods({
  'links.insert': (link: Link) => LinksCollection.insertAsync({ ...link, createdAt: new Date() }),
  'links.update': (link: Link) => LinksCollection.updateAsync({ _id: link._id }, { $set: { ...link } }),
})

if (Meteor.isServer) {
  Meteor.publish('links.all', function publishReleases() {
    return LinksCollection.find({})
  })
}
