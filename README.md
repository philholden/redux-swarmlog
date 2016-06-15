# Redux Swarmlog

[![travis build](https://img.shields.io/travis/philholden/redux-swarmlog.svg?style=flat-square)](https://travis-ci.org/philholden/redux-swarmlog) [![version](https://img.shields.io/npm/v/@philholden/redux-swarmlog.svg?style=flat-square)](http://npm.im/@philholden/redux-swarmlog)

[![Video](http://img.youtube.com/vi/M99djS07Ph8/0.jpg)](http://www.youtube.com/watch?v=M99djS07Ph8)

_(Click image to watch React Europe lightning video)_

<a href="https://egghead.io/lessons/react-redux-peer-to-peer-todomvc-over-webrtc-using-swarmlog" target="_blank">![ScreenShot](https://raw.github.com/philholden/todomvc-redux-swarmlog/master/redux-swarmlog-egghead.png)</a>

_(Click image to watch Egghead.io intro video)_

A super simple way of writing distributed Redux applications. The [Redux](https://github.com/reactjs/redux) action log is persisted in an IndexDB and synced with other peers via a [WebRTC Swarm](https://github.com/mafintosh/webrtc-swarm) using [Swarmlog](https://github.com/substack/swarmlog).

When an application reloads the Redux store is initialsed by reducing all the persisted actions in the IndexDB and syncing any new actions from remote peers. Watch the Egghead video above to find out more.

## Pros

* offline data by default
* super simple mental model for writing distributed apps
* UIs update automatically as remote actions come in 
* works offline by default
* scales globally for free with no bandwidth or storage costs for the developer
* the developer is not responsible for client data
* friends not corporations hold user data 
* public / private key authentication is lighter weight than user accounts
* time travel 

## Cons

  * Action logs use more bandwidth than raw data so initial sync could be slow for a very long log.
  
  __workaround:__ Break down long logs into lots of smaller logs e.g. log per month, week or day. Only fetch the most recent log if its all thats needed
  
  * Extra storage space needed on client
  
  __workaround:__ The price of SSDs is falling very rapidly. Stop thinking about cloud and thin client, but cache encrypted data where it is needed. This gives privacy, enables working offline, provides backups and can act as a CDN. Once you start using a distributed system like Git you soon stop thinking about the extra space it requires. 

  * Permanence: even if an action deletes an item it can still be retrieved from the log.
  
 __workaround:__ Use a log for versioning other logs. Every so often the main log is reduced and a single action is written to a new log which creates the store in the current state. The old log is marked as stale in the version log and its database is deleted (purging old actions).
 
  * Can't get most up to date data if the peer holding it is offline

  __workaround:__ A small device like a Raspberry PI kept online should be all that is needed to make sure there is always at least one up to date source of truth. With 5G and IoT we are heading towards an era of always online small connected devices. Let's start thinking that way now.

## Play to Strengths

Redux Swarmlog works well for apps that support some kind of physical live event. Because you know the action log will be short and the users will be online at the same time. Examples might be providing subtitles via mobile phone for a theatre show or letting a teacher see in realtime how each individuals in a class is answering a question. 
