## 1. Depth Limit

Given a comment, count how many levels of parent comments it has above it.

> _useful in threaded comment system, like Reddit, Instagram or Youtube replies_

Imagine a forum:

```yaml
Comment 1: "I love this movie!"
(id: 1, parent_id: NULL)
  └── Reply 2: "Me too!"
      (id: 2, parent_id: 1)
        └── Reply 3: "Same here!"
            (id: 3, parent_id: 2)

```
