# tallywally
_aiming to be_ a high performance event counter 🧮 in node ⚙️

## performance 
### handling 100 requests from 100 concurrent threads (4 core codespace cpu)
| Method         | Elapsed Time     |
| -------------- | ---------------- |
| tcp            | `4.909334393s`   |
| tcp clustering | `2.005522667s`   |
| udp 🤯         | `165.407222ms`   |
