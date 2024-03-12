---
title: Why Portal Needs To Be Its Own Network
date: 2024/03/12
description: Explaining why the Portal Network needed to build its own network rather than leverage an existing distributed storage engine like Filecoin or Swarm.
tag: project, Ethereum, p2p, storage
author: Piper Merriam
---

We commonly get asked why we don't use one of the various general purpose
distributed storage networks (like Filecoin/IPFS).  Baked into this question is
an assumption that general purpose storage networks would solve the problem
that Portal is aiming to solve.

## Problem 1: Content Addressing

One issue that arises with general purpose storage networks is around content
addressing.  We are not able to use just any arbitrary content addressing
scheme.  Portal Network requires that all data be verifiable as canonical chain
data.  The way Ethereum data is verified is baked into the Ethereum protocol.
A simple example of this is verification of a block header.  This involves
taking the `keccak` hash of the RLP encoded block header.  A more complex
example of this is anchoring state data using a Hexary Merkle Patricia Trie
proof to the `Header.state_root`.

Each piece of Ethereum's data has some form of anchoring proof which guarantees
it is canonical chain data.  These anchoring proofs ensure that *extra* data
cannot be added to the Portal Network, and thus, ensure that the network cannot
be abused or spammed with superfluous data.

In order for a general purpose storage network to work for Ethereum's data, it
would require it's content addressing scheme to support every method of
cryptographic anchoring used for Ethereum data.  For most networks this isn't
possible.

## Problem 2: Competition for Storage

Another property of storage networks is whether they are incentivised. Networks
like Filecoin require payment for durable storage. Networks like bittorrent's
DHT do not have any incentives and simply house the most recent and most
popular data.

In the Portal Network model, we aim to provide free access to the data, and
thus, networks that require payment are not suitable for our use case.
However, using a general purpose storage network that lacks incentives would
mean that all of the Ethereum data would be competing for storage space with
all of the *other* data stored in the network.  And at the level of the clients
for the protocol, this would mean that individual users would likely be storing
some mixture of Ethereum data and *other* data.

In order for Portal Network to be useful, it must provide reliable access to
the data it's users want.  Since the Ethereum data is all canonically anchored,
that means at any given time there is a finite quantity of data that needs to
be stored, and thus there is a finite amount of capacity that must be sourced
from the network to store it.

In a general purpose network, increased usage by other applications storing
other types of non-Ethereum data would result in more contention and possibly
the eviction of Ethereum specific data.  Thus, using a general purpose storage
network would reduce our ability to provide strong guarantees that Ethereum's
data can be reliably retrieved from the network.

## Problem 3: Resource Constrained Devices

The Portal Network aims to be acccessible for resource constrained devices.
This means that participation in our protocol must be sufficiently simple that
low resource devices are able to participate and contribute to the protocol in
a meaningful way.  In the general case, we lose these controls by using a
general purpose protocol.

Protocols like IPFS/Filecoin are built on top of LibP2P, which is based on long
lived connections between nodes.  This ends up discriminating against nodes
that are not able to reliably stay online and maintain these long lived
connections.

Even in the case where a general purpose storage network was friendly towards a
low resource device, it is unclear how such a network would allow that device
to contribute back to the Portal Network in a meaningful way.  Such a node's
contribution to the network would naturally be split between all of the data
stored on the network.  We want our users to know that their contribution is
going directly towards supporting Ethereum's data.


## Problem 4: Freedom of movement

The current designs for Portal Network range from quite simple to mildly
complex.

The History network is quite simple.  It works out to a key/value store with
reasonably simple validation logic for ensuring data is canonical.

The Beacon network is more complex.  It implements more complex validation
logic and more complex data types from the Beacon chain light client protocol.
Additionally, it requires some out-of-band information to be able to properly
anchor to the canonical chain.

The State nettwork is also quite complex.  It implements complex data types and
validation logic for handling and distributing state data. It implements a
model where the payloads for data being Gossip'd are different from the
payloads for when data is being retrieved.  The network requires complex logic
for how data is gossip'd into the network.

Each of these networks required implementing complex validation logic in the
clients that would not be feasible in most general purpose storage networks.
Going forward, we only expect these requirements to increase.  As our network
grows, so will our requirements for client behavior.  Because of this, we need
direct control over the low levels of the protocol and the clients to that
protocol, making general purpose networks not suitable for our use case.


## Conclusion

Hopefully this sheds some light on why the Portal Network has chosen to build
it's own storage network. General purpose storage networks are an exciting and
new space.  Projects like [IPLD](https://ipld.io/) are promising in solving
some of these problems.  There is so much room for innovation in this area.
