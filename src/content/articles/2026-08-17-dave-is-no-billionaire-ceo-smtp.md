---
title: "Dave Is No Billionaire CEO — SMTP"
dek: "A postman who delivers every letter without ever checking who really wrote it. That's SMTP. And that's exactly why 'From: your CEO' means almost nothing on its own."
date: "2026-08-17"
tag: NETWORK
minutes: 5
draft: false
---

Let's pretend you are Bob, a hard-working postman. Your job is to deliver letters to the right person. You don't care who sent them, you don't care what's inside — you just bring them to the right door. One day you get a letter that claims to be from a rich billionaire CEO. But in truth, the letter is from Dave. Alice gets it, and whether she believes the sender is up to her.

That's exactly what the **Simple Mail Transfer Protocol (SMTP)** does. It takes a sender and a receiver, "asks" DNS where to find the receiver, and then delivers the letter. It never checks whether the sender is really who he claims to be — that was never its job.

## Bob's three allies

Does that mean we're doomed and can't trust any email? No. Because Bob got some company. Let me introduce his three allies: **SPF**, **DKIM** and **DMARC**. The key to all of them is DNS — the same place SMTP looks up the destination. While SMTP just delivers, these three quietly check that the sender is who he claims to be.

**SPF** — Let's say Dave claims to be from a big company called BigInvestor, so he fakes his address as `ceo@biginvestor.com`. But the real BigInvestor can write into its DNS entry which IP addresses are actually allowed to send mail for `biginvestor.com`. So when Dave sends from his own server, SPF checks that list and says: nope, this server isn't on it.

**DKIM** — the second layer against spoofing. Real mail from BigInvestor gets signed with [RSA](/articles/2026-07-03-what-is-rsa). The private key stays locked on BigInvestor's own servers, but the public key sits in the DNS. When the receiver's mail provider (Gmail and co.) gets the mail, it fetches that public key and checks the signature. If Dave sends an unsigned — or tampered — mail, the signature won't check out. So it's either manipulated, or not from someone allowed to use the `biginvestor.com` domain. (One thing to keep in mind: DKIM doesn't encrypt the mail — anyone can still read it. It only proves it's genuine and unchanged, the exact signing logic from the [RSA post](/articles/2026-07-03-what-is-rsa).)

**DMARC** — and now we meet the judge. DMARC is the rulebook and the executioner. When SPF and/or DKIM shout "hey, there's a faker here", DMARC decides what actually happens to the mail. For example: throw it in the trash — and send a report to the real BigInvestor so they know someone's abusing their name.

## Is this still a thing?

So can you trust SMTP, and every mail you get? No. There's no guarantee the DNS entries were ever set up. Big companies lock this down tight, but a lot of small ones never bother — no SPF, no DKIM, no DMARC. So unfortunately you can still receive a perfectly faked mail from your local dentist, a small car repair shop, and so on. And even when the checks work, the visible **"From"** is the one line you should trust the least — the real trail lives in the mail's **headers**, where every server it passed through leaves a stamp Dave can't wipe.
