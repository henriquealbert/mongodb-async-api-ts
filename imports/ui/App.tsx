import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { LinksCollection, Link } from '../api/links'
import { Meteor } from 'meteor/meteor'

export const App = () => {
  const links = useTracker(() => {
    Meteor.subscribe('links.all')
    return LinksCollection.find().fetch()
  })

  const addLink = () => {
    Meteor.call(
      'links.insert',
      {
        title: `Link-${Math.random()}`,
        url: 'https://google.com',
      } as Link,
      (err: any, res: any) => {
        console.log({ err, res }) // {err: undefined, res: '6Cna9RirdnGJrHbkB'}
      },
    )
  }

  const updateLink = (link: Link) => {
    Meteor.call(
      'links.update',
      {
        _id: link._id,
        title: `Update-${link.title}-${Math.random()}`,
      } as Link,
      (err: any, res: any) => {
        console.log({ err, res }) // {err: undefined, res: 1}
      },
    )
  }

  const makeLink = (link: Link) => {
    return (
      <li key={link._id} style={{ marginBottom: 8 }}>
        <span style={{ marginRight: 16 }}>{link.title}</span>
        <button onClick={() => updateLink(link)}>Update link</button>
      </li>
    )
  }

  return (
    <div>
      <h1>MongoDB Async API + TypeScript</h1>
      <button onClick={addLink}>Add Link</button>
      <ul>{links.map(makeLink)}</ul>
    </div>
  )
}
