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

What is different is that [it is actually happening](https://github.com/ethereum/trin/pull/1319). Client teams have begun the actual implementations of support for Ethereum's state data. For the first time in the history of the Ethereum network, it will be possible to have direct low level access to this data. I believe this is going to be a catalyzing moment for Ethereum.

From the dawn of the Ethereum network, the state data has been locked away behind overhead of running a full node. In the earliest days of the network this was a trivial barrier to overcome. Syncing a new client with the network was fast and the hardware requiremenbts for running an ethereum node were small. In the intervening years both the sync times and hardware requirements have grown to the point where running a node *"casually"* has become prohibitively difficult. Ethereum full nodes take multiple CPU cores and GB of RAM and terabytes of fast disk and network bandwidth in order to run.

The Ethereum "state" is constantly changing, with modifications happening with every new block added to the chain.  The only way to get direct access to this data is to run a full node, which must first do the significant task of syncing up to the head of the chain in order to attain a full copy, and then it must execute every new block that is added to the chain in order to keep this local copy up to date.

![Welcome](../../public/images/2024-prague-welcome.jpeg)


