import { getGrid } from "./components/grid.js"
export function sortByDistance(packages) {
    /*	This is a bit more complex, since the shortest distance between every package is not necessarily the shortest overall distance. 
	The shortest path from start to end visiting all "nodes"(e.g. packages) is a problem known as TSP.
	This is implemented as a BFS pathfinding in a grid, to get APSP (the bfs portion should probably be replaced with something more "straight" 
	considering the linearity of the selfeserve aisles and shelfs. This could potentially improve performance greatly)
	
    The actual TSP solving is implemented as DP with bitmask. For a 2^n * n^2 runtime instead of n! 
    Should be fast enough for 15-20 packages. 
*/
    let modifiedPackageList = JSON.parse(JSON.stringify(packages));
    console.log("Modified Package List : ", JSON.stringify(modifiedPackageList, null , 4));
    const gridString = "O(4) X(28) O(4) X(20) X(22)\nO(4) 1(1-28) O(4) 1(29-48) X(22)\nO(4) 2(23-1) O(20) 3(1-9) X(22)\nO(4) X(23) O(20) X(31)\nO(4) X(23) O(20) X(31)\nO(4) 4(23-1) O(20) 5(1-31)\nO(4) 6(23-1) O(20) 7(1-25) O(3) 7(29-31)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) 8(23-1) O(20) 9(1-25) O(3) 9(29-31)\nO(4) 10(23-1) O(20) 11(1-25) O(3) 11(29-31)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) 12(23-1) O(20) 13(1-25) O(3) 13(29-31)\nO(4) 14(23-1) O(20) 15(1-25) O(3) 15(29-31)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) 16(23-1) O(20) 17(1-25) O(3) 17(29-31)\nO(4) 18(23-1) O(20) 19(1-25) O(3) 19(29-31)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) 20(23-1) O(20) 21(1-25) O(3) 21(29-31)\nO(4) 22(23-1) O(10) 23(1-35) O(3) 23(39-41)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) 24(23-1) O(10) 25(1-35) O(3) 25(39-41)\nO(4) 26(23-1) O(10) 27(1-35) O(3) 27(39-41)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) 28(23-1) O(10) 29(1-35) O(3) 29(39-41)\nO(4) 30(23-1) O(10) 31(1-35) O(3) 31(39-41)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) 32(23-1) O(10) 33(1-35) O(3) 33(39-41)\nO(4) 34(20-1) O(22) 35(1-32)\nO(4) X(20) O(22) X(32)\nO(4) X(20) O(22) X(32)\nO(4) 36(20-1) O(22) 37(1-32)\nO(52) 39(1-26)\nO(52) X(26)\nO(52) X(26)\nO(52) 41(1-26)\nO(72) 43(1-6)"
    var grid = getGrid(gridString);
    grid = JSON.parse(JSON.stringify(grid));
    resetGrid(grid); //add needed stuff to grid. parent, visited, distance.
    addInfoToPackageList(modifiedPackageList, grid);
    setupWaypoints(grid);
    let distanceGrid = [];
    distanceGrid.push(getStartDistances(modifiedPackageList, grid)) //Add euclidean distance from start to all packages. As well as set distance to end high.
    //Add decently accurate distance for package to package.
    let count = 0;
    for (let thePackage of modifiedPackageList) {
        distanceGrid.push(getDistances(thePackage, modifiedPackageList, grid, distanceGrid));
    }
    distanceGrid.push(getEndDistances(modifiedPackageList, grid))
    
    const tspu = new TSPUtils(modifiedPackageList.length + 2, distanceGrid);
    tspu.tsp(1, 0);
    let path = tspu.getPath();
    let sorted = []
    for (let i = 1; i < path.length - 1; i++) {
        sorted.push(packages[path[i] - 1]);
    }
    return sorted;
}
/**
 * Adds a waypoint next to each aisle. 
 * The idea is to find closest waypoint and get simple distance from waypoint to endNode. 
 * This trades a small bit of accuracy for a massive performance improvement.
 * @param {*} grid 
 */
function setupWaypoints(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].data.length; j++) {
            grid[i].data[j].row = i;
            grid[i].data[j].col = j;
            if (j === 3 || j === 27 || j === 37) {
                if (i === 0 || i === 1 || i === 2 || i === 5 || i === 6 || i === 9 || i === 10 || i === 13 || i === 14 || i === 17 || i === 18 || i === 21 || i === 22 || i === 25 || i === 26 || i === 29 || i === 30 || i === 33 || i === 34 || i === 37 || i === 38 || i === 40 || i === 41 || i === 42) {
                    grid[i].data[j].pivot = true;
                }
            }
            if (j === 73 && i > 5 && i < 34) {
                grid[i].data[j].pivot = true;
            }
        }
    }
}
function addInfoToPackageList(modifiedPackageList, grid) {
    for (let i = 0; i < modifiedPackageList.length; i++) {
        modifiedPackageList[i].index = i;
        let currentPos = findPosition(modifiedPackageList[i].data.availability.aisle, modifiedPackageList[i].data.availability.shelf, grid);
        if (currentPos !== undefined) {
            modifiedPackageList[i].row = currentPos.row;
            modifiedPackageList[i].col = currentPos.col;
        }
    }
}
function getStartDistances(modifiedPackageList) {
    let startDistances = [];
    startDistances.push(0); //add 0 distance to self. 
    for (let p of modifiedPackageList) {
        let dist = 0;
        startDistances.push(euclideanDistance({ row: 0, col: 0 }, p)); //Euclidean distance should suffice for start node. 
    }
    /*  Distance from start to final node. should be excluded from all computations, since all shortest
        paths end in the final node. Keep it to maintain uniformity. */
    startDistances.push(10e9)
    return startDistances;
}
/**
 * Add arbitrarily high numbers from end node to all packages, set distance to start node to 0, to ensure ending on end-node.
 * @param {*} modifiedPackageList  Modified package list.
 */
function getEndDistances(modifiedPackageList) {
    let endDistances = []
    endDistances.push(0); //Distance to start is 0, to ensure ending on end node.
    for (let i = 0; i < modifiedPackageList.length; i++) {
        endDistances.push(10e9); //Distance to all other nodes is high, also to ensure ending on end node.
    }
    endDistances.push(0); //Distance to self is 0, for uniformity. 
    return endDistances;
}
function euclideanDistance(node1, node2) {
    return Math.sqrt(Math.pow((node1.row - node2.row), 2) + Math.pow((node1.col - node2.col), 2));
}
/**
 * Returns an array with the distance from current package to arbitrary start, all other packages, and arbitrary end 
 * Distance to start is set very high to ensure ending on end in tsp. 
 * @param {*} currentPackage 
 * @param {*} modifiedPackageList modified list of packages (list of packages containing information about row and col)
 * @param {*} grid 
 */
function getDistances(currentPackage, modifiedPackageList, grid, distanceGrid) {
    let distances = [];
    let current = grid[currentPackage.row].data[currentPackage.col];
    distances.push(10e9);
    for (let i = 0; i < modifiedPackageList.length; i++) {
        if (currentPackage.index === i) {
            distances.push(0);
        } else {
            let next = grid[modifiedPackageList[i].row].data[modifiedPackageList[i].col];
            distances.push(nodeToNodeDistance(current, next, grid));
        }
    }
    distances.push(nodeToNodeDistance(current, { row: 41, col: 39 }, grid)) //Arbitrary endpoint bottom center of map. 
    resetGrid(grid);
    return distances;
}
/**
 * Returns the row value of the specified aisle in grid.
 * -1 if not found
 * @param {number} aisle 
 * @param {*} grid 
 */
function findRow(aisle, grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].isles.length; j++) {
            if (grid[i].isles[j] == aisle) return i;
        }
    }
    //if aisle is not found.
    return -1;
}
/**
 * Returns the col value for the specified shelf in the specified aisle. 
 * This is a bit overly complex due to the structure of the grid. 
 * @param {*} row 
 * @param {*} aisle 
 * @param {*} shelf 
 * @param {*} grid 
 */
function findCol(row, aisle, shelf, grid) {
    if (row === -1) return -1
    for (let i = 0; i < grid[row].data.length; i++) {
        let current = grid[row].data[i];
        if (current.isle == aisle && current.shelf == shelf) {
            return i;
        }
    }
    //if shelf is not found on row.
    return -1;
}
/**
 * Returns an object containing the row and col values for the specified aisle and shelf.
 * Returns undefined if either of the values can't be found. 
 * @param {number} aisle 
 * @param {number} shelf 
 * @param {*} grid 
 */
function findPosition(aisle, shelf, grid) {
    let row = findRow(aisle, grid);
    let col = findCol(row, aisle, shelf, grid);
    if (row !== -1 && col !== -1) return { row: row, col: col }
    return undefined;
}
/**
 * Since the grid is used as data storage for the search, we need to reset it after every search. 
 * this could probably be fixed by using a different datastructure to hold this information. 
 * but this is easier to understand, and not too costly compared to the other operations in the sorting. 
 * @param {*} grid 
 */
function resetGrid(grid) {
    grid.forEach((row) => {
        row.data.forEach((node) => {
            node.visited = false;
            node.distance = 10e9;
            node.parent = null;
        })
    })
}
/**
 * Functions used in building apsp. 
 */
function findClosestWaypoint(node, grid) {
    const visitedNodesInOrder = [];
    node.distance = 0;
    const unvisitedNodes = getNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodes(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (!closestNode.walkable) continue;
        if (closestNode.distance === 10e9) return null; //if we cant go any further in any direction, we are trapped. Should never happen. 
        closestNode.visited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode.pivot === true) //return visitedNodesInOrder;
            return closestNode;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}
function nodeToNodeDistance(startNode, finishNode, grid) {
    if (startNode.row === finishNode.row) {
        if (startNode.col === finishNode.col) {
            return 0;
        }
        return getDistance(startNode, finishNode);
    }
    let closestWaypoint = findClosestWaypoint(startNode, grid);
    return closestWaypoint.distance + getDistance(closestWaypoint, finishNode);
}
/**
 * Function that returns the minimum distance to travel between two nodes.
 * Basically endx-startx + endy-starty. 
 * @param {*} startNode 
 * @param {*} finishNode 
 */
function getDistance(startNode, finishNode) {
    return Math.max(startNode.row, finishNode.row) - Math.min(startNode.row, finishNode.row) + Math.max(startNode.col, finishNode.col) - Math.min(startNode.col, finishNode.col);
}
/**
 * Returns all nodes from the grid as a single dimension array. 
 * @param {*} grid 
 */
function getNodes(grid) {
    let nodes = [];
    for (let e of grid) {
        for (let k of e.data) {
            nodes.push(k);
        }
    }
    return nodes;
}
/**
 * Sort nodes on distance ascending. 
 * Used to traverse the lowest distance first, sort of. 
 * @param {*} nodes 
 */
function sortNodes(nodes) {
    nodes.sort((node1, node2) => node1.distance - node2.distance);
}
/**
 * Returns an array of all the unvisited neighbors of the specified nodes
 * After rewriting the pathfinding to use waypoints, this now only checks horizontal neighbors. 
 * @param {*} node The node for which we want to get neighbors
 * @param {*} grid 
 */
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    //if (row > 0) neighbors.push(grid[row - 1].data[col]);
    //if (row < grid.length - 1) neighbors.push(grid[row + 1].data[col]);
    if (col > 0) neighbors.push(grid[row].data[col - 1]);
    if (col < grid[0].data.length - 1) neighbors.push(grid[row].data[col + 1]);
    return neighbors.filter(neighbor => !neighbor.visited);
}
/**
 * Updates the neighbors for the specified node with new distance and sets the neighbors parents to the "current" node.
 * @param {*} node the node for which to update neighbors
 * @param {*} grid 
 */
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.parent = node;
    }
}
function isUndefined(_arr, _index1, _index2) {
    try { return _arr[_index1][_index2] == undefined; } catch (e) { return true; }
}
class TSPUtils {
    // n == number of products + the two arbitrary points (start and end)
    // dist == 2D array of distances between products. 
    constructor(n, dist) {
        this.n = n;
        this.dist = dist;
        this.dp = new Array((1 << n) - 1);
        this.parent = new Array((1 << n) - 1);
        for (let i = 0; i < this.dp.length; i++) {
            this.dp[i] = new Array(n);
            this.parent[i] = new Array(n);
        }
        for (let i = 0; i < this.dp.length; i++) {
            for (let j = 0; j < this.dp[i].length; j++) {
                this.dp[i][j] = -1;
                this.parent[i][j] = -1;
            }
        }
        this.all = (1 << n) - 1;
    }
    tsp(mask, pos) {
        if (mask === this.all) {
            return this.dist[pos][0];
        }
        if (this.dp[mask][pos] !== -1) {
            return this.dp[mask][pos];
        }
        let ans = Infinity;
        for (let i = 0; i < this.n; i++) {
            if (i !== pos && (mask & (1 << i)) == 0) {
                let newAns = this.dist[pos][i] + this.tsp(mask | (1 << i), i);
                if (ans > newAns) {
                    ans = newAns;
                    this.parent[mask][pos] = i;
                }
                ans = Math.min(ans, newAns)
            }
        }
        return this.dp[mask][pos] = ans;
    }
    getPath() {
        let path = new Array(this.n);
        let counter = 0;
        let currentNode = 0;
        let currentMask = 1;
        while (currentNode !== undefined && currentNode !== -1) {
            path[counter] = currentNode;
            counter++;
            if (counter === this.n - 1) {
                path[this.n - 1] = this.parent[currentMask][currentNode];
                break;
            }
            currentNode = this.parent[currentMask][currentNode];
            currentMask = currentMask | (1 << currentNode);
        }
        return path;
    }
}
