export const buildTree = (comments: Record<string, any>[]) => {
  const map: Record<string, any> = {};
  const roots = [];

  // 1. map
  for (const comment of comments) {
    // create children array in each comment
    comment.children = [];

    // copy all comments
    map[comment.id] = comment;
  }

  // 2. Roots
  for (const comment of comments) {
    // copy all comments with no parent_id
    if (!comment.parentId) {
      roots.push(comment);
    }
    // copy all comments of map with parent id
    else {
      const parent = map[comment.parentId];

      if (parent) {
        parent.children.push(comment);
      }
    }
  }

  return roots;
};
