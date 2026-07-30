---
date: "2026-07-30"
tag: LEARNING
---

```bash
commit 5e1ec7ed (HEAD -> learning-path)
Author: Nils Hillmann <dfir@localhost>
Date:   Thu Jul 30 21:40:00 2026 +0200

    feat: KAPE found 99 hives but I don't know how to use one 📊

    Second hard challenge @ CyberDefenders. Mostly incident
    analysis — and a brutal refresher on KAPE and the Zimmerman
    suite. After the TryHackMe basics I never touched them
    again, and when KAPE handed me a pile of .csv files
    (pre-parsed by the Zimmerman tools), each one with ~30
    columns and thousands of rows, I was completely lost.

    Step one: re-learn the artifacts. What is a hive, what is
    Prefetch, what is a shellbag — so I'd at least know WHICH
    csv to open.

    Step two: find something in that chaos. LibreOffice ran
    into a character limit and crashed a few times, and
    doom-scrolling with simple search doesn't scale. Enter my
    new friend: Import-Csv. I work on a Mac, a bash terminal
    is my home — so PowerShell felt anything but intuitive.
    I got used to it.

    Two evenings of learning later, Select, Where and Sort are
    my new best friends. I masterfully wrote some five-line
    queries that turned 30,000 rows into the 5 interesting
    ones — and beat the challenge.

    Memory forensics: feels fit. Windows forensics: feels fit.
    Next turn: mastering Android forensics — with a nice hard
    challenge.
```
