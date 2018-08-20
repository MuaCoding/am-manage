export function BuildHierarchy(arry, type) {
  var roots = [],
    sides = {};
  // find the top level nodes and hash the children based on parent
  for (var i = 0; i < arry.length; i++) {
    var item = arry[i],
      p = Number(item.PID),
      //关键步骤，查找根节点
      target = p === type ? roots : (sides[p] || (sides[p] = []));
    target[target.length] = item;
  }
  // function to recursively build the tree
  var findChildren = function(parent) {
    if (sides[parent.ID]) {
      parent.sides = sides[parent.ID];
      for (var i = 0, len = parent.sides.length; i < len; ++i) {
        findChildren(parent.sides[i]);
      }
    }
  };

  // enumerate through to handle the case where there are multiple roots
  for (var i = 0; i < roots.length; i++) {
    findChildren(roots[i]);
  }

  return roots;
}
