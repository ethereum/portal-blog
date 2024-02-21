---
title: How to run Portal Bridge in 4444s mode
date: 2024/2/15
description: Explaining how to run a Portal Bridge in latest mode (Windows/Linux)
tag: portal bridge, Ethereum, archive
author: Kolby ML (Moroz Liebl)
---

# What is a Portal Bridge?
A Portal Bridge is an application which takes Ethereum mainnet data from a source, feeds it into a Portal client who then injects the data into the Portal sub-networks.

# What are we doing in this guide?
We will be deploying a Portal Bridge that will feed the Portal history subnetwork with 4444s data. Currently, this refers to all pre-merge chain history data. We will feed this data into the the Portal History network, which is a Portal sub-network that stores canonical Ethereum mainnet headers, block bodies, and receipts. The Portal Bridge will be using [era1](https://github.com/ethereum/go-ethereum/pull/26621) files to source the data. These files are hosted at `https://era1.ethportal.net`.

# Why is this useful?
EIP-4444 relies upon alternative sources for chain history data, rather than requiring each mainnet client to store all of that data on a local disk. As one of these sources, it's vital that the Portal Network is able to consistently make this data available. While the Portal network protocol is designed to maintain this data once it's been injected, it's incredibly valuable to continuously bridge this data into the network, especially in the early stages of the network.

# Guide
<details><summary>If using Windows follow this to install build dependencies</summary>

**Step 1:** open powershell

**Note** only install these if you don't have them already

**Step 2:** Install Rust `winget install Rustlang.Rustup`

**Step 3:** Install git `winget install -e --id Git.Git`

**Step 4:** Install clang/llvm as it is required to compile c-kzg `winget install LLVM.LLVM`

**Step 5:** Install Microsoft C++ Build tools https://visualstudio.microsoft.com/visual-cpp-build-tools/ make sure to check `Desktop development with C++` before clicking the install button

**Step 6:** open a new powershell to refresh environment variables

</details>
<details><summary>If using Ubuntu/Linux follow this to install build dependencies</summary>

**Step 1:** Open the terminal

**Step 2:** Install system dependency's required

  ```sudo apt install libclang-dev pkg-config build-essential git```

**Step 3:**  Install Rust https://www.rust-lang.org/tools/install

</details>
<details><summary>Run the bridge!</summary>

**Step 1:** Clone trin project: ``git clone https://github.com/ethereum/trin.git``

**Step 2:** cd into trin: `cd trin`

**Step 3:** compile trin `cargo build --bin trin`

**Step 4:** clone portal-accumulators `git clone https://github.com/ethereum/portal-accumulators.git`.
- These accumulators are necessary to build proofs for the headers we are injecting into the network.

**Step 5:** run the bridge: `cargo run -p portal-bridge -- --executable-path ./target/debug/trin --mode fourfours --epoch-accumulator-path ./portal-accumulators trin`
- This will randomly select an era1 file, and gossip all of the contained headers, receipts & bodies, before moving onto the next era1 file.
- The bridge is a long-running process, so it's ideal if you're able to launch this and let it run in the background using a tool like `tmux`.

</details>

**Tada!!** You are now providing the Portal Network with very valuable data! You should see a stream of logs indicating that your bridge is finding new headers from the provider and serving them to the network. Thanks for helping to support the network!

If you have any questions, run into any problems, or encounter a bug, please let us know by creating an [issue](https://github.com/ethereum/trin/issues) or reaching out to us on our [Discord channel](https://discord.gg/jzUYagcFQS).
