---
title: "What is ElGamal?"
dek: "A whistleblower, three numbers in a newspaper, and a furious mayor — the discrete logarithm, the math, and a proof in Python."
date: "2026-07-07"
tag: CRYPTO
minutes: 13
draft: false
---

Alice runs a local newspaper, and her whistleblower Bob — the right hand of the mayor — wants to share information that proves a corruption scandal. But he is sure that he and his devices are being observed. So Alice figures out a plan: she writes down 3 numbers (p, g and y) with no context at the bottom of a random page, where Bob can find them. Bob finds them, locks up what he knows with those numbers, and sends it to Alice as c1 and c2. The mayor is furious — the only thing he sees is a long gibberish number, and not even his cryptography expert Dave is able to decode it. But Alice can decode it and gets her breaking news. That's the power of the not-so-well-known ElGamal asymmetric encryption.

## History of ElGamal

ElGamal was developed in 1985 by Taher Elgamal. It has its roots in Diffie-Hellman, but he wanted to create an alternative where the security does not depend on the hard problem of prime factorization.

## How does ElGamal work?

ElGamal is an asymmetric encryption, which means it has one key for encryption and a different one for decryption. And like other cryptography, it makes use of a mathematical problem — in this case it's called the **discrete logarithm**. Basically that means humans and machines are not able to reverse-engineer an exponentiation. To get the idea: let's say you take the number 5 and raise it to the power of 17. Now we take the result modulo 23, and we get 15. That's nothing you run in your head, I know, but for a machine that's kindergarten stuff. But if I tell you "I raised 5 to some secret power, took it modulo 23, and got 15 — what was the exponent?", well, there is no solution for that except brute-forcing it. And of course, in a real-life scenario these would be numbers with 600 digits, and to brute-force that you'd need some NASA supercomputer and a whole lot of time.

In a nutshell: you publish three variables — p (a prime number), g (a base number) and y (the result of a calculation with your secret key) — and give them to whom it may concern. That person also picks a secret number and sends back c1 (that's like an instruction manual for how to build the shared key) and c2, which is the ciphered message. The receiver then builds the "shared key" and decrypts the message. And this whole dance repeats for every single message — the sender picks a fresh secret number each time, so every message gets its own lock. As long as nobody finds a solution for the discrete logarithm, the messages are safe.

## Let's do the math

### 1) y = g^x mod p

We stick to the Alice and Bob story. First we need the public numbers that Bob gets through the newspaper — he will need them to encrypt his message. The public key contains the variables p, g and y.

p has to be a prime number. In our example we'll use small numbers because it's easier to follow, but remember: in a real-life scenario these would be extremely big numbers with hundreds of digits. So let's take p = 23.

Now we have to choose a base, also called a "generator". That means it has to be a primitive root of p. If we choose the base 5, we can check that with:

```
5^1 mod 23 = 5
5^2 mod 23 = 2
5^3 mod 23 = 10
and so on…
```

Between 1 and p-1 (that's 22), we will hit every number exactly once — that's what makes 5 a primitive root of 23. You could calculate your way through it by hand, but in reality you would just use pre-calculated, well-known pairs.

Now we need to calculate y, but for that we need a secret number that only Alice has. It has to be greater than 1 and lower than p-1, so between 2 and 21. Let's pick x = 15. Now we can calculate y:

```
g^x mod p = y
5^15 mod 23 = 19
```

Now we've got the public key: (p=23, g=5, y=19). The x=15 stays hidden with Alice.

### 2) c1 = g^k mod p and c2 = m * y^k mod p

Now it's Bob's turn. He also needs to pick a secret number, only for him: the variable k. It has the same requirements as Alice's x (1 < k < p-1) — and one extra rule: he has to pick a **new k for every message**, because otherwise Dave could start calculating his way in from the second message on. We take k = 7.

But how can Alice decrypt what Bob sends her when she doesn't know his secret k? That's the trick: he splits his transmission into 2 parts. The first is c1 — that's like a manufacturing plan that lets Alice build the shared key (variable s) out of his and her secret numbers, without either of them revealing anything:

```
g^k mod p = c1
(5^7) % 23 = 17
```

The second part is c2 — that's the encrypted message for Alice. Let's say we want to encrypt the message "10". To encrypt it you calculate c2 = m * y^k mod p, but I find it way easier to split it into 2 parts.

First, the shared key s (Bob builds it from Alice's public y and his secret k):

```
y^k mod p = s
(19^7) % 23 = 15
```

And then just multiply it with the message:

```
m * s mod p = c2
(10 * 15) % 23 = 12
```

So what Bob sends to Alice is: c1 = 17, c2 = 12.

### 3) m = c2 * (c1^x)^-1 mod p

Okay, we're getting close to the finale. Alice has received some gibberish from Bob and needs to decrypt it. First she needs to calculate s — the shared key — because she doesn't know Bob's secret k. That's where the c1 Bob sent comes in:

```
c1^x mod p = s
(17^15) % 23 = 15
```

You see: we're using Alice's secret x and Bob's "manufacturing plan" c1 to build the shared key — and it's the exact same 15 that Bob calculated on his side. Two different paths, same key. Now let's decrypt the message — the final step.

We know how c2 was built:

```
c2 = m * s mod p
```

But here's the problem: we don't have m yet, so we rearrange the equation to solve for m:

```
m = c2 / s
```

If you're thinking "hey, that's not possible" — you're absolutely right. The modulo world does not know division. So instead, the division gets transformed into a multiplication, with a trick called the **modular inverse**. Through that, we get the same effect as if we had divided.

The modular inverse s_inv is defined by:

```
s * s_inv mod p = 1
```

To find the missing s_inv, we can use **Fermat's little theorem**, which always works when p is a prime number:

```
s^(p-2) mod p = s_inv
(15^21) % 23 = 20
```

Quick check that it's really the inverse: 15 * 20 = 300, and 300 mod 23 = 1. ✓

I know it's a bit complicated, and I hope I didn't lose you. To get the full picture you might want to google things like "modular inverse" — or you just let things be as they are and stick to the pattern.

Now Alice has everything she needs to decrypt the message:

```
c2 * s_inv mod p = m
(12 * 20) % 23 = 10
```

And there it is: **10** — exactly the message Bob encrypted at the beginning. Alice cracked the code, the mayor's scandal hits the front page, and Dave is still staring at his gibberish numbers. What a beautiful day for asymmetric encryption!

## Let's prove it in Python

```python
p, g, x = 3037, 2, 2252
y = pow(g, x, p)
k = 2983
c1 = pow(g, k, p)
message_enc = 1234
s_bob = pow(y, k, p)
c2 = (message_enc * s_bob) % p
print(f"c1: {c1} c2: {c2}")

s_alice = pow(c1, x, p)
print(f"s_alice: {s_alice}")
s_inv = pow(s_alice, p-2, p)
message_dec = (c2 * s_inv) % p
print(f"Decrypted message: {message_dec}")
```

```
OUTPUT:
c1: 1888 c2: 2514
s_alice: 1080
Decrypted message: 1234
```

> **Note:** Notice the `pow(base, exponent, modulus)` function — that's Python's built-in way to do "exponent, then modulo" efficiently. Never use `base ** exponent % p` for this: it first builds an astronomically huge number and only then takes the modulo. And watch out for `^` — in Python that's XOR, not "to the power of"!

## But how safe is it?

Well, as long as the discrete logarithm stays a hard problem for modern PCs, ElGamal is very safe against passive attacks. But no system is safe by default — there are attack vectors that come from *using* it wrong. The most famous one: if Bob reuses the same secret k for two different messages, an attacker can recover one message from the other, without ever knowing the private key.

Let's take a closer look in Python:

```python
p, g, x = 23, 5, 15
y = pow(g, x, p)

k = 7          # same k for both (the mistake!)
s = pow(y, k, p)
c1 = pow(g, k, p)

m1 = 10        # Dave knows this one
m2 = 8         # this one Dave wants to crack
c2a = (m1 * s) % p
c2b = (m2 * s) % p

print(f"Message 1: c1={c1}, c2={c2a}")
print(f"Message 2: c1={c1}, c2={c2b}   <- same c1!")

# Dave: m2 = m1 * c2b / c2a  (s cancels out)
m2_hack = (m1 * c2b * pow(c2a, p-2, p)) % p
print(f"Dave cracks m2 = {m2_hack}  (real: {m2})")
```

```
OUTPUT:
Message 1: c1=17, c2=12
Message 2: c1=17, c2=5   <- same c1!
Dave cracks m2 = 8  (real: 8)
```

Two things give it away: **c1 is identical** for both messages (the tell-tale sign that k was reused), and because s is the same, it simply cancels out when Dave divides the two ciphertexts — so he never even needs the private key. Even though a random collision like this is extremely unlikely with big numbers, a lazy or broken random generator makes it a real threat. This exact kind of mistake is what got the PlayStation 3 cracked in 2010 — Sony reused the secret number in their ECDSA signatures.

On top of that, ElGamal has a different weakness: it's inefficient when it comes to speed and size. Every ciphertext is **twice** the size of the message (c1 and c2), and the key handling is relatively expensive to compute and scale. It's still really good cryptography, but for those reasons it has almost entirely been replaced by **ECC**, which is based on an elliptic curve and is far more efficient. Still, even on the modern internet you'll find ElGamal alive in **PGP** for encrypting emails and in digital signatures.
