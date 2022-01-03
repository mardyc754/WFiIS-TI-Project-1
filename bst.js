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
            console.log(node.key);
            this.inorder(node.right);
        }
    }

    preorder(node){
        if(node != null){
            console.log(node.key);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    postorder(node){
        if(node != null){
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.key);
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

    preorderDraw(node, ctx, depth, i){
        if(node != null){
            let nodeRadius = depth == 0 ? 50 : 90/(depth+1);
            let maxNumOfNodes = 2**depth;
            
            ctx.font = nodeRadius + "px Arial";
            if(node.key / 100 >= 1){
                ctx.fillText(node.key, i*canvas.width/(maxNumOfNodes+1)-3*nodeRadius/4, 70+depth*150+nodeRadius/3);
            } // dla liczb 2-cyfrowych
            else if(node.key / 10 >= 1){ 
                ctx.fillText(node.key, i*canvas.width/(maxNumOfNodes+1)-nodeRadius/2, 70+depth*150+nodeRadius/3);
            } // dla cyfr
            else{
             ctx.fillText(node.key, i*canvas.width/(maxNumOfNodes+1)-nodeRadius/3, 70+depth*150+nodeRadius/3);   
            }

            console.log(depth);
            ctx.beginPath();
            ctx.arc(i*canvas.width/(maxNumOfNodes+1), 70+depth*150, nodeRadius, 0, Math.PI*2, true);
            ctx.stroke();

            if(node.parent != null){
                let oldNodeRadius = depth-1 == 0 ? 50 : 90/depth;
                let oldMaxNumOfNodes = maxNumOfNodes/2;
                ctx.beginPath();
                if(node == node.parent.left){
                    ctx.beginPath();
                    ctx.moveTo(i*canvas.width/(maxNumOfNodes+1), 70+depth*150-nodeRadius);
                    ctx.lineTo((i+1)/2*canvas.width/(oldMaxNumOfNodes+1)-oldNodeRadius/Math.sqrt(2), 70+(depth-1)*150+oldNodeRadius/Math.sqrt(2));
                }
                else{
                    ctx.moveTo(i*canvas.width/(maxNumOfNodes+1), 70+depth*150-nodeRadius);
                    ctx.lineTo(i/2*canvas.width/(oldMaxNumOfNodes+1)+oldNodeRadius/Math.sqrt(2), 70+(depth-1)*150+oldNodeRadius/Math.sqrt(2));
                }
                ctx.stroke();
            }
            
            console.log(node.key);
            this.preorderDraw(node.left, ctx, depth+1, 2*i-1);
            this.preorderDraw(node.right, ctx, depth+1, 2*i);
        }
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