---
title: How to run Portal Bridge on history latest mode Windows/Linux guide
date: 2024/2/15
description: Explaining how to run a Portal Bridge in history latest mode.
tag: portal bridge, Ethereum, archive
author: Kolby ML (Moroz Liebl)
---

# What is a Portal Bridge?
A Portal Bridge is a application which takes Ethereum mainnet data from a source and provides it to a Portal client to inject into Portal sub-networks.

# What are we doing in this guide?
We will be deploying a Portal Bridge using the free tier of infura. The bridge will be running the History latest mode, which gossips the latest Ethereum block data onto the Portal History network. The Portal History network is a Portal sub-network which stores canonical Ethereum mainnet headers, block bodies, and receipts.

# Guide
<details><summary>Step 1: Get infura endpoint + api key url</summary>

**Step 1:** goto https://www.infura.io/ and click get started
![Image of Infura](../../public/images/portal-bridge-latest-guide/image-of-infura.png)
**Step 2:** Create an account or login
![Create an account page](../../public/images/portal-bridge-latest-guide/create-an-account-page.png)
**Step 3:** Create a api key
![Create a api key](../../public/images/portal-bridge-latest-guide/create-a-api-key.png)
**Step 4:** Click mainnet then save changes
![Click mainnet then save changes](../../public/images/portal-bridge-latest-guide/click-mainnet-then-save-changes.png)
**Step 5:** Copy the infura endpoint and save it for later
![Copy the infura endpoint and save it for later](../../public/images/portal-bridge-latest-guide/copy-the-infura-endpoint-and-save-it-for-later.png)
</details>
<details><summary>Step 2: Install depends Windows!</summary>

**Step 1:** open powershell

**Note** only install these if you don't have them already

**Step 2:** Install Rust `winget install Rustlang.Rustup`

**Step 3:** Install git `winget install -e --id Git.Git`

**Step 4:** Install clang/llvm as it is required to compile c-kzg `winget install LLVM.LLVM`

**Step 5:** Install Microsoft C++ Build tools https://visualstudio.microsoft.com/visual-cpp-build-tools/ make sure to check `Desktop development with C++` before clicking the install button

**Step 6:** open a new powershell to refresh environment variables

</details>
<details><summary>Step 2: Install depends Ubuntu Linux</summary>

**Step 1:** Open the terminal

**Step 2:** Install system dependency's required

  ```sudo apt install libclang-dev pkg-config build-essential git```

**Step 3:**  Install Rust https://www.rust-lang.org/tools/install
</details>

</details>
<details><summary>Step 3: Run the bridge!</summary>

**Step 1:** Clone trin project: ``git clone https://github.com/ethereum/trin.git``

**Step 2:** cd into trin: `cd trin`

**Step 3:** compile trin `cargo build --bin trin`

**Step 4:** clone portal-accumulators `git clone https://github.com/ethereum/portal-accumulators.git`

**Step 5:** run the bridge (make sure to `<put infura url/(api key) here>` with your infura api key url you got earlier) `cargo run -p portal-bridge -- --executable-path ./target/debug/trin --mode latest --el-provider <put infura url/(api key) here> --el-provider-request-limit 100000 --epoch-accumulator-path ./portal-accumulators trin`

</details>