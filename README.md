# PlayVi

[__Try PlayVi !__](https://playvi.app) 🎉 (Looks better on mobile)

__PlayVi__ is a web application built on top of Spotify API in order to simplify the process of creating a public playlist and collaborating on it with minimum hassle.

Anyone with a party pin including those who doesn't have a Spotify account can contribute to a playlist created through __PlayVi__. And, you don't need to authenticate with your Spotify credentials to start a party. However, a Spotify account is required to play the playlist eventually.

It is built to look and work better on mobile devices, but you can use it with a browser virtually on any device.

<br/>

<img width="250" alt="PlayVi main screen" src="https://user-images.githubusercontent.com/22943912/72381887-7468f600-3718-11ea-8ff1-6ef1aebadbb0.png">

## __Basic usage__

1) Start a party.
2) Share the party pin & app link with people before the actual party.
3) Wait for people to add songs.
4) When the party day comes, click the playlist name to open & play it in Spotify.

> Note: Shuffling the playlist makes the flow more natural since people are likely to add songs successively.

## __Starting a Party__

Once you start a party, a public Spotify playlist is automatically generated for you along with a four-digit pin code to share with your friends so that they can join and contribute to the playlist.

_When you start a party, you become the party admin and you have the privilige of being able to remove any song from the playlist._

In the example screen below, a Spotify playlist named `cyanDaisy` is created along with the party pin of `6971`.

As an alternative to sharing party pin and the app link separately, you can use the query string of `?pin=` with your party pin. When you do so, it redirects to correct route and fills in the party pin automatically.

`playvi.app/?pin=6971`

<br/>

<img width="250" alt="PlayVi party screen" src="https://user-images.githubusercontent.com/22943912/62656582-ce44e300-b964-11e9-9fb5-a63fed891b2f.png">

## __Joining to a party__

Hit `Join to a party` button and then use the party pin along with a nickname you desire and then you have access to the party as a contributer.

_You can add songs and only remove the songs you have added._

## __Some details__

When you search for a song under the `Add Songs` tab, you get the top 20 results.

The small green play icon next to song title indicates that the song has a preview. You can tap/click the album cover and listen to it. Tapping/clicking the song name adds it to the playlist.

If a song is already in the playlist, it gets greyed out and cannot be added again.

Link to playlist and party pin can always be accessed through more options icon [...] on the top right corner.

<br/>



<img width="250" alt="PlayVi main screen" src="https://user-images.githubusercontent.com/22943912/63462764-ee43ce80-c45b-11e9-8256-b598f5d36aea.png">  |  <img width="250" alt="PlayVi main screen" src="https://user-images.githubusercontent.com/22943912/63462766-ee43ce80-c45b-11e9-9a25-e424d7a7c18c.png">
:-------------------------:|:-------------------------:

## __Server__

Refer to [this repository](https://github.com/merterpam/PlayVi/) for the source code of the server.
