---
title: "Who the hell is Alice? — ARP"
dek: "A lost key at a party, one shout into the room, and one raised hand — ARP is the protocol that trusts everybody. That trust is exactly the problem."
date: "2026-07-19"
tag: NETWORK
minutes: 4
draft: false
---

Let's assume you're at a big party. Beneath the root beer you find a key with a badge that just says "Alice". You want to do the right thing — but who the hell is Alice? You could ask every person one by one, but that's way too time-consuming. Instead, you turn off the music and shout: "Who is Alice? I've got her keys!" One person raises her hand.

That might sound a little unrealistic in real life, but in digital networks that's exactly what the **Address Resolution Protocol (ARP)** does. Your PC wants to send a message to 192.168.0.7 (Bob). The IP address finds the right network — but inside the local network, messages are delivered to **MAC addresses**. If your PC doesn't know which MAC belongs to 192.168.0.7, it broadcasts to the whole network: "Hey, who has 192.168.0.7?" Bob answers: "That's me, my MAC address is 12:ff:12:12:0f:07." Your PC writes that down in its **ARP cache**, and it doesn't have to ask again.

## The protocol that trusts everybody

You see: ARP trusts every answer, no questions asked. And that comes with a big downside called **ARP spoofing**. Alice wants to send a message to Bob, and her PC asks: "Who has 192.168.0.7?" But it's not Bob who answers — it's Dave (192.168.0.8), who wants to steal the information. Now Alice's ARP cache says Bob's IP belongs to Dave's MAC address. Dave can read her messages, quietly pass them along like nothing happened (a classic **man-in-the-middle**), or manipulate them before forwarding.

Even if the real Bob answers too, most systems simply keep the answer that arrives **last**. And Dave doesn't even have to wait to be asked: he can announce "192.168.0.7 is at my MAC" without any question at all — that's called **Gratuitous ARP**. It exists for a good reason: a new member of a network can introduce itself, and when an IP address changes hands, the MAC beneath it changes too. But the same mechanism lets Dave overwrite the real owner of the IP in everybody's cache, again and again.

## Is this still a thing?

Modern managed switches inspect ARP traffic and filter the malicious answers (the feature is called **Dynamic ARP Inspection**). But a simple home router or an unmanaged switch does nothing of the sort — ARP spoofing is very much still a thing.
