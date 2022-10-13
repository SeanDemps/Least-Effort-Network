Initially built on [glitch.com](https://glitch.com/): viewable at [least-effort-network.glitch.me](https://least-effort-network.glitch.me/)

A silly response to [Olia Lialina's "Best Effort Network"](https://rhizome.org/frontpage-exhibition/olia-lialina-best-effort-network/), a magnificent work of net.art in which an animation of Olia spinning on a roundabout plays indefinitely, so long as you are the most recent viewer of the webpage. Once someone else connects, Olia disappears and you have to wait for the other users to disconnect in order to see Olia reappear.

This version which I have lazily dubbed "least effort network" plays a gif so long as the number of connected users are higher than any number of users connected before. (ie. If the most traffic the webisite has ever received it 5 concurrent viewers, it will require at least 6 concurrent users before the gif is visible to everyone)

The webpage uses websockets in order to ensure that the users are still connected, and uses a cache buster in order to prevent users from seeing the image from cache.
