---
title: "DORA knows where you sleep — DHCP"
dek: "You don't just grab a random hotel room — you talk to Alice at the front desk. DHCP works the same way: Discover, Offer, Request, Acknowledge, and you've got an IP with a checkout date."
date: "2026-07-26"
tag: NETWORK
minutes: 3
draft: false
---

Let's assume you are in a hotel and you want a room to sleep in. Of course you can't just pick a random room and take it — you need the receptionist Alice, who will help you with the **DORA** process. That means: you **(D)iscover** by asking "does anyone have a room for me?", and Alice will notice and **(O)ffer** you one. You tell her how long you want to stay and **(R)equest** it — yes, you want that room for 3 days. She gives you the keys and **(A)cknowledges** that you took the room.

That's the heart of **DHCP (Dynamic Host Configuration Protocol)**. But instead of a physical room, it lends you a digital address: an IP. If it didn't exist, every time you added a device to your network you'd have to look up which IP is free and register it by hand. Sometimes a static IP is important — for example for your router — but most of the time DHCP makes your day easier.

## Checkout is at eleven

To not run out of IPs, DHCP also gives every address a **lease time**, which depends on the type of network. In a public network at an airport, hundreds of people each day need a temporary IP, so the lease time is likely 1 to 8 hours. In your home network, your devices might lease an IP for up to 30 days.

## The evil receptionist

Just like ARP, DHCP was designed with a lot of trust: your device takes the first offer it gets. If an attacker runs a **rogue DHCP server** in your network and answers faster than the real one, he can hand out his own machine as your gateway and DNS server — and suddenly all your traffic makes a detour through him. Combine that with **DHCP starvation** (requesting leases until the real server runs out of rooms) and the fake front desk is the only one left answering.
