---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  ## Human-like Memory Objectives for AI Agents
  
  A presentation based on the blog post at Sid Said Blog.
drawings:
  persist: false
title: Human-like Memory Objectives for AI Agents
---

# Human-like Memory Objectives for AI Agents

Creating more efficient and natural AI interactions

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: section
---

# The Memory Paradox

---
layout: default
---

# The Memory Paradox

<v-clicks>

- More context means better AI performance
  - Deeper understanding
  - More coherent responses
  - Better continuity in conversations

- But more context creates significant challenges:
  - Hard context window limits (32K-128K tokens)
  - Higher computational costs
  - Increased response latency
  - Information relevance degradation

- **Key Insight**: We need a smarter approach to context, not just bigger windows

</v-clicks>

---
layout: two-cols
---

# Learning from Human Memory

<v-clicks>

- Humans don't remember everything
- We selectively recall relevant information
- We unconsciously filter and compress memories
- We index new experiences in the background

</v-clicks>

::right::

<div class="pl-4 mt-12">
<v-clicks>

- **Selective Recall**  
  *"I remember we discussed this last month"*
  
- **Background Indexing**  
  *Sleep consolidates short-term to long-term memory*
  
- **Compression**  
  *Remember the gist, not every detail*

</v-clicks>
</div>

---
layout: default
---

# The Dual Architecture

<div class="flex justify-center">
<div class="grid grid-cols-2 gap-4">
<div class="border p-4 rounded">
  <h3 class="text-xl mb-2">Working Context</h3>
  <div class="text-sm">
    <p>• Actively managed by LLM</p>
    <p>• Compressed and summarized</p>
    <p>• Contains only relevant information</p>
    <p>• Size-optimized for efficiency</p>
  </div>
</div>
<div class="border p-4 rounded">
  <h3 class="text-xl mb-2">Complete History</h3>
  <div class="text-sm">
    <p>• Permanent, complete record</p>
    <p>• Never summarized or truncated</p>
    <p>• Available for retrieval when needed</p>
    <p>• Searchable by semantic relevance</p>
  </div>
</div>
</div>
</div>

<v-click>
<div class="mt-8 text-center">
  <p class="text-xl">Like how humans operate: complete memories stored somewhere,</p>
  <p class="text-xl">but only actively thinking about what's relevant right now</p>
</div>
</v-click>

---
layout: default
---

# Implementation Philosophy

<v-clicks>

- **The LLM decides when to access memory**
  - Much like how humans choose when to search their memories
  - No external system dictating what to remember

- **Three essential memory functions:**
  1. **Recall** relevant historical context
  2. **Index** new information for later retrieval
  3. **Compress** to maintain manageable context size

- **Continuous background optimization**
  - Like the unconscious memory processing that happens during sleep

</v-clicks>

---
layout: section
---

# From Challenge to Opportunity

---
layout: default
---

# From Challenge to Opportunity

<v-clicks>

- Context window limits become a **feature, not a bug**
  - Forces prioritization of what's truly relevant
  - Encourages more natural, human-like processing

- Human-like memory management creates immediate benefits:
  - **Computational efficiency**: Processing only what matters
  - **Cost optimization**: Resources used more intelligently
  - **Response speed**: Smaller, focused context = faster responses
  - **Natural interactions**: Mimics how humans handle conversations

</v-clicks>

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# Real World Impact

<v-clicks>

- **Lower costs**  
  Only process what's relevant, not entire history

- **Faster responses**  
  Smaller, focused context windows

- **Enhanced relevance**  
  Information prioritized by importance, not recency

- **True scalability**  
  Long-running agents maintain effectiveness

</v-clicks>

---
layout: default
---

# Beyond Context Windows

<v-clicks>

- The future isn't about ever-larger context windows
- It's about smarter use of the context we have
- Like humans, who don't need perfect memory to be effective

</v-clicks>

<div class="pt-12">
<v-click>

> "You don't need to remember everything to have a meaningful conversation. 
> Similarly, AI agents don't need unlimited context; 
> they need smarter ways to manage the context they have."

</v-click>
</div>

---
layout: end
---

# Thank You!

[Read the full blog post](https://sidpan1.github.io/sid-said/human-like-memory-objectives-for-ai-agents)
