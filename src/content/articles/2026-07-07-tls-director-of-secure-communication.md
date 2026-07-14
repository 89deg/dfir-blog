---
title: "TLS – Director of Secure Communication"
dek: "TLS doesn't encrypt anything itself — it's the boss deciding which armored vehicle your gold rides in. The handshake, step by step."
date: "2026-07-07"
tag: NETWORK
minutes: 3
draft: false
---

I bet you have heard of TLS or its predecessor, SSL, many times. Maybe you thought it's the protocol that encrypts your communication — but that is not quite how it works. It's actually more like a directive ensuring that everything is secure according to its rules.

Let's say your information is a chest full of gold. The cryptography methods, like Diffie-Hellman and AES, are the armored vehicle and the security guards protecting it. TLS is the boss who decides which vehicle to use, how many guards are needed, which direction to drive, and so on.

So, whether you are using HTTPS, IMAPS, or FTPS, TLS is always the rulebook defining how things get done.

## The handshake, step by step

Imagine you want to establish a secure connection to a server:

1. **Your Hello:** You ask the server for communication and provide a list of cryptographic tools you support, like ECC or AES. You also send some basic parameters to prepare the session.
2. **The Server's Answer:** The server responds: "I choose Diffie-Hellman and AES. Also, here is my trust certificate so you can verify who I am."
3. **The Check:** You verify the certificate and confirm: "Yes, this is exactly the server I was looking for."
4. **The Secret:** Now, Diffie-Hellman performs the key exchange. From this exact moment on, an attacker can only see gibberish ciphertext.
5. **The Speed-up:** Both sides now have the symmetric key and switch to AES to speed up the actual communication.

Everything that happened here is a fixed process prescribed by TLS — a true hero of security.
