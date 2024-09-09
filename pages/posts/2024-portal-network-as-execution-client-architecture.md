---
title: Portal Network as Execution Client Architecture
date: 2024/09/09
description: The Portal Network is an alternative and more powerful foundation for ethereum execution client architecture.
tag: project
author: Piper Merriam
---

For most of the history of this project the Portal network has been pitched as
a solution for light clients.  Lightweight access to the Ethereum protocol has
been core to our mission since the beginning, however, lately we are finding
that this narrative fails to effectively capture the power of the Portal
network and the problems it can solve.

The Portal network is a new foundation for Ethereum execution client
architecture that fundamentally fixes many inherent limitations imposed by the
original DevP2P based architecture. The goal of this blog post will be to
explore what those limitations are, how the Portal network solves them, and
what the resulting execution client looks like when built off of this new
architecture.

## Execution Client Requirements

### Syncing the Header Chain

An execution client must start by syncing the history of the chain.  This
syncing process starts by the client filling out the header chain.  At present
clients will mostly be syncing this all the way back to genesis and with future
adoption of EIP-4444 clients may switch to syncing only the most recent blocks
from history.  In either of these models, a client needs to know what the
latest or HEAD block is and then will use that to work backwards to the genesis
block of the chain.  The academic or naive model of this involves following the
`header.parent_hash` backwards through all 20 million blocks, however, in
practice this is too slow. Clients instead fetch ranges of blocks from other
clients requesting them by block number.  In order for clients to serve this
data they must have an index that allows them to lookup blocks by their number.
This leads us to our first set of client requirements.

- The ability to fetch blocks by their hash
- The ability to fetch blocks by their block number
- The ability to fetch ranges of blocks

