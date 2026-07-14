---
title: "What is RSA?"
dek: "Public-key crypto told through Bob, Alice, and a nosy Dave in the middle — the story, the math, and a proof in Python."
date: "2026-07-03"
tag: CRYPTO
minutes: 12
draft: false
---

Let's assume we've got two persons, Bob and Alice, sitting in a row of seats. They want to communicate privately through letters, but unfortunately Dave sits between them and he reads every letter. So Alice has the idea to encrypt the message. But she can't just give Bob the key, because Dave would get it too. So instead, she writes 2 numbers (n and e) on a letter and gives them to Bob. Now Bob uses them to encrypt his message and gives it back to Alice. And even though Dave has the same numbers, neither he nor Bob is able to decrypt it. That's only possible for Alice. In a nutshell, that's the magic of the asymmetric encryption RSA.

## History of RSA

In 1977, Ron **R**ivest, Adi **S**hamir and Leonard **A**dleman had the idea of a one-way function that couldn't be reversed and could therefore be used to encrypt messages. It took months of hard work to get the right algorithm. 20 years later, papers were leaked showing that 4 years earlier, in 1973, the mathematician Clifford Cocks had already created a similar algorithm for the British secret service GCHQ.

## How does RSA work?

RSA is an asymmetric encryption, which means you've got different keys for encryption and decryption. To achieve that, it makes use of a system called a "one-way function." That basically means a human or machine is only able to calculate something in one direction and not able to reverse it. So to get the idea, let's take the number 13 and multiply it by 17. We get the number 221, and even though that's not easy for most humans to calculate in their head, with simple math skills you can easily get there — and of course every PC can. But if I tell you the number is 221, what were the two multipliers that made it? We get to a point where even for a PC it's only possible by brute-forcing tons of combinations.

Now assume we've got the number 3432934082492 — what were the two multipliers? I think you got the idea!

So it all relies on the fact that you can give a person — well, actually you can give it to every person in the world, it's a public key after all — the variable n (that's the product of the secret prime numbers p and q) and e (the exponent). With those, the person can calculate an encrypted message that only the person with the **private** key can decrypt. And as long as we don't have quantum computers, or a mathematician finds a new way to "not make it one-way anymore," it is not possible for anyone to decrypt it. But like all things, there are a few exceptions that make it "breakable" — we'll get to that a little bit later.

## Let's do the math

It's time to get the facts straight! Let's take a closer look at RSA. We need 3 equations to get it done.

### 1) n = p * q

First, Alice — who will create the private key for herself and the public key for Bob — needs to pick 2 prime numbers, p and q. There's a complex rule for how to pick them, but in a nutshell they have to be in the same range, but not "too close," and they can't be the same. To make it easy we pick p = 5 and q = 13.

p and q are the "master key" and it's crucial to keep them secret, because everything is based on them. Now we can calculate the product n.

```
p * q = n
5 * 13 = 65
```

n is our modulus. It's not secret — that's the first part of the key that Bob gets.

### 2) c = m^e mod n

Don't get frustrated if you see that term and scratch your head. Basically it means c (= crypted) is m (the message, the thing we want to encrypt) raised to the exponent e (we'll calculate that next), modulo n (which we just calculated).

But before we get the missing exponent, we first need to calculate phi(n). Phi shows how many numbers are coprime in relation to n. We'll need it because it's a condition for picking e and later for calculating the private key.

So to get phi(n) we calculate:

```
(p-1) * (q-1) = phi(n)
(5-1) * (13-1) = 48
```

Now we can pick e. It's more or less a "free pick," but it has conditions. First, it has to be coprime with phi(n), and it also has to be smaller than phi(n). If we try 17, we see it's of course smaller than 48 — and is it coprime with 48? Yes, because 17 is a prime number and has no divisors other than 1 and itself.

Now we've got everything we need to give Bob the key.

```
Key: n = 65, e = 17
```

Now Bob wants to encrypt the message "10":

```
m^e mod n = c
(10^17) mod 65 = 30
```

So he writes "30" on a letter and gives it to Alice.

### 3) m = c^d mod n

Now Alice wants to decrypt the original message. So the only thing she needs to do is calculate the variable d:

```
e * d = 1 mod phi(n)
```

Well, to get d you need to calculate with d. Okay, that sounds a little bit confusing, but with small numbers you can try and error some terms to brute-force it, and for bigger numbers even a really easy Python program will calculate d almost instantly — we'll take a closer look at that after the math part.

So Alice has to do a little bit of trial and error. In a nutshell, she starts with d = 2 and goes on until the equation gives "1":

```
(17 * 2) mod 48 = 34
(17 * 3) mod 48 = 3
(17 * 4) mod 48 = 20
…
(17 * 17) mod 48 = 1
```

So now we know that d = 17 (the fact that it has the same value as the exponent is random — that's because of the small numbers we chose).

Now she can decrypt the message:

```
c^d mod n = m
(30^17) mod 65 = 10
```

So you see, Alice was able to decrypt the message and Dave isn't. What a beautiful day for asymmetric encryption!

## Let's prove it in Python

```python
import math

p, q = 5009, 5077
n = p * q
phi = (p-1) * (q-1)
e = 4507

# are e and phi coprime?
while True:
    if math.gcd(e, phi) == 1:
        break
    else:
        e = e + 1

# calculate d
d = 2
while True:
    if (e*d) % phi == 1:
        break
    else:
        d = d + 1

print(f"d={d}")

# encrypt
message = 1234
c = pow(message, e, n)
print(f"Encrypted Message is {c}")

# decrypt
decrypted_message = pow(c, d, n)
print(f"Decrypted Message is {decrypted_message}")
```

```
OUTPUT:
d=10163731
Encrypted Message is 3065649
Decrypted Message is 1234
```

> **Note:** If you're not familiar with `pow`, that's a function made specifically for exponent-and-then-modulo calculations. Without it, your PC would take forever, because the intermediate numbers get astronomically high.

## But how safe is it?

Well, the safety crucially depends on n, and therefore on p and q. If we take the math example, we've got n = 65 — that's not really a big number, and by brute force every PC can break it in a couple of seconds.

So let's try it. We know n and e. We start counting p and q up one by one until we find the pair that multiplies to n:

```python
n = 65

for p in range(2, n):
    for q in range(p, n):
        if p * q == n:
            print(p, q)
```

```
OUTPUT:
5 13
```

Well, that was quick — it took roughly 1 second. That's why most security today uses 4096 bit, where your n has about 1233 decimal places. Try to brute-force that! So in a nutshell: it's safe, it's very safe, and we use it in our daily routines. If you open a website you use it, if you use SSH you use it, if you use digital signatures you use it, and so on. And as long as we don't have quantum computers, this will not change.
