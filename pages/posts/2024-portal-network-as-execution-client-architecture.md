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

### Syncing the Block Bodies and Receipts

After obtaining a header, the client will then have the necessary information to fetch the block body and the receipt for that block.  That necessary information is the `header.transactions_root`, `header.ommers_root` and `headers.receipts_root` which are necessary for cryptographic validation that the data sent is indeed the data for that block.  This leads us to our next set of client requirements.

- The ability to fetch block bodies by the block hash
- The ability to fetch block receipts by the block hash

### Syncing the State

After obtaining the full header chain and the block bodies for every block, a
client can then begin working on obtaining a copy of the state.  This can be
done by re-executing every block since genesis to recompute the full data set
locally, or by fetching a snapshot of the state from another client.  Most
clients choose to do the snapshot approach because it is significantly faster.

Historically, clients used a method of syncing the state called "fast sync",
which despite it's name, is not very fast.  This method involves starting at
the state root of the HEAD block and walking the full trie, individually
fetching every single node in the trie.  This approach has been superceded by
"snap sync" which instead involves fetching a full snapshot of only the "leaf"
data from the trie.  Once a full copy of the state has been obtained, clients
can then keep their state database up-to-date by executing every new block
added to the chain and recording the changes to the state database that result
from block execution.

This leads us to the last set of client requiremments for syncing.

- For "fast sync":
  - The ability to fetch trie nodes by their node hash
- For "snap sync":
  - The ability to fetch account and contract storage leaf data at a specific block height across a specific key range in the trie.
- For Both:
  - The ability to fetch contract bytecode by its code hash.

### Staying Synced

In order for a client to stay synced, they need to be made aware of new blocks
as they are added to the chain.  New blocks are then executed locally to arrive
at the new HEAD block.  This leads us to the main client requirement for
staying online.

- Access to new block headers and bodies as they are added to the chain.

### Sending Transactions

In order for a client to send transactions, it must be a participant of the
transaction pool.  Participation in the transaction pool involves participation
in transaction gossip, which requires the ability to validate transactions.
Validation of a transaction requires an up-to-date copy of the Ethereum state
data.  This leads us to the following client requiremments.

- Ability to lookup `account.nonce` and `account.balance` values for all transactions in the transaction mempool.

## DevP2P Requirements

Putting all of this together gives us a full picture of the requirements that
the DevP2P network imposes on clients.

- A full copy of the block header chain
- A full copy of the block bodies and receipts
- A full and up-to-date copy of the state

Additionally, it imposes the following additional *implicite* requirements.

- A full index mapping block numbers to their canonical block hash
- A state database that is suitable for serving the SNAP sync protocol

There are also additional implicit bandwidth requirements such as:

- Ability to continually receive the full mempool of pending transactions
- Serving other clients that choose to peer with you as a source of data for syncing.

As well as these implicit CPU and RAM requirements

- The ability to execute blocks in the EVM to keep your state database up-to-date
- Adequate RAM for caching to keep EVM execution fast.

And because the EVM tends to be limited by disk speed:

- A hard drive fast enough for state retrieval during EVM execution.

These are the invariants that DevP2P imposes on execution clients and thus the
reasons why execution clients for Ethereum are all very heavy pieces of
software.

## Portal Network
