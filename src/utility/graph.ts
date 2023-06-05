class Node {
  x: number
  y: number
  id: number
  metaData: string[]

  constructor(x: number, y: number, id: number, metaData: string[]) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.metaData = metaData;
  }
}

class Edge {
  src: number
  tgt: number
  id: number
  metaData: string[]

  constructor(src: number, tgt: number, id: number, metaData: string[]) {
    this.src = src;
    this.tgt = tgt;
    this.id = id;

    this.metaData = metaData;
  }
}

export class Graph {
  private _nodes: (Node|null)[] = []
  private _edges: (Edge|null)[] = []

  private freeNodeIDs: number[] = []
  private freeEdgeIDs: number[] = []

  /**
   * Add a node to the graph
   * 
   * @remarks
   * This doesn't check to see if there is another node with the same coordinate
   * 
   * @param x - coordinate x
   * @param y - coordinate y
   * @param metaData - any useful information
   * @returns id of new node
   */
  addNode(x: number, y: number, metaData: string[]): number {
    let id: number;
    if (this.freeNodeIDs.length > 0) {
      id = this.freeNodeIDs.pop()!;
      this._nodes[id] = new Node(x, y, id, metaData);
    } else {
      id = this._nodes.length;
      this._nodes.push(new Node(x, y, id, metaData));
    }
    
    return id;
  }

  /**
   * Add an edge to the graph.
   * 
   * @remarks
   * This probably won't be that great to work with since the user has to keep
   * track of ids them self.
   * 
   * @param src - id of source node
   * @param tgt - id of target node
   * @param metaData - any useful information
   * @returns id of new edge
   */
  addEdge(src: number, tgt: number, metaData: string[]): number {
    let id: number;
    if (this.freeEdgeIDs.length > 0) {
      id = this.freeEdgeIDs.pop()!;
      this._edges[id] = new Edge(src, tgt, id, metaData);
    } else {
      id = this._edges.length;
      this._edges.push(new Edge(src, tgt, id, metaData))
    }

    return id;
  }

  /**
   * Generator for every non-null node
   * @return nodes in the graph
   */
  *nodes(): Generator<Node> {
    for (let node of this._nodes) {
      if (node != null) {
        yield node;
      }
    }
  }

  /**
   * Generator for every non-null
   * @return edges in the graph
   */
  *edges(): Generator<Edge> {
    for(let edge of this._edges) {
      if (edge != null) {
        yield edge;
      }
    }
  }

  *leaves(): Generator<Node> {
    
  }

  /**
   * Get every node that the source node connects to via edges.
   * @param src - id of node
   * @returns node ids
   */
  *getDestinations(src: number): Generator<number> {
    for(let edge of this.edges()) {
      if (edge.src == src) {
        yield edge.tgt;
      }
    }
  }
}