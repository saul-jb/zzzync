# 💤ync
<span>
  <a href="https://static.sfdict.com/audio/Z00/Z0026700.mp3" target="_blank" rel="noopener noreferrer">
    <img src="https://camo.githubusercontent.com/b900202928a33c7574d271fb0ef74b60036da10fe81079709e87b86b939ed8e7/68747470733a2f2f6475636b6475636b676f2e636f6d2f6173736574732f69636f6e732f706c61792d627574746f6e2e737667" />
  </a>
  zĭngk
</span>

> sync with peers that have gone to sleep Zzz

This is replicator module for [Opal](https://github.com/cypsela/opal) that allows for persistent replication. Persistent replication is a way to replicate data that uses data types and protocols with persistence in mind.

Zzzync works by coupling an immutable storage network with a mutable, signed pointer.
It uploads updated replicas to a storage network and has the pointer resolve to the Merkle-DAG heads of the replica.
IPNS/IPFS pinning services will be used in the short term, with the goal of moving toward services like ENS/Filecoin.
