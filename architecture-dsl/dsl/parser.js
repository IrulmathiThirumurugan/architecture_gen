function parseArchmark(input) {
    const lines = input.split('\n').map(line => line.trim()).filter(Boolean);
    const result = {
      layout: 'horizontal',
      theme: 'light',
      nodes: [],
      edges: [],
      groups: []
    };
  
    let currentGroup = null;
  
    for (const line of lines) {
      if (line.startsWith('layout:')) {
        result.layout = line.split(':')[1].trim();
      } else if (line.startsWith('theme:')) {
        result.theme = line.split(':')[1].trim();
      } else if (line.startsWith('group')) {
        const [, groupName] = line.match(/^group\s+(\w+)/) || [];
        currentGroup = {
          name: groupName,
          nodes: []
        };
        result.groups.push(currentGroup);
      } else if (line === '}') {
        currentGroup = null;
      } else if (line.startsWith('node')) {
        const match = line.match(/^node\s+(\w+)\s+\[([^\]]+)\]/);
        if (match) {
          const [, id, props] = match;
          const node = { id };
          props.split(',').forEach(part => {
            const [key, val] = part.split('=');
            node[key.trim()] = val.trim().replace(/^"|"$/g, '');
          });
          if (currentGroup) {
            currentGroup.nodes.push(node);
          } else {
            result.nodes.push(node);
          }
        }
      } else if (line.includes('->')) {
        const [from, to] = line.split('->').map(x => x.trim());
        result.edges.push({ from, to });
      }
    }
  
    // Flatten grouped nodes into main node list for global rendering
    result.groups.forEach(group => {
      result.nodes.push(...group.nodes.map(n => ({ ...n, group: group.name })));
    });
  
    return result;
  }
  
  module.exports = { parseArchmark };
  