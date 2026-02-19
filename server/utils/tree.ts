export const buildTree = (comments: Record<string, any>[]) => {
  const map: Record<string, any> = {};
  const roots = [];

  // 1. map
  for (const comment of comments) {
    // create children array in each comment
    comment.children = [];

    // copy all comments
    map[comment.comments.id] = comment;
  }

  // 2. Roots
  for (const comment of comments) {
    // copy all comments with no parent_id
    if (!comment.comments.parentId) {
      roots.push(comment);
    }
    // copy all comments of map with parent id
    else {
      const parent = map[comment.comments.parentId];

      if (parent) {
        parent.children.push(comment);
      }
    }
  }

  return roots;
};
