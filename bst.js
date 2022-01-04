class Node{
    constructor(key){
        this.key = key;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(){
        this.root = null;
        this.numOfNodes = 0;
        //this.height = 0;
    }

    insert(key){
        let z = new Node(key);
        let y = null;
        let x = this.root;
        while(x != null){
            y = x;
            if(key < x.key){ x = x.left; }
            else{ x = x.right; }
        }
        z.parent = y;
        if(y == null){ this.root = z; }
        else if(key < y.key){ y.left = z; }
        else { y.right = z; }
        this.numOfNodes++;
    }

    minNode(node){
        while(node.left != null){
            node = node.left;
        }
        return node;
    }

    maxNode(node){
        while(node.right != null){
            node = node.right;
        }
        return node;
    }

    inorder(node){
        if(node != null){
            this.inorder(node.left);
            this.inorder(node.right);
        }
    }

    preorder(node){
        if(node != null){
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    postorder(node){
        if(node != null){
            this.postorder(node.left);
            this.postorder(node.right);
        }
    }

    search(node, key){
        if(node == null)
        return null;

        else if(key < node.key)
            return this.search(node.left, key);

        else if(key > node.key)
            return this.search(node.right, key);
        else
            return node;
    }

    successor(node){
        if(node.right != null){
            return this.minNode(node.right);
        }
        let y = node.parent;
        while(y != null && node.key == y.right.key){
            node = y;
            y = y.parent;
        }
        return y;
    }

    predecessor(node){
        if(node.left != null){
            return this.maxNode(node.left);
        }
        let y = node.parent;
        while(y != null && node.key == y.left.key){
            node = y;
            y = y.parent;
        }
        return y;
    }

    remove(key){
        let y = null;
        let node = this.search(this.root, key);
        if(node != null){
            if(node.left == null || node.right == null){
                y = node;
            }
            else{
                y = this.successor(node);
            }

            let x = y.left != null ? y.left : y.right;
            
            if(x != null){
                x.parent = y.parent;
            }

            if(y.parent == null){
                this.root = x;
            }
            else if(y == y.parent.left){
                y.parent.left = x;
            }
            else if(y == y.parent.right){
                y.parent.right = x;
            }
            
            if(y != node){
                node.key = y.key;
            }
        }
        this.numOfNodes--;
    }

    height(node){
        if (node == null)
            return -1;
        else
        {
            /* compute the depth of each subtree */
            let leftHeight = height(node.left);
            let rightHeight = height(node.right);
        
            /* use the larger one */
            if (leftHeight > rightHeight)
                return(leftHeight + 1);
            else return(rightHeight + 1);
        }
    }

    findDepth(root, key)
    {   
        if (this.root == null)
            return -1;
    
        let dist = -1;
    
        if ((root.key == key)||
            (dist = findDepth(root.left, key)) >= 0 ||
            (dist = findDepth(root.right, key)) >= 0)
            return dist + 1;
            
        return dist;
    }

    clear(){
        this.root = null;
    }
}

/*
let tree = new Tree();
tree.insert(56);
tree.insert(30);
tree.insert(22);
tree.insert(40);
tree.insert(11);
tree.insert(3);
tree.insert(16);
tree.insert(70);
tree.insert(60);
tree.insert(95);
tree.insert(65);
tree.insert(63);
tree.insert(67);


console.log("Inorder: ");
tree.inorder(tree.root);
console.log("Preorder: ");
tree.preorder(tree.root);
console.log("Postorder: ");
tree.postorder(tree.root);
*/