---
title: Exploring multikernel Linux anti-cheats
description: A speculative approach to reconcile privacy with effectiveness.
date: April 4 2026
---

Anyone following the competitive PC gaming scene has probably run into a frustrating barrier. Massive multiplayer titles just refuse to run on Linux<sup>[1](https://areweanticheatyet.com/)</sup>. We have seen colossal technical achievements with compatibility layers like Valve's Proton translating Windows system calls to Linux in real-time. Even so, the final barrier to entry is not graphics APIs or performance overhead. The real barrier is anti-cheat software.

People often reduce this discussion to market share economics, assuming game studios are simply ignoring an operating system with a smaller user base<sup>[2](https://gs.statcounter.com/os-market-share/desktop/worldwide/#monthly-202604-202604-bar)</sup>. But the root of the problem is actually architectural. The fundamental security model of the Linux desktop and the threat detection models required by modern e-sports are fundamentally misaligned in their assumptions and trust boundaries<sup>[3](https://secret.club/2020/04/17/kernel-anticheats.html)</sup>.

Let's break down the technical disconnect between these environments and look at a structural, multikernel approach.

> To be clear, this approach is currently a promising architectural proposal based on experimental research by open-source organizations like the Multikernel project<sup>[4](https://multikernel.io/)</sup> rather than a mature, production-ready solution.

## Security vs. privacy vs. integrity

To understand the deadlock, we need to separate three distinct layers: system security, user privacy, and competitive integrity.

### System security and user privacy

Modern Linux desktop environments are built to protect the system and the user from third-party software. The architecture relies heavily on strict process isolation<sup>[5](https://en.wikipedia.org/wiki/Process_isolation)</sup>. Technologies like Flatpak contain applications within restricted runtimes so they cannot access arbitrary files on the host system<sup>[6](https://flatpak.org/)</sup>. Display server protocols like Wayland enforce strict graphical isolation<sup>[7](https://wayland.freedesktop.org/)</sup>. This ensures that one application cannot capture the screen output or intercept the keystrokes of another application without explicit user authorization via desktop portals<sup>[8](https://flatpak.github.io/xdg-desktop-portal/)</sup>. Ultimately, the user is the absolute authority over the hardware.

### The anti-cheat model

On the flip side, the security model of a competitive game operates on a _Zero-Trust_ basis regarding the client<sup>[9](https://en.wikipedia.org/wiki/Zero_trust_security_model)</sup>. It assumes the host computer is a hostile environment and the user is a potential attacker. To make sure no external software is injecting code into the game's memory or reading its state to provide unfair advantages like rendering enemy positions through geometry, the anti-cheat requires total visibility over the machine<sup>[10](https://en.wikipedia.org/wiki/Cheating_in_online_games)</sup>.

For a game publisher to guarantee competitive integrity, the user's execution environment needs strict auditing to prevent tampering<sup>[11](https://www.riotgames.com/en/news/vanguard-security-update-motherboard)</sup>. These layers are not inherently incompatible, but forcing the anti-cheat model onto the Linux privacy model creates the current impasse.

### The failure of traditional solutions

On Windows, the gaming industry normalized the requirement of Ring-0 or kernel-level access<sup>[12](https://en.wikipedia.org/wiki/Protection_ring)</sup>. Anti-cheat software operates at the deepest layer of the operating system, holding higher privileges than even the system administrator. It continuously scans running processes, loaded drivers, and hardware states for anomalies.

![[1.svg]]

<p style="text-align: center;"><i>Windows current anti-cheat solution.</i></p>

When companies try to port this model to Linux, they encounter a severe structural limitation.

If an anti-cheat operates strictly in the user space (Ring-3) on Linux, it is vulnerable<sup>[13](https://en.wikipedia.org/wiki/User_space_and_kernel_space)</sup>. A user with root privileges can compile custom tools to manipulate the game's memory space via <code>ptrace</code> or direct memory access<sup>[14](https://man7.org/linux/man-pages/man2/ptrace.2.html)</sup>. A non-privileged anti-cheat simply cannot detect these methods.

![[2.svg]]

<p style="text-align: center;"><i>Linux current anti-cheat solution.</i></p>

On the other hand, requiring a proprietary, closed-source kernel module to monitor a Linux system is widely rejected by the open-source community<sup>[15](https://www.gnu.org/philosophy/free-sw.html)</sup>. It brings severe privacy implications and system stability risks. Beyond that, the fragmentation of Linux kernel builds makes maintaining a proprietary kernel module for every distribution financially unviable for most studios.

## Multikernel, a speculative architectural solution

If anti-cheat software requires strict isolation to verify game integrity, and Linux users require their primary operating system to remain private and unmonitored, the technical answer might lie in partitioning the hardware itself<sup>[16](https://multikernel.io/technology.html)</sup>. This avoids fighting for control over a single operating system instance<sup>[17](https://multikernel.io/)</sup>.

Emerging systems engineering projects are currently mapping out a _bare-metal peer-to-peer_ architecture that could resolve this. By combining process sandboxing with multikernel orchestration, you could execute the game in an environment completely isolated from the user's primary desktop session.

This is not the only possible direction, but it is one of the few that attempts to reconcile privacy and integrity at the OS level. The industry is also exploring alternatives like lightweight virtualization using KVM with passthrough<sup>[18](https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF)</sup>, trusted execution enclaves<sup>[19](https://arxiv.org/html/2512.21377v1)</sup>, remote game streaming<sup>[20](https://arxiv.org/html/2507.00623)</sup>, and much more aggressive server-side validation<sup>[21](https://wjarr.com/sites/default/files/fulltext_pdf/WJARR-2025-1747.pdf)</sup>.

For the multikernel route, they rely on four main concepts.

**Physical Hardware Partitioning**

Instead of using a traditional hypervisor that introduces latency and allows the host system to maintain read-access over the guest, tools like kerf orchestrate multiple Linux kernel instances on a single machine<sup>[22](https://github.com/multikernel/kerf)</sup>. The primary desktop kernel isolates specific CPU cores and memory blocks, explicitly ceding control of them to a secondary, minimal kernel.

However, this introduces severe resource contention challenges. The primary and secondary kernels still share underlying hardware pathways. Without strict cache partitioning (like isolating the Last-Level L3 Cache) and rigid memory bandwidth control, the secondary kernel could easily starve the primary desktop environment, leading to system stutters or complete lockups. The promise of _zero-copy_ and low latency remains theoretical until these resources are managed effectively at the silicon level.

**Process Confinement**

The game executable is launched using sandboxing tools like sandlock<sup>[23](https://github.com/multikernel/sandlock)</sup>. This taps into native Linux security features like Landlock and seccomp-bpf to confine the game process<sup>[24](https://docs.kernel.org/userspace-api/landlock.html)</sup>. It prevents the game from reading the user's `/home` directory and stops external processes on the primary kernel from attaching debuggers to the game.

**Zero-Copy Memory Communication**

To let the secondary anti-cheat kernel monitor the game's state without introducing inter-process communication latency, the system uses specialized file systems like daxfs<sup>[25](https://github.com/multikernel/daxfs)</sup>. This allows lock-free, atomic operations in shared memory<sup>[26](<https://en.wikipedia.org/wiki/Direct_Access_(DAX)>)</sup>. This is designed to minimize overhead and avoid traditional IPC bottlenecks, though real-world implementations would still need to account for cache coherence and NUMA penalties.

**Immutable File State**

To guarantee that the game binaries and assets have not been modified locally, the game runs over a Copy-on-Write file system layer like branchfs<sup>[27](https://github.com/multikernel/branchfs)</sup>. When the game launches, it runs in an ephemeral branch. If an external process tries to modify a dynamic library or a texture file, the changes only happen in the temporary branch. The anti-cheat detects this and discards it immediately upon closing.

![[3.svg]]

<p style="text-align: center;"><i>Exploring a multikernel anti-cheat architecture idea.</i></p>

## The ARM impasse

This structural friction hits a massive limitation when looking at the future of portable Linux devices. As the industry shifts toward custom ARM handheld gaming consoles, and as developers achieve massive milestones porting native desktop Linux to Apple's M-series silicon, the multikernel approach becomes exponentially harder to implement than on traditional x86-64 processors.

Custom ARM System-on-Chips (SoCs) heavily utilize unified memory architectures and tightly coupled, proprietary hardware controllers. These complex boards are not designed to dynamically cede atomic control to a secondary bare-metal kernel. Attempting to split real-time hardware access without a conventional hypervisor on these specialized platforms not designed for, making physical partitioning unviable for this rapidly growing segment of Linux gaming hardware.

## The barriers to practical adoption

While this multikernel approach creates a strict _Zero-Trust_ environment focused entirely on the application ecosystem rather than the entire machine, the engineering and adoption costs are exceptionally high.

Creating a secondary, minimal kernel provided by the publisher with zero-copy isolation guarantees represents a massive engineering investment for game studios. Forcing the player's system to dynamically allocate fixed CPU cores and memory blocks to boot a secondary kernel also introduces a lot of technical friction.

Also, for this multikernel architecture to become a practical reality, it needs systemic standardization across the entire Linux ecosystem. The foundational protocols must be established by organizations like freedesktop.org and accepted upstream by the Kernel maintainers. Meanwhile, the execution flows must be natively adopted by open-source launchers like Heroic and Lutris, as well as proprietary clients from publishers like EA, Epic Games and Steam.

## Conclusion

It is also crucial to acknowledge that even the most invasive kernel-level anti-cheats currently on the market do not deliver absolute protection<sup>[28](https://dl.acm.org/doi/epdf/10.1145/3664476.3670433)</sup>. Cheat developers are continually finding workarounds<sup>[29](https://en.wikipedia.org/wiki/Cheating_in_online_games)</sup>.

![[4.svg]]

<p style="text-align: center;"><i>Current problems with hardware cheats.</i></p>

This multikernel approach assumes a software-only adversary. If a malicious actor has physical access to the system, they could still compromise the environment using hardware cheats. External Direct Memory Access PCIe cards can bypass the CPU and read memory directly, while malicious USB peripherals can spoof legitimate mouse and keyboard inputs at the firmware level. Process isolation via Wayland or Sandlock cannot defend against malicious hardware routing inputs before they reach the operating system.

Implementing this multikernel solution would elevate Linux to face the exact same barrier as these legacy solutions. It would force attackers to abandon software-based exploits and rely entirely on complex, external hardware cheats. By anchoring this execution within the strict process isolation and graphical confinement already provided by modern Linux desktop environments, the resulting architecture could actually surpass the security baseline of current platforms. This would deliver competitive integrity without compromising user privacy.

Ultimately, the proposal of this post was to explore this multikernel architecture as an alternative path for anti-cheat on Linux. Personally, however, I believe that pursuing server-side anti-cheat solutions is a far more practical and economically viable route for the industry. That being said, I do not completely discredit the multikernel concept. It is entirely possible that we will see similar or hybrid solutions emerge. As for how the Linux gaming ecosystem will actually solve this structural puzzle, who knows what the future holds?
