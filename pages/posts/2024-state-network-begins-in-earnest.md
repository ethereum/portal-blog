---
title: The State Network Begins
date: 2024/06/18
description: Work towards bringing the state network into production begins in earnest
tag: project, state-network
author: Piper Merriam
---

Predicting software timelines is hard. I've been incorrectly predicting the
timeline for Portal to be fully production ready for three whole years now.
Why should this time be any different?

What is different is that [it is actually happening](https://github.com/ethereum/trin/pull/1319). Client teams have begun the implementations of support for Ethereum's state data. For the first time in the history of the Ethereum network, it will be possible to have direct low level access to this data. I believe this is going to be a catalyzing moment for Ethereum.

From the dawn of the Ethereum network, this state data has been locked away behind overhead of running a full node. In the earliest days of the network this was a trivial barrier to overcome. Syncing a new client with the network was fast and the hardware requiremenbts for running an ethereum node were small. In the intervening years both the sync times and hardware requirements have grown to the point where running a node *"casually"* has become prohibitively difficult. Ethereum full nodes take multiple CPU cores, multiple GB of RAM, over a terabyte of fast disk and terabytes of network bandwidth in order to run.

The problem is made worse by the fact that the Ethereum "state" is constantly changing, with modifications happening with every new block added to the chain. Historically, the only way to get direct access to this data has been to run a full node, which must first do the significant task of syncing up to the head of the chain in order to attain a full and up-to-date copy of the state data. After "catching up" full nodes must then continue to execute every new block that is added to the chain in order to keep up with the changes that occur at every block.

Ethereum's state data is the lifeblood of users interacting with the protocol. Nearly every transaction that is sent on Ethereum requires reading data out of the state, which can be as simple as looking up the correct `nonce` value, or as complex as estimating the gas for a complex smart contract interaction. Portal provides a fundamentally different model for storage and retrieval of this data. Instead of relying on full nodes to store and maintain full copies of this data, Portal instead only relies on a small number of full nodes to push the state data into the Portal network where it is distributed and stored in a cooperative manner by all nodes in the network. By spreading the cost of storage across a large number of nodes, each individual node in the network can have a small amount of responsibility while still allowing the network as a whole to provide archive node level functionality for storage and retrieval of Ethereum's state.

### Portal & Stateless

One of the big roadmap items on Ethereum's roadmap is Verkle, which inturn is signpost on the road to stateless clients. In the post-Verkle world we expect Ethereum clients to begin development towards operating as "stateless" clients. These clients will not store much or any state data locally, and instead will receive proofs from the network that allow them to do full block execution even in the absence of a local copy of the state data. Thus, the term "stateless" is meant to signify that these clients will still perform full verification of block execution, but will be able to do so without storing or maintaining a local state database.

The capability for clients to be "stateless" is powerful for the Ethereum protocol, as it enables verification of block execution at a much lower cost. However, these super powers come with a cost. Ethereum clients require state data for a few key pieces of functionality. The two major ones that come to mind are the JSON-RPC API and the transaction mempool. The transaction mempool requires access to the state in order to validate transactions and prevent denial of service attacks. The JSON-RPC API requires state data to serve some of the most used endpoints like `eth_estimateGas`. These pieces of client functionality currently require access to the state in order to work and it is unclear how clients will support them in a stateless context where they will no longer have access.

In the post-verkle and stateless world, clients that wish to preserve these areas of functionality will require different and new solutions. Portal network is likely to be a key component in achieving this. The state network's ability to provide granular access to the latest Ethereum state is key building block for allowing stateless clients to still be capable of things like estimation of gas for construction of new transactions or looking up account balances or nonces for validation of transactions in the mempool.

## The Core of Portal

At the core of Portal is this key concept. We want to break the full node paradigm. The paradigm thus far has dictated that in order to participate in the Ethereum protocol you **must** be able to shoulder the significant load of being a full node. Those that are unable to do so are not welcome and must get their data elsewhere. Portal is a paradigm changing technology as it lowers the barrier to entry and allows for participation and contribution to the protocol at significantly lower cost. The benefits of this new approach to Ethereum's peer-to-peer infrastructure will be far reaching. In the application realm and userland, we expect to see wallets that don't depend on centralized infrastructure. At the core of the protocol we expect to see new types of Ethereum clients with drastically reduced resource requirements while still delivering the full set of functionality.

The Portal network is entering into production and it is happening rapidly. By the end of 2024 we expect to have the three core pillars of our production network fully deployed and live. It has taken significant work to get to where we are today and this is only the beginning.
