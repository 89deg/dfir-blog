---
date: "2026-07-19"
tag: LEARNING
---

```bash
commit ad5dead (HEAD -> learning-path)
Author: Nils Hillmann <dfir@localhost>
Date:   Sun Jul 19 18:20:00 2026 +0200

    feat: lost in memmap 🧠

    Focused on Volatility — memory forensics feels like the biggest
    challenge and it's my favorite tool right now. But the easy and
    medium labs got boring fast: every question was "what's the
    parent PID of this process", "what did process xy open".
    PsList, PsTree and Handles rule the whole challenge.

    So I jumped ahead to the hard ones. Best decision ever. I
    understood nothing and learned the hard way — it was awesome.
    Not "what's the parent process?" but "find the malicious
    process and the md5 it is 'hiding'".

    Steps that hurt (in a good way): learned about alternate data
    streams, dumped my first memmap, exported the strings with
    Sysinternals strings, then dug the md5 out of 1.3 million
    lines with the right regex.

    I know now: I've just scratched the surface of this tool.

    Next turn: Windows Registry forensics with the Zimmerman tools
    — and a first hard challenge there.
```
