---
title: Portal Network 2024 roadmap
date: 2024/2/1
description: What does 2024 have in store for Portal Network?
tag: project
author: jmc
---

# Portal Network Roadmap Draft 2024

This document aims to outline the 2024 core team & product roadmap for Portal Network.


## Team description

The Portal Network core team is a small (<15 person) collaborative effort focused on bulding a decentralized peer-to-peer network for storing and serving data from the execution and consensus layers of the Ethereum protocol. The Portal project is composed of three independent client teams each implementing the Portal Network specification in different languages: Trin (Rust), Ultralight (Typescript) and Fluffy (Nim), plus cross-client efforts to build out tooling and testing infrastructure. 

Our sustained focus is on shipping the minimum network functionality necessary to serve all of the Execution layer data.  This includes the three client implementations which each support the three sub-protocols that house and serve this data, tooling such as our network health monitor ([GladOS](https://github.com/ethereum/glados)), interoperability testing via Hive, and the "bridge" node functionality which is responsible for pushing data into the Portal Network.

Additionally, we allocate a significant portion of our time to support the practical adoption of this technology by client and app teams around the world.

## Portal mission & vision

The overall vision for Portal Network is to ***provide the infrastructure needed for anyone to access Ethereum data in a decentralized way with minimal hardware and bandwidth requirements.***

Portal Network is a public good that aims to become a core piece of infrastructure for many Ethereum-based applications. It will provide decentralized API access to Ethereum execution and consensus data and support several pathways to lightweight Ethereum clients. 

There are currently three primary sub-protocols that the Portal team are committed to shipping as priority deliverables in 2024:

- History network
- State network
- Beacon network

These sub-protocols are prioritized because together they provide verifiable access to the full Ethereum dataset in a manner that is fully decentralized and accessible on resource constrained devices. 

Specifically: 

- The History sub-protocol enables Ethereum execution clients to expire historical data via EIP-4444, safe in the knowledge that the data is available on request from the Portal Network. 
- The State sub-protocol gives light clients access to Ethereum stata data, exposing methods such as `eth_getProof` that eliminate the need for trusted third party RPC providers. 
- The Beacon sub-protocol gives light clients access to the latest block headers so that they can be confident they are following the canonical Ethereum chain.

Shipping these features will enable ***major upgrades for the Ethereum ecosystem as a whole***. These features have been in development for several years and have been through several rounds of refinement and course correction. Now Portal Network is on the brink of shipping these sub-networks into production. 

This is why ***2024 is a set to be a standout year for Portal Network.***

Longer term, there are proposals for more sub-protocols that serve granular transaction data, blob data, proofs etc, but these are out of scope for 2024.


## High level goals

### 2024 

- **Objective 1: Ship a viable solution for decentralized access to historical data**
    - Key result 1:
        -  Portal History subprotocol is fully featured according to the canonical specification and there is feature parity across all three Portal clients. 
    - Key result 2:
        - \>=1 execution client is using Portal History network to support EIP-4444
    - Key result 3:
        - History network never drops below 99% score on Glados
    - Key result 4:
        - EIP-4444 is shipped for execution clients, with Portal Network named as the default long term data availability solution.


- **Objective 2: Ship a viable solution for decentralized access to Beacon block headers**
    -  Key result 1:
        -  Portal Beacon subprotocol is fully featured according to the canonical specification and there is feature parity across all three Portal clients. 
    -  Key result 2:
        -  Beacon network never drops below 99% score on Glados
    -  Key result 3:
        - \>=1 application or light client using Portal Network to follow the head of the Beacon chain
    - Key result 4:
        - \>=1 execution client using Portal Beacon network to accelerate their syncing


- **Objective 3: Ship a viable solution for decentralized access to state data**:
    - Key result 1:
        -  Portal State subprotocol is fully featured according to the canonical specification and there is feature parity across all three Portal clients. 
    -  Key result 2:
        -  State network audits on Glados for recent states never drops below 99%.
    -  Key result 3:
        - \>=1 application or client using Portal State network to request `eth_getProof` data

- **Objective 4: Develop and maintain reliable tooling**
    - Key result 1: 
        - Glados maintains 99% uptime and is able to handle high volume of traffic (up to 10^5 visits/day)
    - Key result 2:
        - Portal Hive has 100% test coverage for all core functionality for all three networks across all three flagship Portal clients
    - Key result 3:
        - Glados provides network audit statistics for the history, beacon, and state networks


- **Objective 5: Communicate effectively with users and developers**
    - Key result 1: 
        - Github issues and comments across the Portal specs, Glados, and client repositories are always responded to (even if just an acknowledgement of receipt) within 3 days.
    - Key result 2: 
        - New features and milestones are reported via the Portal blog within 1 month of final PR being merged.
    - Key result 3:
        - At least 5 presentations focused on Portal Network are delivered at major Ethereum events in 2024, including Devcon.


### 2025 and beyond

These are longer term objectives that might be researched and discussed during 2024 but are not expected to be shipped until at least 2025. These will be revisited during 2025 roadmap planning.

- **Objective 1: Portal Network is widely accepted as the default source for light client execution and consensus data**
    - \> 10 apps/light clients have replaced third party centralized RPC providers with Portal Network.

- **Objective 2: Portal Network is widely considered critical Ethereum infrastructure** 
    - Key result 1: Portal mode is available is most Ethereum execution clients, either enabling them to aggressively prune their local data or to accelerate their sync times.

- **Objective 3: Portal Network is supporting major new developments for Ethereum**

    - Key result 1: Portal Network serves data enabling e.g. stateless clients, SNARKified EVM, Verkle trees, or other substantial Ethereum upgrades from the protocol roadmap. 

- **Objective 4: Portal developers ship major new features that change how normal users interact with Ethereum**

    - Key result 1: Portal team have beta implementations of canonical transaction index network
    
    - Key result 2: Portal team have agreed and begun to implement a design for a two-way bridge to Ethereum to enable transaction forwarding from Portal --> Ethereum


## Where are we now?

The Portal Network has existed for several years, during which time there have been substantial course corrections and redesigns in response to the evolving wider Ethereum landscape. Today, Portal Network is actively deploying infrastructure that will benefit large parts of the Ethereum ecosystem. 2024 is expected to be a pivotal year, where we focus on moving what were previously R&D projects into production and focusing on growing adoption for our core features: the History network, State network and Beacon network.

In the first instance, users will be expected to run Portal clients to expose a subset of Ethereum RPC methods. The list of methods will grow steadily over the first half of 2024 until almost all of the `eth` namespace methods can be served from Portal data. However, we also intend to collaborate with Ethereum client teams to help them to implement the Portal specification directly in existing execution clients, circumventing the need to run additional clients. 

## How did we get here?

Having established the current state of Portal network, it is useful to reflect on the previous year to understand how we arrived here and what lessons we will carry forward into 2024.

### 2023 year in review

Overall, 2023 has been a good year for the Portal Network.

There were major advances in all three Portal clients, Glados and the testing infrastructure. Below we outline some specific successes from the previous year:

#### Successes in 2023

- Features shipped:
    - History network (alpha)
    - Beacon network (alpha)
    - Glados network monitoring tool
    - Testing framework (Portal Hive)
- Conference talks:
    - \> 5 talks dedicated to Portal Network were delivered at major ETH events in 2023
- Team growth:
    - several new team members have joined in 2023
- Collaborations:
    - many new connections with app and client teams
- Communications:
    - new website and blog

This activity has set the stage for 2024 to be a pivotal year for Portal Network as some key sub-protocols move from alpha into production.

As well as successes, there were some frustrations for the Portal Network team in 2023:


## 2024 workstreams

To achieve our mission, we’re focused on 5 major workstreams that comprise our roadmap.

### 1) Trin

- The Trin team comprises 5 developers.
- Trin developers also maintain tooling such as Glados, Portal-Hive, and Portal-Bridge.
- The Trin team is especially focused on delivering a stable 4444s History network with validation for post-merge data via the Beacon network.
- Specific challenges they might encounter in delivering the 2024 roadmap include...
  - Stabilizing `utp` transport tooling / debugging async network issues
  - Stabilizing the History/Beacon networks, while supporting the alpha State network
  - Scaling pains of monitoring tools
  - Network failures due to unmitigated attack vectors
 
### 2) Fluffy

- The Fluffy team comprises 2 developers.
- Fluffy developers also assist on tooling such as Glados and Portal-Hive.
- The Fluffy team is especially focused on delivering a stable Portal history network and further work on the specifications and implementation of the Portal beacon network which allows for validation of post-merge data.
- The Fluffy team is also focused on developing a PoC that integrates the Portal network with an EL client (Nimbus).
- Specific challenges they might encounter in delivering the 2024 roadmap include...
  - Stabilizing the History/Beacon networks, while supporting R&D on the Portal state network.
  - Balancing time and efforts to further develop the Fluffy version of a Portal-bridge and actively run it on the network.
  - Client/network robustness, resilience and performance as the networks scale up in terms of amounts of nodes and data + the capability to properly monitor this. 
  

### 3) Ultralight

- The Ultralight team comprises 2 developers.
- Ultralight contributes a Typescript client to the Portal Network ecosystem, and explores ways to operate Portal Network clients in browsers and mobile devices. 
- Ultralight developers contribute to the testing infrastructure with custom tooling for Portal-Hive, client interop test suites, and client-agnostic browser tools.
- Team members also publish javascript based visualizations of client activity and protocol components as developer tools and eductional resources.
- The Ultralight team has focused on State Network R&D, and will develop the current prototype into a fully-featured spec complete implementation with interop testing suite.
- Specific challenges they might encounter in delivering the 2024 roadmap include...
  - Personpower - the current developers both work full time on the EthereumJS client, and contribute to Ultralight with the time and resources granted by their primary team.
  - Browser network incompatibilities - Browsers and Mobile devices present unique challenges from both technical and security issues.  The solutions involve modifying the NodeJS Ultralight client for browser compatibility, developing strategies against attack vectors unique to browsers, and implementing unique NAT traversal protocols. 

### 4) Glados

- Glados is worked on by developers from the three main client teams, with some individuals taking more prominent roles than others. 
- Scaling Glados from one to three Portal networks while simultaneously scaling up the expected traffic volume will be a challenge in 2024. The primary bottleneck in this scaling will be the Postgres DB that holds all of Glados's data. The primary path to accomplishing this scaling will be to continue improving Glados's DB queries and indexing. 
- Glados is also going to be extremely important in 2024 because it is the early warning system for problems with any of the Portal sub-protocols. It might be worth refining a dedicated process and schedule around Glados maintenance to ensure the team can be very responsive to any issues. 

### 5) Communications
- The Portal website and blog will become increasingly important as the primary outlet for public facing materials related to the Portal Network.
- Portal Network team members will start providing regular updates for the Portal blog to increase transparency to the outside world.


## Risks for 2024

Potential hurdles or challenges that would prevent our team from completing our priorities include:

- **Risk 1**: It is possible that we have overestimated the demand for Portal Network. We do not expect this to be true because we have explicitly surveyed client and app teams and we sense that there is pent up enthusiasm for the benefits Portal Network confers.

    **Mitigation**: - If it turns out we have overestimated demand for History, State or Beacon data we will reconnect with client and app teams to explain the benefits in more detail, and also put additional effort into public-facing communications including more frequent blog posts and articles. We will also focus on revisiting fundamental concepts such as "don't trust, verify" and the problems with relying on centralized RPC providers.

- **Risk 2** Portal is shipping new technology without good historical analogs, meaning there is implementation risk. Each client is complex and navigating uncharted territory.

    **Mitigation**: We are putting substantial effort into our monitoring and testing infrastructure, including PortalHive for cross-client testing.

- **Risk 3** Clients do not advance at similar rates and lose cross-client feature parity

    **Mitigation**: We have automated interoperability testing, weekly all-hands sync calls and async communications through Discord that allow us to keep up to date with each client's progress and avoid any one client team becoming siloed. It is possible to reorganize elements of the roadmap and reallocate some resources to if necessary. 


## Summary

2024 is shaping up to be a pivotal year for the Portal Network. The time has come for Portal Network to capitalize on several years of research and development and finally push some very valuable infrastructure into production. We expect that this will have positive effects across the Ethereum ecosystem.
However, we are aware of several risks and have put sensible mitigation strategies in place, particularly around testing and monitoring infrastructure. We are also focusing on improving our public facing communication through the website and blog. 
