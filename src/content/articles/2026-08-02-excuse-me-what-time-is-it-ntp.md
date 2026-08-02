---
title: "Excuse me, what time is it? — NTP"
dek: "A passenger's expired ticket looks perfectly valid — on his phone. Who gets to decide what 'now' really is? That's NTP: the time everyone in a network agrees on, handed down from an atomic clock."
date: "2026-08-02"
tag: NETWORK
minutes: 4
draft: false
---

Let's pretend you are a ticket inspector on a train. You want to check a passenger's ticket, and he hands you one that expired three days ago. You point out that his ticket is no longer valid and that he has to buy a new one — but he holds up his smartphone, which shows a different time than yours. On his clock, the ticket is still valid. You insist that this is not the real time. But how do you prove it?

In a nutshell, that's the — not so well known — **NTP (Network Time Protocol)**. In a network, NTP is the "real time" that everyone accepts, because it ultimately gets its time from an atomic clock. But what *is* an atomic clock?

## An atom that keeps the beat

Really simplified: you take an atom (most likely cesium) and it "waves" — an oscillation that is easy to measure. It swings **9,192,631,770 times per second**. So, basically, that oscillation *is* the definition of a second. It's so damn precise that it drifts only about 1 second every million years, while your PC might drift a second every day.

There are only around 400 of these clocks in the world. If every network, PC and phone asked them directly, there would be billions of calls every second. So NTP spreads the load: only a few servers — organized in **stratum** levels — actually sit close to the clock. **Stratum 0** is the atomic clock (the reference). **Stratum 1** asks it for the real time, **Stratum 2** only asks Stratum 1, and so on. Valid levels go up to **Stratum 15**; a device reporting **Stratum 16** means "unsynchronized" — it has no trustworthy time at all.

## Why we all have to agree on "now"

Why does it matter so much that everyone shares the same "real time"? To name just two reasons:

* If only the host's own clock counted, it could simply rewind its clock and reactivate expired tokens or certificates — a dream for every **black hat** hacker.
* There would be no **traceability**. And when it comes to DFIR, timeline reconstruction is everything. If the timestamps are rubbish, you can't prove that something happened at a specific point in time, and a suspect could fake events they were never actually part of.
